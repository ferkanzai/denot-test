import { Application, bold, green, red, yellow, oakCors } from "./deps.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.ts";
import router from "./routes/routes.ts";

const visualResponseTime = (rt: string): string => {
  const rtNumber = Number(rt.split("ms")[0]);
  const isSlow = rtNumber >= 200;

  return isSlow ? red(rt) : green(rt);
};

const statusColor = (status: number): string => {
  const isError = status >= 400;
  return isError ? red(status.toString()) : green(status.toString());
};

export const configureApp = (app: Application): Application => {
  // Timing
  app.use(async (ctx, next) => {
    const start = Date.now();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
    await next();
  });

  // Logger
  app.use(async (ctx, next) => {
    const responseTime = ctx.response.headers.get("X-Response-Time");
    ctx.response.headers.set("Content-Type", "application/json");
    const status = ctx.response.status;
    const responseDate = new Date().toLocaleDateString("es", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    console.log(
      `[${responseDate}] ${yellow(ctx.request.method)} ${bold(
        ctx.request.url.pathname
      )} - ${visualResponseTime(
        responseTime as string
      )} - status: ${statusColor(status)}`
    );

    await next();
  });

  app.use(errorMiddleware);

  app.use(
    oakCors({
      origin: "*",
    })
  );
  app.use(router.allowedMethods());
  app.use(router.routes());

  return app;
};
