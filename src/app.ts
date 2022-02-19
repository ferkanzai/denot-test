import { Application, bold, green, red, yellow } from "./deps.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.ts"

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
  // Logger
  app.use(async (ctx, next) => {
    await next();
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
  });

  // Timing
  app.use(async (ctx, next) => {
    await next();
    const start = Date.now();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

  app.use(errorMiddleware);

  return app;
};
