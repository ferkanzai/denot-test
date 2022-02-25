import { Context, Middleware } from "../deps.ts";

const errorMiddleware: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  try {
    await next();
  } catch (error) {
    console.log(error.message)

    ctx.response.status = error.status || 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };

    return;
  }
};

export { errorMiddleware };
