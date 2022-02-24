import { Application } from "./deps.ts";
import { configureApp } from "./app.ts";
import envVars from "./envConfig.ts";

const { port } = envVars;

const app = new Application();

configureApp(app);

app.addEventListener("listen", ({ hostname, port, secure }) =>
  console.log(
    `Listening on ${secure ? "https://" : "http://"}${
      hostname === "0.0.0.0" ? "localhost" : hostname
    }:${port}`
  )
);

app.addEventListener("error", (event) => {
  console.log(event);
});

await app.listen({ port: Number(port) || 8000 });
