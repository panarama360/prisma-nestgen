/**
 * Created by Ivan on 13.03.2021
 */
import {getDMMF} from "@prisma/sdk";
import {handler} from "../generator";

async function main(){
    const dmmf = await getDMMF({
        datamodelPath: './prisma/schema.prisma',
    });
    handler({
        dmmf: dmmf,
        handler: './src/handlers/handlers.ts'
    });
    setInterval(()=>{}, 200);
}
main();