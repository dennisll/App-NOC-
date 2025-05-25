
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { LogModel } from "./data/mongo/models/log.model";
import { PrismaClient } from "./generated/prisma";
import { ServerApp } from "./presentation/server";


(async ()=>{
    main();
})()

async function main (){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    ServerApp.start();
}