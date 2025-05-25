import mongoose from "mongoose";
import { MongoDatabase } from "..";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";
import { LogModel } from "./log.model";



describe('test logModel.ts', () => { 

    beforeAll( async ()=>{
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!,
          });
    });

    afterAll(()=>{
        mongoose.connection.close();
    });
    
    test('should return new logModel', async () => { 
        
          const log = {
            message: 'gbrthbtrr',
            level: LogSeverityLevel.low,
            origin: 'vfvfgbgfb'
        }

        const logObject = await LogModel.create(log);

        expect(logObject).toEqual(expect.objectContaining({
            ...log,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }));

        await LogModel.findByIdAndDelete(logObject.id);

     });

     test('should return the schema object', async () => { 
        
      const schema = LogModel.schema.obj;

      expect(schema).toEqual(expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        createdAt: { type: expect.any(Function), default: expect.any(Date) }
      }));
   });
});