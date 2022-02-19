import { dotEnvConfig } from "./deps.ts";

const production = Deno.env.get("PRODUCTION");

if (production !== "true") {
  dotEnvConfig({ export: true });
}

export default {
  accessTokenSecret: Deno.env.get("ACCESS_TOKEN_SECRET"),
  mongoDbCluster00: Deno.env.get("MONGO_DB_CLUSTER_00"),
  mongoDbCluster01: Deno.env.get("MONGO_DB_CLUSTER_01"),
  mongoDbCluster02: Deno.env.get("MONGO_DB_CLUSTER_02"),
  mongoDbHost: Deno.env.get("MONGO_DB_HOST"),
  mongoDbName: Deno.env.get("MONGO_DB_NAME"),
  mongoDbPassword: production && Deno.env.get("MONGO_DB_PASSWORD"),
  mongoDbPort: Deno.env.get("MONGO_DB_PORT"),
  mongoDbUser: Deno.env.get("MONGO_DB_USER"),
  port: Deno.env.get("PORT"),
  production: production === "true",
};
