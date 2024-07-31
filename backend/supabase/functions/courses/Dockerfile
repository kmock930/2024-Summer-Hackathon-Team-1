# Use the official Deno image
FROM denoland/deno:latest

# Set the working directory
WORKDIR /

# Copy the rest of the application code (edge functions)
COPY . .

RUN deno cache index.ts

# Define the command to run the app
CMD ["run", "--allow-net", "--allow-read", "index.ts"]