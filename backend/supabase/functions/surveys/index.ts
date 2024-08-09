// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { errorMessages } from '../_shared/constants.ts';
import { corsHeaders } from "../_shared/cors.ts";

/* TODO
 * 1. Set create / update / delete person
 * 2. Extract common parts to a function / shared file
 */

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const generateResponse = (
  body: any,
  headers: HeadersInit,
  status: number
): Response => {
  console.log(body);
  return new Response(
    JSON.stringify(body),
    {
      headers: headers,
      status: status
    }
  );
};

Deno.serve(async (req: Request) => {
  const responseHeader: HeadersInit = {
    ...corsHeaders,
    "Content-Type": "application/json"
  };

  switch (req.method) {
    case 'GET': {
      let query = supabase.from('surveys').select().is('deleted_dt', null);

      // Get course by ID if provided
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      if (id) query = query.eq('id', id);

      const { data, error } = await query;
      if (error) return generateResponse(error, responseHeader, 400);

      // Populate courses
      await Promise.all(data.map(async (survey: any) => {
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select()
          .in('id', survey.course_ids);
        if (courseError) return generateResponse(courseError, responseHeader, 400);
        survey.courses = courseData;

        return survey;
      }));

      return generateResponse(data, responseHeader, 200);
    }

    case 'POST': {
      const reqBody = await req.json();

      const { data: createData, error: createError } = await supabase
        .from('surveys')
        .insert(reqBody)
        .select();
      if (createError) return generateResponse(createError, responseHeader, 400);

      // Add survey link (TODO: check to frontend url)
      const { data, error } = await supabase
        .from('surveys')
        .update({
          survey_link: `https://ibhwsqyqdziekcjyakog.supabase.co/functions/v1/surveys?id=${createData[0].id}`
        })
        .eq('id', createData[0].id)
        .select();
      if (error) return generateResponse(error, responseHeader, 400);

      return generateResponse(data, responseHeader, 200);
    }

    case 'PUT': {
      // check ID
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      if (!id) {
        const body = { 'message': 'Missing ID' };
        return generateResponse(body, responseHeader, 400);
      }
      const { data: getData, error: getError } = await supabase
        .from('surveys')
        .select()
        .eq('id', id);
      if (getError) return generateResponse(getError, responseHeader, 400);
      if (getData.length <= 0) {
        const body = { 'message': 'Course not found' };
        return generateResponse(body, responseHeader, 404);
      }

      // Validate request body
      const reqBody = await req.json();
      if (!reqBody) {
        const body = { 'message': 'Missing request body' };
        return generateResponse(body, responseHeader, 400);
      }

      // Update survey
      const { data, error } = await supabase
        .from('surveys')
        .update({
          ...reqBody,
          'modified_dt': new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) return generateResponse(error, responseHeader, 400);
      
      return generateResponse(data, responseHeader, 200);
    }

    case 'DELETE': {
      // check ID
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      if (!id) {
        const body = { 'message': 'Missing ID' };
        return generateResponse(body, responseHeader, 400);
      }
      const { data: getData, error: getError } = await supabase
        .from('surveys')
        .select()
        .eq('id', id);
      if (getError) return generateResponse(getError, responseHeader, 400);
      if (getData.length <= 0) {
        const body = { 'message': 'Course not found' };
        return generateResponse(body, responseHeader, 404);
      }

      // Delete course (soft delete)
      const { data, error } = await supabase
        .from('surveys')
        .update({ 'deleted_dt': new Date().toISOString() })
        .eq('id', id)
        .select();
      if (error) return generateResponse(error, responseHeader, 400);

      return generateResponse(data, responseHeader, 200);
    }

    case 'OPTIONS':{
      const body = {'message': 'OK'};
      return generateResponse(body, responseHeader, 200);
    }

    default: {
      const body = {'message': 'Invalid request method'};
      return generateResponse(body, responseHeader, 400);
    }
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/students' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/