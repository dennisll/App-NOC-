import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {

      //const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error("Email log not sent");
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: "Log Email sent",
        origin: "send-email-log.ts",
      });

      this.logRepository.saveLog(log);

      return true;

    } catch (error) {

        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: `${error}`,
            origin: "send-email-log.ts",
          });
    
          this.logRepository.saveLog(log);

      return false;
    }
  }
}
