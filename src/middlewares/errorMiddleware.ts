import { Context } from "../deps.ts";

const unAuthMessages = [
  "The jwt's signature does not match the verification signature.",
  "The jwt is expired.",
  "The serialization of the jwt is invalid.",
];

const errorMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  const { response } = ctx;

  try {
    await next();

    if (ctx.response.status === 404) {
      ctx.throw(404, "Not Found");
    }
  } catch (error) {
    console.log(error);

    if (unAuthMessages.includes(error.message)) {
      response.status = 401;
      response.body = {
        success: false,
        message: "Unauthorized",
      };
    } else {
      response.status = error.status || 500;
      response.body = {
        success: false,
        message: error.message,
      };
    }
  }
};

export { errorMiddleware };
