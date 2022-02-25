import { MongoClient } from "../deps.ts";
import { User } from "../types.ts";
import env from "../envConfig.ts";

const {
  mongoDbCluster00,
  mongoDbCluster01,
  mongoDbCluster02,
  mongoDbHost,
  mongoDbName,
  mongoDbPassword,
  mongoDbPort,
  mongoDbUser,
  production,
} = env;

const db = new MongoClient();

try {
  if (production) {
    await db
      .connect({
        db: mongoDbName as string,
        tls: true,
        servers: [
          {
            host: mongoDbCluster01 as string,
            port: Number(mongoDbPort),
          },
          {
            host: mongoDbCluster00 as string,
            port: Number(mongoDbPort),
          },
          {
            host: mongoDbCluster02 as string,
            port: Number(mongoDbPort),
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
        console.log(`Connected to MongoDB at ${mongoDbHost}:${mongoDbPort}`);
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
