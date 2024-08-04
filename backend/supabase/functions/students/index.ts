// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import {createClient} from 'npm:@supabase/supabase-js@2.39.3'
import {errorMessages} from '../_shared/constants.ts';
import {parseQueryCondition} from '../_shared/common.ts';
import {corsHeaders} from "../_shared/cors.ts"; //Resolving Issue #16 - CORS policy issue

const supabase = createClient(
  Deno.env.get("API_URL"),
  Deno.env.get("API_ANON")!
);

Deno.serve(async (req: Request) => {
  const responseHeader: object = {headers: {...corsHeaders /*Resolving Issue #16*/, "Content-Type": "application/json", status: 200}};
  let errorResponse: object;
  // Parse parameters from URL
  const url:URL = new URL(req.url);
  const queryParams = parseQueryCondition(url);
  
  switch (req.method) {
    case 'GET':
      // Construct the query first
      let query = supabase
        .from('students')
        .select();
      // Conditional chaining (for filtering)
      if (queryParams.param_student_id) {
        query.eq('id', queryParams.param_student_id);
      }
      if (queryParams.param_firstname) {
        query.eq('firstname', queryParams.param_firstname);
      }
      if (queryParams.param_lastname) {
        query.eq('lastname', queryParams.param_lastname);
      }
      if (queryParams.param_gender) {
        query.eq('gender', queryParams.param_gender)
      }
      if (queryParams.param_dob) {
        query.eq('dob', queryParams.param_dob);
      }
      // Execute the query
      const { data, error } = await query;
      // Error handling
      if (error) {
        console.error(error);
        errorResponse = {
          message: `ERROR: ${error}`,
          reason: errorMessages.dbError
        };
        responseHeader.status = 500;
        return new Response(
          JSON.stringify(errorResponse),
          responseHeader
        );
      }
      // Return the response in JSON
      return new Response(
        JSON.stringify(data),
        responseHeader
      );
    case 'POST':
      break;
    default:
      //other operations
      errorResponse = {
        message: errorMessages.invalidOp,
        reason: errorMessages.invalidOp_reason
      };
      responseHeader.status = 404;
      return new Response(
        JSON.stringify(errorResponse),
        responseHeader
      );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/courses' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
