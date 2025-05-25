import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";


const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource{

    async saveLog(log: LogEntity): Promise<void> {

       const level = severityEnum[log.level];

       const newLog = await  prisma.logModel.create({
         data: {
            ...log,
         level: level
         }
       });

       console.log('Postgres log created');
    }


    async getLogs(severityLevelLog: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevelLog];

        const dbLog = await prisma.logModel.findMany({
            where: { level }
        });

        return dbLog.map(LogEntity.fromObject);
    }

}