// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions!")

Deno.serve(async (req: Request) => {
  const data : {
    courses: {
      id: string,
      name: string,
      startDate: string,
      startTime: string,
      daysOfWeek: string,
      endDate: string,
      endTime: string,
      weeks: string
    }[]
  } = { "courses":
    [
      {
        "id": "1",
        "name": "course1",
        "startDate": "2024-01-01",
        "startTime": "09:00",
        "endDate": "2024-01-31",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "2",
        "name": "course2",
        "startDate": "2024-02-01",
        "startTime": "09:00",
        "endDate": "2024-02-28",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "3",
        "name": "course3",
        "startDate": "2024-03-01",
        "startTime": "09:00",
        "endDate": "2024-03-31",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "4",
        "name": "course4",
        "startDate": "2024-04-01",
        "startTime": "09:00",
        "endDate": "2024-04-30",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "5",
        "name": "course5",
        "startDate": "2024-05-01",
        "startTime": "09:00",
        "endDate": "2024-05-31",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "6",
        "name": "course6",
        "startDate": "2024-06-01",
        "startTime": "09:00",
        "endDate": "2024-06-30",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "7",
        "name": "course7",
        "startDate": "2024-07-01",
        "startTime": "09:00",
        "endDate": "2024-07-31",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "8",
        "name": "course8",
        "startDate": "2024-08-01",
        "startTime": "09:00",
        "endDate": "2024-08-31",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "9",
        "name": "course9",
        "startDate": "2024-09-01",
        "startTime": "09:00",
        "endDate": "2024-09-30",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      },
      {
        "id": "10",
        "name": "course10",
        "startDate": "2024-10-01",
        "startTime": "09:00",
        "endDate": "2024-10-31",
        "daysOfWeek": "Mon-Fri",
        "endTime": "13:00",
        "weeks": "4"
      }
    ]
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/students' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/