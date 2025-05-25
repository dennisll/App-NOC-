import { envs } from "./envs.plugin";



describe('env.plugin.ts', () => { 

    test('should return env options', () => { 
        
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'dennislabrada99@gmail.com',
            MAILER_SECRET_KEY: 'hpapbtmvqrxvvzbj',
            PROD: false,
            MONGO_URL: 'mongodb://root:example@localhost:27018/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'root',
            MONGO_PASS: 'example',
            POSTGRES_URL: 'postgresql://postgres:12345678@localhost:5432/NOC-TEST',
            POSTGRES_DB_NAME: 'NOC-TEST',
            POSTGRES_USER: 'postgres',
            POSTGRES_PASS: '12345678'
          });
     });


     test('should return error if not found env', async () => { 
        
        jest.resetModules();
        process.env.PORT ='abc';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);  
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
      })
});