import { Application } from "https://deno.land/x/oak/mod.ts";
import { dotEnvConfig } from "./deps.ts";
import router from "./routes.ts";

const production = Deno.env.get("PRODUCTION");

if (production !== "true") {
  dotEnvConfig({ export: true });
}

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
