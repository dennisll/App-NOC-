import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("send-email-logs.ts", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
  };

  test("deberia retornar true al enviar el correo", async () => {
    const email = new SendEmailLogs(
      mockEmailService as any,
      mockLogRepository as any
    );

    const to = "dennis@gmail.com";

    const result = await email.execute(to);

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      to
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log Email sent",
      origin: "send-email-log.ts",
    });
  });

  test("deberia retornar false al enviar el correo", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

    const email = new SendEmailLogs(
      mockEmailService as any,
      mockLogRepository as any
    );

    const to = "dennis@gmail.com";

    const result = await email.execute(to);

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      to
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log Email sent",
      origin: "send-email-log.ts",
    });
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({"createdAt": expect.any(Date), "level": "low", "message": "Error: Email log not sent", "origin": "send-email-log.ts"});
  });
});
