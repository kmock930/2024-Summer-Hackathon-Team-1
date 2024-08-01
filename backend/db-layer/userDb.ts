import { createClient } from 'jsr:@supabase/supabase-js@2';

import { API_ANON, API_URL, PORT } from '../config.ts';

// Get credentials from .env
const supabaseURL:string = API_URL as string;
const apiAnon:string = API_ANON as string;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, apiAnon);