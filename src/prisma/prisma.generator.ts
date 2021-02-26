/**
 * Created by Ivan on 26.02.2021
 */
import {Application} from "../core/nodes/application";
import {Entity} from "../core/nodes/entity";
import * as PrismaSchemaDSL from "prisma-schema-dsl";
import {Field} from "../core/nodes/field";
import {
    DefaultValues,
    FieldDefault,
    FieldDefinition,
    FieldEnum,
    RelationFields, RelationTypes,
    ScalarFields,
    TypeFieldObject, TypeFieldScalar
} from "../core/definitions/field.definition";
import {TypeFieldToScalarPrisma} from "./util";
import * as camelCase from "camelcase";
import {Enum} from "../core/nodes/enum";
import {CallExpression} from "prisma-schema-dsl";

export class PrismaGenerator{

    private readonly clientGenerator = PrismaSchemaDSL.createGenerator(
        "client",
        "prisma-client-js",
        "./generated-prisma/client"
    );

    private readonly dataSource = {
        name: "postgres",
        provider: PrismaSchemaDSL.DataSourceProvider.PostgreSQL,
        url: new PrismaSchemaDSL.DataSourceURLEnv("POSTGRESQL_URL"),
    };

    private schema: PrismaSchemaDSL.Schema;
    constructor(app: Application) {
        const enums: PrismaSchemaDSL.Enum[] = []
        const models: PrismaSchemaDSL.Model[] = [];
        app.visitNodes(appNode => {
            if(appNode instanceof Entity) models.push(this.createEntity(appNode))
            if(appNode instanceof Enum) enums.push(this.createEnum(appNode))
        })

        this.schema = PrismaSchemaDSL.createSchema(models, enums, this.dataSource, [
            this.clientGenerator,
        ]);
    }

    printPrisma(){
        return PrismaSchemaDSL.print(this.schema);
    }
    createEntity(entity: Entity){
        const fields: any[] = []
        entity.visitNodes(appNode => {
            if(appNode instanceof Field) fields.push(...this.createField(appNode));
        })
        return PrismaSchemaDSL.createModel(camelCase(entity.definition.name, {pascalCase: true}), fields);
    }

    isScalar(field: FieldDefinition): field is ScalarFields {
        return field.type != TypeFieldObject.Relation && field.type != TypeFieldObject.Enum;
    }

    isRelation(field: FieldDefinition): field is RelationFields {
        return field.type == TypeFieldObject.Relation;
    }

    isEnum(field: FieldDefinition): field is FieldEnum {
        return field.type == TypeFieldObject.Enum;
    }

    isDefault(field: FieldDefinition): field is FieldDefault {
        return field.type == TypeFieldScalar.Default;
    }

    createField(field: Field){
        if (this.isDefault(field.definition)) {
            return [
                PrismaSchemaDSL.createObjectField(
                    field.definition.name,
                    field.definition.typeName,
                    field.definition.isList,
                    field.definition.isRequired,
                    field.definition.relationName,
                    field.definition.relationFields,
                    field.definition.relationReferences
                )
            ]
        }
        if (this.isScalar(field.definition) && TypeFieldToScalarPrisma[field.definition.type]) {
            let defaultValue = field.definition.default;
            if(defaultValue && Object.values(DefaultValues).includes(defaultValue)) defaultValue = new CallExpression(defaultValue);

            return [PrismaSchemaDSL.createScalarField(field.definition.name,
                TypeFieldToScalarPrisma[field.definition.type],
                false,
                field.definition.isRequired,
                field.definition.isUnique,
                (field as any).definition.isId,
                false,
                defaultValue,
            )] as any;
        }
        if (this.isEnum(field.definition)) {
            return [PrismaSchemaDSL.createObjectField(
                field.definition.name,
                camelCase(field.object.definition.name, {pascalCase: true}),
                false,
                field.definition.isRequired,
            )]
        }
        if (this.isRelation(field.definition)) {
            if (field.definition.relationType == RelationTypes.O2O) {
                return [PrismaSchemaDSL.createObjectField(
                    field.definition.name,
                    camelCase(field.object.definition.name, {pascalCase: true}),
                    false,
                    false,
                    field.definition.relationName,
                )]
            }
            if (field.definition.relationType == RelationTypes.O2M) {
                return [PrismaSchemaDSL.createObjectField(
                    field.definition.name,
                    camelCase(field.object.definition.name, {pascalCase: true}),
                    true,
                    true,
                    field.definition.relationName,
                )]
            }
            if (field.definition.relationType == RelationTypes.M2M) {
                return [PrismaSchemaDSL.createObjectField(
                    field.definition.name,
                    camelCase(field.object.definition.name, {pascalCase: true}),
                    true,
                    true,
                    field.definition.relationName,
                )]
            }
        }
        return [];
    }

    private createEnum(appNode: Enum) {
        return PrismaSchemaDSL.createEnum(appNode.definition.name, appNode.definition.values);
    }
}