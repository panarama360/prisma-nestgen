import {AppNode} from "./node";
import {Entity} from "./entity";
import {
    FieldDefault,
    FieldDefinition,
    FieldRelationM2M,
    FieldRelationO2M, FieldRelationO2O, FieldString,
    RelationTypes,
    TypeFieldObject, TypeFieldScalar
} from "../definitions/field.definition";
import {Enum} from "./enum";
import {Named} from "../definitions/named";
import {Application} from "./application";
import * as camelCase from "camelcase";

/**
 * Created by Ivan on 26.02.2021
 */

export class Field extends AppNode<FieldDefinition> {
    public object: Enum | Entity

    constructor(public entity: Entity, public fieldDef: FieldDefinition) {
        super(entity, fieldDef);
        if (fieldDef.type == TypeFieldObject.Enum) {
            entity.parent.nodes.forEach((value, key: Named) => {
                if (value instanceof Enum && key.name == fieldDef.enum) this.object = value;
            })
            if (!this.object) this.object = (entity.parent as Application).createEnumByName(fieldDef.enum)
        }
        this.resolveRelations();
    }

    resolveRelations() {
        if (this.fieldDef.type == TypeFieldObject.Relation) {
            if (this.fieldDef.relationType == RelationTypes.O2O) this.o2oRelation(this.fieldDef);
            if (this.fieldDef.relationType == RelationTypes.O2M) this.o2mRelation(this.fieldDef);
            if (this.fieldDef.relationType == RelationTypes.M2M) this.m2mRelation(this.fieldDef);
        }
    }

    private o2mRelation(field: FieldRelationO2M) {
        const relatedEntity = this.object as Entity;
        const fields: [FieldDefault, FieldString] = [
            {
                type: TypeFieldScalar.Default,
                name: camelCase(field.relationFieldName || this.entity.definition.name),
                isList: false,
                typeName: camelCase(this.entity.definition.name, {pascalCase: true}),
                isRequired: true,
                relationFields: [camelCase(`${field.relationFieldName || field.nameEntity}-Id`)],
                relationReferences: ['id'],
                relationName: field.relationName,
            }, {
                type: TypeFieldScalar.String,
                name: camelCase(`${field.relationFieldName || this.entity.definition.name}-Id`),
                isRequired: true
            }
        ]
        fields.forEach(value => relatedEntity.nodes.set(value, new Field(relatedEntity, value)))
    }

    private m2mRelation(field: FieldRelationM2M) {
        const relatedEntity = this.object as Entity;
        const fields = [
            {
                type: TypeFieldScalar.Default,
                name: camelCase(field.relationFieldName || this.entity.definition.name),
                isList: true,
                typeName: camelCase(this.entity.definition.name, {pascalCase: true}),
                required: true,
                relationName: field.relationName,
            }
        ]
        fields.forEach(value => relatedEntity.nodes.set(value, new Field(relatedEntity, value)))
    }

    private o2oRelation(field: FieldRelationO2O) {
        const relatedEntity = this.object as Entity;
        const fields: [FieldDefault, FieldString] = [
            {
                type: TypeFieldScalar.Default,
                name: camelCase(field.relationFieldName || this.entity.definition.name),
                isList: false,
                typeName: camelCase(this.entity.definition.name, {pascalCase: true}),
                isRequired: true,
                relationFields: [camelCase(`${field.relationFieldName || field.nameEntity}-Id`)],
                relationReferences: ['id'],
                relationName: field.relationName,
            },
            {
                type: TypeFieldScalar.String,
                name: camelCase(`${field.relationFieldName || this.entity.definition.name}-Id`),
                isRequired: true
            }
        ]
        fields.forEach(value => relatedEntity.nodes.set(value, new Field(relatedEntity, value)))
    }
}