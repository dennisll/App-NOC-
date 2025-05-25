import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "./logs"; 
  private readonly allLogPath = "./logs/logs-all.log";
  private readonly mediumLogPath = "./logs/logs-medium.log";
  private readonly highLogPath = "./logs/logs-high.log";

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogPath, this.mediumLogPath, this.highLogPath].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");

    if(content === '') return [];

    //creamos un arreglo de string logs usando el separador \n y luego
    // otro arreglo de logs a partir del array anterior

    //const logs = content.split("\n").map((log) => LogEntity.fromJson(log));
    const logs = content.split("\n").map(LogEntity.fromJson); // lo mismo que arriba
    return logs;
  };

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = `${JSON.stringify(newLog)}\n`;

    // copiamos todos los logs aca
    fs.appendFileSync(this.allLogPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogPath, logAsJson);
    }
  }

  async getLogs(severityLevelLog: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevelLog) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogPath);

      default:
        throw new Error(`${severityLevelLog} not implemented`);
    }
  }
}
