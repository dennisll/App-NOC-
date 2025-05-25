import mongoose from "mongoose";
import { MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo/models/log.model";

describe("mongo.datasource.ts", () => {

  const logDatasource = new MongoLogDatasource();

  const newLog = new LogEntity({
    message: "gbrthbtrr",
    level: LogSeverityLevel.low,
    origin: "vfvfgbgfb",
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("should create a log", async () => {

    const logSpy = jest.spyOn(console, "log");

    await logDatasource.saveLog(newLog);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo Log created");
  });

  test("should get logs", async () => {

    await logDatasource.saveLog(newLog);

    const logs = await logDatasource.getLogs(LogSeverityLevel.low);
    expect(logs[0].level).toBe(LogSeverityLevel.low);

    await logDatasource.saveLog(newLog);

    const logs2 = await logDatasource.getLogs(LogSeverityLevel.low);
    expect(logs2.length).toBe(2);
  });
});
