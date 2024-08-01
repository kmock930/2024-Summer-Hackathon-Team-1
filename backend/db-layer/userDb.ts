import { createClient } from '@supabase/supabase-js';
import config from '../config';

// Get credentials from .env
const supabaseURL:string = config.API_URL as string;
const apiAnon:string = config.API_ANON as string;


// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, apiAnon);