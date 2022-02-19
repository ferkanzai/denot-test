import { dotEnvConfig } from "./deps.ts";

const production = Deno.env.get("PRODUCTION");

if (production !== "true") {
  dotEnvConfig({ export: true });
}

export default {
  mongoDbHost: Deno.env.get("MONGO_DB_HOST"),
  mongoDbPort: Deno.env.get("MONGO_DB_PORT"),
  mongoDbUser: Deno.env.get("MONGO_DB_USER"),
  mongoDbPassword: production && Deno.env.get("MONGO_DB_PASSWORD"),
  mongoDbName: Deno.env.get("MONGO_DB_NAME"),
  port: Deno.env.get("PORT"),
  accessTokenSecret: Deno.env.get("ACCESS_TOKEN_SECRET"),
};
