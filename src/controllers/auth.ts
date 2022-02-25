import { Context, hash, verify, Payload } from "../deps.ts";
import { usersCollection } from "../db/db.ts";
import { generateAccessToken } from "../middlewares/authMiddlewares.ts";
import { User } from "../types.ts";

export const signIn = async (context: Context) => {
  const { request, response } = context;

  const { email, password } = await request.body().value;

  if (!email || !password) {
    context.throw(400, "Email and password are required");
  }

  const foundUser = await usersCollection.findOne({ email });
  const user = {
    email: foundUser?.email,
    id: foundUser?._id,
    name: foundUser?.name,
    roles: foundUser?.roles,
    surname: foundUser?.surname,
  };
  const isPasswordValid = verify(password, foundUser?.password as string);

  if (!foundUser || !isPasswordValid) {
    context.throw(403, "Bad credentials");
  }

  const payload: Payload = {
    aud: user.id,
    name: `${user.name} ${user.surname}`,
    roles: user.roles,
  }

  const token = await generateAccessToken(payload);

  response.body = {
    success: true,
    data: user,
    token: `Bearer ${token}`,
  };
};

export const singUp = async (context: Context) => {
  const { request, response } = context;

  if (!request.hasBody) {
    context.throw(400, "Request body cannot be empty");
  }

  const { email, password, name, surname } = await request.body().value;

  if (!email || !password || !name || !surname) {
    context.throw(400, "Email, password, name and surname are required");
  }

  const userExists = await usersCollection.findOne({ email });

  if (userExists) {
    context.throw(403, "Email already exists");
  }

  const newUser: User = {
    email,
    name,
    password: await hash(password),
    roles: ["user"],
    surname,
  };

  try {
    const _id = await usersCollection.insertOne(newUser);
    console.log(_id);

    const payload: Payload = {
      aud: _id as string,
      name: `${newUser.name} ${newUser.surname}`,
      roles: newUser.roles,
    };

    const token = await generateAccessToken(payload);

    response.status = 201;
    response.body = JSON.stringify({
      success: true,
      data: {
        id: _id,
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
      },
      token: `Bearer ${token}`,
    });

    return;
  } catch (error) {
    context.throw(500, error);
  }
};

export const test = (context: Context) => {
  context.response.body = {
    success: true,
    userId: context.state.id,
    message: "test",
  };

  return;
};
