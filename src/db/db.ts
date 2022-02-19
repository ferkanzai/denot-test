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

console.log(env);

try {
  if (env.production) {
    await db.connect({
      db: env.mongoDbName as string,
      tls: true,
      servers: [
        {
          host: env.mongoDbHost as string,
          port: 27017,
        },
      ],
      credential: {
        username: env.mongoDbUser,
        password: env.mongoDbPassword,
        db: env.mongoDbName as string,
        mechanism: "SCRAM-SHA-1",
      },
    });
  } else {
    await db
      .connect(`mongodb://${env.mongoDbHost}:${env.mongoDbPort}`)
      .then(() => {
        console.log("Connected to MongoDB");
      });
  }
} catch (error) {
  console.log(error);
}

const authDb = db.database(env.mongoDbName);
const usersCollection = authDb.collection<User>("users");

export { db, usersCollection };
