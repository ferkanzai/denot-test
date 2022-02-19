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

try {
  if (env.production) {
    await db.connect({
      db: env.mongoDbName as string,
      tls: true,
      servers: [
        {
          host: "users-shard-00-01.avmtj.mongodb.net",
          port: 27017,
        },
        {
          host: "users-shard-00-00.avmtj.mongodb.net",
          port: 27017,
        },
        {
          host: "users-shard-00-02.avmtj.mongodb.net",
          port: 27017,
        },
      ],
      credential: {
        db: env.mongoDbName,
        mechanism: "SCRAM-SHA-1",
        password: env.mongoDbPassword,
        username: env.mongoDbUser,
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
