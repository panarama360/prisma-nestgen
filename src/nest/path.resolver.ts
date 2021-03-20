import {DMMF} from "@prisma/client/runtime";
import {ArgsData} from "./generated/args";
import {InputData} from "./generated/input";

/**
 * Created by Ivan on 12.03.2021
 */

export const PathResolver = {
    entity(model: DMMF.Model){
        return `./gen/${model.name.toLowerCase()}/${model.name}.entity.ts`
    },
    enum(model: DMMF.SchemaEnum){
        return `./gen/enums/${model.name}.enum.ts`
    },
    input(model: InputData){
        return `./gen/inputs/${model.input.name}.input.ts`
    },
    resolver(model: DMMF.Model){
        return `./gen/${model.name.toLowerCase()}/${model.name}.resolver.ts`
    },
    args(model: ArgsData){
        return `./gen/${model.model.name}/args/${model.model.name}.${model.action}.args.ts`
    },
    union(model: { args: DMMF.SchemaArgInputType[] }){
        return `./gen/union/${model.args.map(value => value.type).join('And')}.union.ts`
    },
    "prisma.service"(){
        return `./gen/prisma.service.ts`
    }
}