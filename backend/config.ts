// Guidance from: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, ".env") });

interface ENV {
    SUPABASE_PWD: string | undefined;
    API_KEY: string | undefined;
    API_SECRET: string | undefined;
    API_URL: string | undefined;
    API_ANON: string | undefined;
    PORT: number | undefined;
}

interface Config {
    SUPABASE_PWD: string;
    API_KEY: string;
    API_SECRET: string;
    API_URL: string;
    API_ANON: string;
    PORT: number;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        SUPABASE_PWD: process.env.SUPABASE_PWD,
        API_KEY: process.env.API_KEY,
        API_SECRET: process.env.API_SECRET,
        API_URL: process.env.API_URL,
        API_ANON: process.env.API_ANON,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined
    };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }
    return config as Config;
};
  
const config = getConfig();
  
const sanitizedConfig = getSanitzedConfig(config);
  
export default sanitizedConfig;