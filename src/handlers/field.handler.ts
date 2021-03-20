/**
 * Created by Ivan on 10.03.2021
 */
import {DMMF} from "prisma/prisma-client/runtime";
import {ApplicationContext} from "../core/application.context";
import {Options} from "../generator";
import {HandlerOptionsModel} from "./handler.options";

export class Field {

    constructor(private readonly context: ApplicationContext) {
    }


    user(options: HandlerOptionsModel<string>){
    }

    test(field: DMMF.Field, args: any){

    }



    handle() {


    }
}

