import {
  Context,
  create,
  getNumericDate,
  jwtVerify,
  Payload,
} from "../deps.ts";
import { User } from "../db/db.ts";
import env from "../envConfig.ts";

const secretKey = env.accessTokenSecret || "secret";

type myPayload = Payload | User;

export const authenticateToken = async (
  context: Context,
  next: () => Promise<unknown>
) => {
  const { request } = context;
  const authHeader = request.headers.get("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    context.throw(401, "Unauthorized");
  }

  const payload = await jwtVerify(token, secretKey, "HS256");

  if (!payload) {
    context.throw(401, "Unauthorized");
  }

  context.state.id = payload.id;

  await next();
};

export const generateAccessToken = async (payload: myPayload) =>
  await create(
    { alg: "HS256", typ: "JWT" },
    { ...payload, exp: getNumericDate(7200) },
    secretKey
  );
