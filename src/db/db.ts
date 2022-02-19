import { MongoClient } from "../deps.ts";
import env from "../envConfig.ts";

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  roles?: string[];
  surname: string;
}

const db = new MongoClient();
const mongoDbUri = Deno.env.get("MONGO_DB_URI");

try {
  await db
    .connect(mongoDbUri || `mongodb://${env.mongoDbHost}:${env.mongoDbPort}`)
    .then(() => {
      console.log("Connected to MongoDB");
    });
} catch (error) {
  console.log(error);
  Deno.exit();
}

const authDb = db.database(env.mongoDbName);
const usersCollection = authDb.collection<User>("users");

export { authDb, usersCollection };
