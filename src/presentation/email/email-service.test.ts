import nodemailer from "nodemailer";
import { EmailService, SendEmailOptions } from "./email-service";

describe("EmailService", () => {

    beforeAll( ()=>{
        jest.clearAllMocks();
    });

  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailSevice = new EmailService();

  const options: SendEmailOptions = {
    to: "fernando@google.com",
    subject: "Test",
    htmlBody: "<h1>Test</h1>",
  };

  test("should send email", async () => {

    await emailSevice.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "fernando@google.com",
      attachments: []
    });
  });

  test("should send email with attachements", async () => {

    options.attachements = [
        { fileName: "logs-all.log", path: "./logs/logs-all.log" },
        { fileName: "logs-high.log", path: "./logs/logs-high.log" },
        { fileName: "logs-medium.log", path: "./logs/logs-medium.log" },
      ] 
    await emailSevice.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: options.to,
      subject: options.subject,
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { fileName: "logs-all.log", path: "./logs/logs-all.log" },
        { fileName: "logs-high.log", path: "./logs/logs-high.log" },
        { fileName: "logs-medium.log", path: "./logs/logs-medium.log" },
      ]),
    });
  });
});
