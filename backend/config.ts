// Guidance from: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
//import path from "path";
//import dotenv from "dotenv";

import { config } from "https://deno.land/x/dotenv/mod.ts";

// Load the .env file
const env = config();

// Capture the env variables
export const API_ANON:string = env.API_ANON as string;
export const API_URL:string = env.API_URL as string;
export const PORT:number = env.PORT ? Number(env.PORT) : undefined;