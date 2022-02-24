import { Context } from "../deps.ts";
import { usersCollection } from "../db/db.ts";

export const getAllUsers = async (context: Context) => {
  const { response } = context;
  const users = await usersCollection
    .find({}, { projection: { password: 0 } })
    .toArray();

  if (!users) {
    context.throw(404, "No users found");
  }

  response.body = {
    success: true,
    data: users,
  };

  return;
};
