# CICS-Hackathon-Team-1

## Backend Development

# Prerequisites

- Install Scoop for installations with this command on PowerShell: `iwr -useb get.scoop.sh | iex`.
- Then install Supabase CLI with these 2 commands:
`scoop bucket add supabase https://github.com/supabase/scoop-bucket.git`,
`scoop install supabase`.
- Update Supabase with this command: `scoop update supabase`.
- Install Deno:
Powershell command - `irm https://deno.land/install.ps1 | iex`;
Scoop command - `scoop install deno`.
- To disable Deno errors, disable "typescript.validate.enable" and "javascript.validate.enable" flags at settings.json under .vscode directory.
# Run and Debug the Project locally
1. Invoke our function locally, by serving it with our new .env.local file, with this command:
`supabase functions serve --env-file ./supabase/.env.local`
- It will run all the functions in the "supabase" directory.
2. Launch the corresponding function according to guidance in your terminal, on either Postman or your browser. 
3. Alternatively, you can run an individual Supabase function with Deno runtime, with this command: `deno run --watch --unstable --allow-net --allow-read --allow-env backend\supabase\functions\<function name>\index.ts`, and then make an HTTP request to the corresponding port. 
* General command for Deno run: `deno run --allow-net --allow-read --allow-env file`.

# Setting up for Docker

1. On your hard drive at a permanent location, clone this project by executing command: `git clone --depth 1 https://github.com/supabase/supabase`.
2. Go into the directory.
3. Copy environment variable file with this command: `cp .env.example .env`.

# Ensure Docker Desktop is remained open while developing/debugging. 
- This is because Supabase will tag, build and push a Docker image to its services. The process is handled by them automatically. 

# Working with Docker Image as a normal workflow

1. On the docker git repository that you just cloned as mentioned above, pull the latest image with this command: `docker compose pull`.
2. At the same directory, start the services (in detached mode) with this command `docker compose up -d`.
3. To stop Docker, run this command `docker compose stop` or `docker compose down -v`.
4. To check currently running Docker services, run this command `docker compose ps`.

# Supabase Project Initialisation

1. Run command `npx supabase init` to create a directory for edge functions.
2. Run command `npx supabase start` to start Supabase stack.
3. By default, a GUI will be displayed on http://localhost:54323/.

- Note: To stop Supabase, run command `npx supabase stop`.

# Creating a new Supabase Edge Function (Serverless Function)
- Create a new function with command `supabase functions new function-name` with Supabase CLI.

# Continuous Integration / Continuous Development (CICD) pipelines
1. When you decide to deploy a new function, you can modify the workflow file `build-docker-deploy-supabase.yml` and include modifications in your commit: 
- Add new docker commands; and
- Add new supabase commands to deploy the corresponding function.
2. Merge your changes to the main branch. 
3. Execute the GitHub Action workflow: "Deploy Docker Build for Supabase functions". 
# Creating a Database model in code from Supabase
- Run the following command in the directory where you would like Supabase CLI to auto-generate you a database model file in TypeScript: `supabase gen types typescript --project-id ibhwsqyqdziekcjyakog > database.types.ts`
# Change your environment variables in .env or .env.local using command:
- `supabase secrets set MY_NAME=Chewbacca`
- To see all the secrets stored in a .env file, use this command: `supabase secrets list`.
# Deploying your function codes to Supabase
- Prerequisite: Please ensure that you deploy the .env to remote (not the .env.local).
- Prerequisite: Please ensure Supabase CLI is properly installed. 
1. Run the folliowing command to deploy your .env file to Supabase: `supabase secrets set --env-file ./supabase/.env`.
2. Deploy the function with command `npx supabase functions deploy function-name --project-ref ibhwsqyqdziekcjyakog` (with npm); or `supabase functions deploy function-name --project-ref ibhwsqyqdziekcjyakog` (wtih supabase CLI).
- Note: You may deploy your codes with the CI/CD pipeline. However, it might not deploy the .env file for you, as it is stored locally (not on GitHub).

# Continuous Integration / Continuous Development (CICD) pipelines

1. When you decide to deploy a new function, you can modify the workflow file `build-docker-deploy-supabase.yml` and include modifications in your commit:

- Add new docker commands; and
- Add new supabase commands to deploy the corresponding function.

2. Merge your changes to the main branch.
3. Execute the GitHub Action workflow: "Deploy Docker Build for Supabase functions".

## Supabase Usage

1. Create new function (in `./backend/supabase/functions/<new_function>/index.ts`)

- `supabase functions new <new_function>`

2. Deploy functions

- particular function: `supabase functions deploy <target_function> --project-ref ibhwsqyqdziekcjyakog`
- all functions: `supabase functions deploy --project-ref ibhwsqyqdziekcjyakog`

Other useful commands

- `supabase secrets set <ENV_KEY>=<ENV_VALUE>`
- `supabase secrets list`
  Remarks
- Add `npx` in front of the command if needed
- Check this (tutorial video)[https://www.youtube.com/watch?v=5OWH9c4u68M] if necessary
