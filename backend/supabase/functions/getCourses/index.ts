// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
//import { Database, Tables, Enums } from "../../../db-model/database.types.ts";
//import { errorMsg } from "../../../constants.ts";
// Get credentials from .env
const supabaseURL:string = Deno.env.get("API_URL") as string;
const apiAnon:string = Deno.env.get("API_ANON") as string;

// Initialize Supabase client
const supabase = createClient<Database>(supabaseURL, apiAnon);

Deno.serve(async (req) => {
  const { data, error } = await supabase
    .from('courses') //table name
    .select(); //field name(s); comma-separated as params

    //error handling
    if (error) {
      console.error(error);
      const error = { error: 'Could not fetch courses.' };
      return new Response(
        JSON.stringify(error),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    //normal case
    if (data) {
      const data = { data: data };
      return new Response(
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      );
    } else {
      console.log(errorMsg.failed_noCourses);
      const error = { error: 'No courses are found in our database.'};
      return new Response(
        JSON.stringify(error),
        { headers: { "Content-Type": "application/json" } },
      );
    }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/getCourses' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
