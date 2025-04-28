import { CheckService } from "../domain/useCases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

export class ServerApp {
  public static start() {
    console.log("server started...");

    CronService.createJob("*/5 * * * * *", () => {

      const url = "https://localhost:3000"; //"https://www.google.com/"
      
      new CheckService(
        () => {
          console.log(` service '${url}': ok`);
        },
        (error: string) => {
          console.log(` error '${error}'`);
        }, fileSystemRepository
      ).execute(url);
    });
  }
}
