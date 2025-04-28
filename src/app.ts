import { ServerApp } from "./presentation/server";


(async ()=>{
    main();
})()

function main (){
    ServerApp.start();
   //console.log(process.env.PORT);
}