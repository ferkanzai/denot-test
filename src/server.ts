import { Application } from "https://deno.land/x/oak/mod.ts";
import * as env from "https://deno.land/x/dinoenv@v1.1.0/mod.ts";
import router from "./routes.ts";

env.config({ path: './.env'});
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
