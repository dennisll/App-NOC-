import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasource implements LogDatasource{

    async  saveLog(log: LogEntity): Promise<void> {
       const newLog = await LogModel.create(log);
       //newLog.save();
       console.log('Mongo Log created');
    }

    async  getLogs(severityLevelLog: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({
            level: severityLevelLog
        });

        return logs.map(LogEntity.fromObject);
    }

}