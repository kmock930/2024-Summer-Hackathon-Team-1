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
* Note: To disable Deno errors, disable "typescript.validate.enable" and "javascript.validate.enable" flags at settings.json under .vscode directory.
# Setting up for Docker
1. On your hard drive at a permanent location, clone this project by executing command: `git clone --depth 1 https://github.com/supabase/supabase`.
2. Go into the directory.
3. Copy environment variable file with this command: `cp .env.example .env`.
# Build a Docker image
1. Tag an image on docker with command `docker tag cics-backend kmock930/cics-backend`
2. Run `docker build -t cics-backend .` to build a docker image at backend directory, using port 3000.
3. Run `docker run -p 3000:3000 cics-backend` to run the docker build on port 3000.
4. Navigate to localhost:3000 on a browser or Postman to see responses from API endpoints. 
# Working with Docker Image as a normal workflow
1. On the docker git repository that you just cloned as mentioned above, pull the latest image with this command: `docker compose pull`.
2. At the same directory, start the services (in detached mode) with this command `docker compose up -d`.
3. To stop Docker, run this command `docker compose stop` or `docker compose down -v`. 
4. To check currently running Docker services, run this command `docker compose ps`.
# Supabase Project Initialisation
1. Run command `npx supabase init` to create a directory for edge functions. 
2. Run command `npx supabase start` to start Supabase stack.
3. By default, a GUI will be displayed on http://localhost:54323/. 
* Note: To stop Supabase, run command `npx supabase stop`. 
# Creating a new Supabase Edge Function (Serverless Function)
1. Create a new function with command `npx supabase functions new function-name`.
2. Deploy the function with command `npx supabase functions deploy function-name --project-ref ibhwsqyqdziekcjyakog`.