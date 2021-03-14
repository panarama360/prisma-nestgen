/**
 * Created by Ivan on 10.03.2021
 */
import {HandlerInterface} from "./handler.interface";
import {Options} from "./handler";
import {DMMF} from "prisma/prisma-client/runtime";
import {ApplicationContext} from "./core/application.context";

export class Metadata implements HandlerInterface{
    public metadata: WeakMap<Object, any> = new WeakMap<Object, any>()
    constructor(private readonly options: Options) {
    }


    user(model: DMMF.Model, args: any){
        // console.log(model, args);
    }

    hide(field: DMMF.Field, args: any){

    }



    handle() {

        const app = new ApplicationContext(this.options.dmmf);
        app.generate();
    }
}

