import { Context } from "../deps.ts";
import { usersCollection } from "../db/db.ts";

export const getAllUsers = async (context: Context) => {
  const { response } = context;
  const users = await usersCollection
    .find({}, { projection: { password: 0 } })
    .toArray();

  if (!users) {
    response.body = {
      success: false,
      message: "No users found",
    };
    response.status = 404;
  } else {
    response.body = {
      success: true,
      data: users,
    };
  }
};
