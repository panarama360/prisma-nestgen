/**
 * Created by Ivan on 13.03.2021
 */
import {getDMMF} from "@prisma/sdk";
import {handler} from "../handler";

async function main(){
    const dmmf = await getDMMF({
        datamodelPath: './prisma/schema.prisma',
    });
    handler({
        dmmf: dmmf,
        handler: './src/prisma.handler.ts'
    });
    setInterval(()=>{}, 200);
}
main();