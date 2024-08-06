// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { errorMessages } from '../_shared/constants.ts';
import { corsHeaders } from "../_shared/cors.ts";

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

    }

    case 'POST': {
      const reqBody = await req.json();

      if (!reqBody.student_id)
        return generateResponse(errorMessages.noStudentId, responseHeader, 400);

      if (!reqBody.course_ids || reqBody.course_ids.length === 0)
        return generateResponse(errorMessages.noCourseIds, responseHeader, 400);

      if (!reqBody.parent_ids || reqBody.parent_ids.length === 0)
        return generateResponse(errorMessages.noParentIds, responseHeader, 400);

      // Save survey response
      const { data, error } = await supabase
        .from('survey_responses')
        .insert({
          student_id: reqBody.student_id,
          survey_id: reqBody.survey_id,
          parent_ids: reqBody.parent_ids,
          course_ids: reqBody.course_ids,
        });
      if (error) return generateResponse(error, responseHeader, 400);

      // Register student for courses
      const registered_courses = [];

      for (const course_id of reqBody.course_ids) {
        const { data, error } = await supabase
          .from('registered_courses')
          .insert({
            student_id: reqBody.student_id,
            course_id: course_id,
            created_by: reqBody.created_by
          });
        
        if (error) {
          console.log(`Error occurred: ${error}`);
          return generateResponse(error, responseHeader, 400);
        }
        else registered_courses.push(course_id);
      }

      const body = { 
        'students': reqBody.student_id,
        'registered_courses': registered_courses
      };
      return generateResponse(body, responseHeader, 200);
    }

    case 'PUT': {

    }

    case 'DELETE': {

    }

    case 'OPTIONS':{
      const body = {'message': 'OK'};
      return generateResponse(body, responseHeader, 200);
    }

    default: {
      const body = {'message': 'Invalid / Disabled request method'};
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