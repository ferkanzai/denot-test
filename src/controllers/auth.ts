import { Context, hash, verify } from "../deps.ts";
import { usersCollection } from "../db/db.ts";
import { generateAccessToken } from "../middlewares/authMiddlewares.ts";

export const login = async (context: Context) => {
  const { request, response } = context;

  const { email, password } = await request.body().value;

  if (!email || !password) {
    context.throw(400, "Email and password are required");
  }

  const foundUser = await usersCollection.findOne({ email });
  const user = {
    id: foundUser?._id,
    email: foundUser?.email,
    name: foundUser?.name,
  };
  const isPasswordValid = verify(password, foundUser?.password as string);

  if (!foundUser || !isPasswordValid) {
    context.throw(403, "Bad credentials");
  }

  const token = await generateAccessToken(user);

  response.body = {
    success: true,
    data: user,
    token: `Bearer ${token}`,
  };
};

export const singUp = async (context: Context) => {
  const { request, response } = context;

  const { email, password, name, surname } = await request.body().value;

  if (!email || !password || !name) {
    context.throw(400, "Email, password and name are required");
  }

  const emailExists = await usersCollection.findOne({ email });

  if (emailExists) {
    context.throw(403, "Email already exists");
  }

  const newUser = {
    email,
    password: await hash(password),
    name,
    surname,
  };

  try {
    const token = await generateAccessToken(newUser);

    await usersCollection.insertOne(newUser);

    response.status = 201;
    response.body = {
      success: true,
      data: {
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
      },
      token: `Bearer ${token}`,
    };
  } catch (error) {
    context.throw(500, error);
  }
};

export const test = (context: Context) => {
  context.response.body = {
    success: true,
    token: context.state.token,
    message: "test",
  };
};