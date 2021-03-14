/**
 * Created by Ivan on 12.03.2021
 */
import {Generated} from "./generated";
import {Project} from "ts-morph";
import {DMMF} from "prisma/prisma-client/runtime";
import {Enum} from "../nest/enum";
import {Entity} from "../nest/entity";
import {Resolver} from "../nest/resolver";


export class ApplicationContext{
    public generated: Generated<any>[] = [];
    private project: Project = new Project();

    constructor(private readonly document: DMMF.Document) {

    }
    getProject(){
        return this.project;
    }

    getDMMFDocument(){
        return this.document;
    }

    getModelNames(){
        return this.document.datamodel.models.map(value => value.name);
    }

    getEnumNames(){
        return this.document.datamodel.enums.map(value => value.name);
    }

    generate(){
        this.document.datamodel.enums.forEach(value => {
            this.get(Enum, value, value.name);
        })

        this.document.datamodel.models.forEach(value => {
            this.get(Entity, value, value.name);
            this.get(Resolver, value, value.name);
        })
    }

    getByName(constructor: new (...args: any) => Generated<any>, name: string){
        return this.generated.find(value => value instanceof constructor && value.getName() == name)
    }

    get<T>(constructor: new (app: ApplicationContext, model: T) => Generated<T>, model: T, name: string){
        const gen = this.getByName(constructor, name);
        if(gen) return gen;
        const ent = new constructor(this, model);
        this.generated.push(ent);
        ent.generate();
        return ent;
    }
}