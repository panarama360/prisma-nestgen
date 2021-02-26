/**
 * Created by Ivan on 25.02.2021
 */
import {AppNode} from "./node";
import {Entity} from "./entity";
import {EntityDefinition} from "../definitions/entity.definition";
import {ApplicationDefinition} from "../definitions/application.definition";
import {Enum} from "./enum";
import {EnumDefinition} from "../definitions/enum.definition";

export class Application extends AppNode{
    constructor(public readonly applicationDefinition: ApplicationDefinition) {
        super(null, applicationDefinition);
        applicationDefinition.entities.forEach(entity => {
            this.createEntityIfNotExist(entity);
        })
    }

    public createEntityIfNotExist(entity: EntityDefinition){
        return (this.nodes.get(entity) || this.nodes.set(entity, new Entity(this, entity)).get(entity)) as Entity;
    }

    public createEnumIfNotExist(en: EnumDefinition){
        return (this.nodes.get(en) || this.nodes.set(en, new Enum(this, en)).get(en)) as Enum;
    }

    createEnumByName(name: string){
        const enumDef = this.applicationDefinition.enums.find(value => value.name == name)
        if(!enumDef) throw new Error(`Enum '${name}' not found!`);
        return this.createEnumIfNotExist(enumDef);
    }
}