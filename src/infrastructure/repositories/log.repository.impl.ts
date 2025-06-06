import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasource
    ){}

    saveLog(log: LogEntity): Promise<void> {

        return this.logDatasource.saveLog(log);
    }

    getLogs(severityLevelLog: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevelLog);
    }

}