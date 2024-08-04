// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {createClient} from 'npm:@supabase/supabase-js@2.39.3';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-ALlow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
)

Deno.serve(async (req: Request) => {
  switch (req.method) {

    case 'GET':
      const {data, error} = await sb
        .from('courses')
        .select();

        if (error) {
          return new Response(
            JSON.stringify(error),
            {
              headers: headers,
              status: 400
            }
          );
        }

        return new Response(
          JSON.stringify({ 'courses': data }),
          {
            headers: headers,
            status: 200
          }
        );

    case 'POST':
      // TODO

    case 'PUT':
      // TODO

    case 'DELETE':
      // TODO

    default:
      return new Response(
        JSON.stringify({ 'message': 'Not Implemented' }),
        {
          headers: headers,
          status: 400
        }
      );
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