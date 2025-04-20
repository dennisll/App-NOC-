import { CheckService } from "../domain/useCases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
  public static start() {
    console.log("server started...");

    CronService.createJob("*/5 * * * * *", () => {

      const url = "https://www.google.com/";
      new CheckService(
        () => {
          console.log(` service '${url}': ok`);
        },
        (error: string) => {
          console.log(` error '${error}'`);
        }
      ).execute(url);
    });
  }
}
