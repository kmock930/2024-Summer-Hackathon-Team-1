// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import {createClient} from 'npm:@supabase/supabase-js@2.39.3'
import {errorMessages} from '../_shared/constants.ts';
import {corsHeaders} from "../_shared/cors.ts"; //Resolving Issue #16 - CORS policy issue
import {StudentModel}  from "./StudentModel.ts";

const supabase = createClient(
  Deno.env.get("API_URL"),
  Deno.env.get("API_ANON")!
);

Deno.serve(async (req: Request) => {
  const responseHeader: object = {headers: {...corsHeaders /*Resolving Issue #16*/, "Content-Type": "application/json"}, status: 200};
  let errorResponse: object;
  // Parse parameters from URL
  const url:URL = new URL(req.url);
  const model = new StudentModel(url);
  
  switch (req.method) {
    case 'GET':
      const data = await model.getStudents();
      // Error handling
      if (data?.type === 'ERROR') {
        const errorResponse = data;
        console.error(`ERROR: ${errorResponse?.message}`);
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
      // Add
      /*
      const { data, error } = await supabase
        .from('students')
        .insert({ id: 1, name: 'Denmark' })
        .select()
      */
      break;
    case 'PATCH':
      // Update
      break;
    case 'OPTIONS':
      // To handle preflight response from browser
      return new Response(
        'ok',
        responseHeader
      );
    case 'DELETE':
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
