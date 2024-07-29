# CICS-Hackathon-Team-1
## Backend Development
# Prerequisites
- Install Scoop for installations with this command on PowerShell: `iwr -useb get.scoop.sh | iex`.
- Then install Supabase with these 2 commands:
`scoop bucket add supabase https://github.com/supabase/scoop-bucket.git`,
`scoop install supabase`.
- Update Supabase with this command: `scoop update supabase`.
- Install Deno:
Powershell command - `irm https://deno.land/install.ps1 | iex`;
Scoop command - `scoop install deno`
# Run the Project locally
1. Make a build with command `npm run build`.
2. Compile and Start server with `npm start`. 
3. Develop using command `npm run dev`.
4. Run a Supabase function with Deno runtime, with this command: `deno run --watch --unstable --allow-net backend\supabase\functions\<function name>\index.ts`, and then make an HTTP request to the corresponding port. 
# Build a Docker image
1. Tag an image on docker with command ` docker tag cics-backend kmock930/cics-backend`
2. Run `docker build -t cics-backend .` to build a docker image at backend directory, using port 3000.
3. Run `docker run -p 3000:3000 cics-backend` to run the docker build on port 3000.
4. Navigate to localhost:3000 on a browser or Postman to see responses from API endpoints. 
# Supabase Project Initialisation
1. Run command `npx supabase init` to create a directory for edge functions. 
2. Run command `npx supabase start` to start Supabase stack.
3. By default, a GUI will be displayed on http://localhost:54323/. 
* Note: To stop Supabase, run command `npx supabase stop`. 