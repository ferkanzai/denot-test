import { Context, Middleware, Status, isHttpError } from "../deps.ts";

const unAuthMessages = [
  "The jwt's signature does not match the verification signature.",
  "The jwt is expired.",
  "The serialization of the jwt is invalid.",
  "The jwt has an invalid 'exp' or 'nbf' claim.",
  "The jwt is used too early.",
  "The signature of the jwt must be a string.",
  "The header 'alg' parameter of the jwt must be a string.",
  "The jwt claims set is not a JSON object.",
];

const errorMiddleware: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>
) => {
  try {
    await next();
  } catch (error) {
    if (
      error.name === RangeError.name &&
      unAuthMessages.includes(error.message)
    ) {
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = {
        success: false,
        message: "Unauthorized - invalid token",
      };

      return;
    }

    ctx.response.status = error.status || 500;
    ctx.response.body = {
      success: false,
      message: error.message,
    };

    return;
  }
};

export { errorMiddleware };
