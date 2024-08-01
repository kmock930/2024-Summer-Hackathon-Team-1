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
4. Run a Supabase function with Deno runtime, with this command: `deno run --watch --unstable --allow-net --allow-read --allow-env backend\supabase\functions\<function name>\index.ts`, and then make an HTTP request to the corresponding port. 
* Note: To disable Deno errors, disable "typescript.validate.enable" and "javascript.validate.enable" flags at settings.json under .vscode directory.
* General command for Deno run: `deno run --allow-net --allow-read --allow-env file`.
# Setting up for Docker
1. On your hard drive at a permanent location, clone this project by executing command: `git clone --depth 1 https://github.com/supabase/supabase`.
2. Go into the directory.
3. Copy environment variable file with this command: `cp .env.example .env`.
# Build a Docker image
1. Tag an image on docker with command `docker tag cics-backend kmock930/cics-backend`
2. Run `docker build -t cics-backend .` to build a docker image at backend directory, using port 3000.
* All-in-one command to tag + build a docker image: `docker build -t kmock930/your-function:tag supabase/functions/function1`
3. Run `docker run -p 3000:3000 cics-backend` to run the docker build on port 3000.
4. Navigate to localhost:3000 on a browser or Postman to see responses from API endpoints. 
5. Push the Docker image to remote Hub with this command `docker push kmock930/image-name`
- Note: Docker image name can only be lowercase and may not be exact same name as Supabase edge functions. 
- Note: Docker images cannot be deployed to Supabase via CI/CD pipelines. Such process must be done manually. 
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
<<<<<<< Updated upstream
2. Deploy the function based on Docker container with command `npx supabase functions deploy function-name --use-container --project-ref ibhwsqyqdziekcjyakog`.
=======
2. Deploy the function based on Docker container with command `npx supabase functions deploy function-name --use-container --project-ref ibhwsqyqdziekcjyakog`.
# Continuous Integration / Continuous Development (CICD) pipelines
1. When you decide to deploy a new function, you can modify the workflow file `build-docker-deploy-supabase.yml` and include modifications in your commit: 
- Add new docker commands; and
- Add new supabase commands to deploy the corresponding function.
2. Merge your changes to the main branch. 
3. Execute the GitHub Action workflow: "Deploy Docker Build for Supabase functions". 
# Creating a Database model in code from Supabase
- Run the following command in the directory where you would like Supabase CLI to auto-generate you a database model file in TypeScript: `supabase gen types typescript --project-id ibhwsqyqdziekcjyakog > database.types.ts`
>>>>>>> Stashed changes
