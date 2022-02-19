import { MongoClient } from "../deps.ts";
import env from "../envConfig.ts";

const {
  mongoDbHost,
  mongoDbName,
  mongoDbPassword,
  mongoDbPort,
  mongoDbUser,
  production,
} = env;

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
  if (production) {
    await db
      .connect({
        db: mongoDbName as string,
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
          db: mongoDbName,
          mechanism: "SCRAM-SHA-1",
          password: mongoDbPassword,
          username: mongoDbUser,
        },
      })
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } else {
    await db.connect(`mongodb://${mongoDbHost}:${mongoDbPort}`).then(() => {
      console.log(`Connected to MongoDB at ${mongoDbHost}:${mongoDbPort}`);
    });
  }
} catch (error) {
  console.log(error);
}

const authDb = db.database(mongoDbName);
const usersCollection = authDb.collection<User>("users");

export { db, usersCollection };
