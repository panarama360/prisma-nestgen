/**
 * Created by Ivan on 25.02.2021
 */
import {EntityDefinition} from "../definitions/entity.definition";
import {Application} from "./application";
import {AppNode} from "./node";
import {FieldDefinition, TypeFieldObject} from "../definitions/field.definition";
import {Field} from "./field";

export class Entity extends AppNode<EntityDefinition>{
    constructor(app: Application, entityDef: EntityDefinition) {
        super(app, entityDef);
        entityDef.fields.forEach(fieldDef => {
            if(!this.nodes.get(fieldDef)) this.nodes.set(fieldDef, new Field(this, fieldDef))
        })
    }
}