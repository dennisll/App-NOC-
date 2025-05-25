import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('test en log.repository.impl', () => { 

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    
      const newLog = new LogEntity({
        message: "gbrthbtrr",
        level: LogSeverityLevel.low,
        origin: "vfvfgbgfb",
      });
    
      beforeAll(async () => {
        jest.clearAllMocks();
      });
    
    test('deberia llamar al metodo de save log', async () => { 

        const logRepository = new LogRepositoryImpl(mockLogDatasource);
        await logRepository.saveLog(newLog);

        expect(mockLogDatasource.saveLog).toHaveBeenCalled();
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(newLog);
     })

     test('deberia llamar al metodo de get logs', async () => { 

        const logRepository = new LogRepositoryImpl(mockLogDatasource);
        await logRepository.getLogs(LogSeverityLevel.low);

        expect(mockLogDatasource.getLogs).toHaveBeenCalled();
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
     })
})