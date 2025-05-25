import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("test on init.ts", () => {

    afterAll( ()=>{
        mongoose.connection.close();
    });
    
  test("should connect to mongodb", async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });

    expect(connected).toBeTruthy();
  });

  test("should return throw error", async () => {
    try {

      const connected = await MongoDatabase.connect({
        mongoUrl: "mongodb://root:example@localhostbrtyhnt:27018/",
        dbName: process.env.MONGO_DB_NAME!,
      });

      expect(true).toBe(false);
    } catch (error) {}
  });
});
