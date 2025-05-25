import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import {  } from "../domain/useCases/checks/check-service";
import { CheckServiceMultiple } from "../domain/useCases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/useCases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logPostgresRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const logFsRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const logMongoRepository = new LogRepositoryImpl(
  new MongoLogDatasource()

);

const emailService = new EmailService();

export class ServerApp {

  public static async start() {
    
    console.log("server started...");

    //const logs = await logRepository.getLogs(LogSeverityLevel.high);

    //console.log(logs);

    /* const sendEmailLogsUseCase = new SendEmailLogs(
      emailService,
      logRepository
    );

    sendEmailLogsUseCase.execute([
      "dennilabrada@gmail.com",
      "dlabrada90@yahoo.com",
    ]); */

    CronService.createJob("*/5 * * * * *", () => {

          const url = "https://www.google.com/"; //"https://www.google.com/" https://localhost:3000
      
      new CheckServiceMultiple(
        () => {
          console.log(` service '${url}': ok`);
        },
        (error: string) => {
          console.log(` error '${error}'`);
        },
        [logFsRepository, logPostgresRepository, logMongoRepository]
      ).execute(url);
    });   
  }
}
