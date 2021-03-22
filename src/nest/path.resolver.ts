import {DMMF} from "@prisma/client/runtime";
import {Args, ArgsData} from "./generated/args";
import {Entity} from "./generated/entity";
import {Enum} from "./generated/enum";
import {Input} from "./generated/input";
import {Resolver} from "./generated/resolver";
import {Output} from "./generated/output";

/**
 * Created by Ivan on 12.03.2021
 */

export const PathResolver = {
    entity(gen: Entity){
        return `./gen/${gen.getGenData().toLowerCase()}/${gen.getGenData()}.entity.ts`
    },
    enum(gen: Enum){
        return `./gen/enums/${gen.getGenData()}.enum.ts`
    },
    input(gen: Input){
        return `./gen/inputs/${gen.getGenData()}.input.ts`
    },
    resolver(gen: Resolver){
        return `./gen/${gen.getGenData().toLowerCase()}/${gen.getGenData()}.resolver.ts`
    },
    args(gen: Args){
        return `./gen/${gen.getGenData().modelName}/args/${gen.getGenData().modelName}.${gen.getGenData().action}.args.ts`
    },
    output(gen: Output) {
        return `./gen/outputs/${gen.getGenData()}.output.ts`
    },
    "prisma.service"(){
        return `./gen/prisma.service.ts`
    }
}