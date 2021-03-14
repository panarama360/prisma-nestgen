import {DMMF} from "prisma/prisma-client/runtime";
import {Generated} from "../core/generated";
import {Enum} from "./enum";
import {scalarToType, scalarToTSType} from "../type.helper";

/**
 * Created by Ivan on 11.03.2021
 */

export class Entity extends Generated<DMMF.Model>{

    getName(): string {
        return this.model.name;
    }

    generate(){
        this.imports.addImports(['ObjectType', 'Field'], '@nestjs/graphql');

        const classDeclaration = this.sourceFile.addClass({
            isExported: true,
            decorators: [
                {
                    name: 'ObjectType',
                    arguments: [
                        `{ isAbstract: true }`
                    ]
                }
            ],
            name: this.model.name,
        })
        this.model.fields.forEach(field => {
            let type;
            let tsType;
            if(field.kind == "enum"){
                type = tsType = field.type;
                const model = this.context.getDMMFDocument().datamodel.enums.find(value => value.name == field.type);
                this.imports.addImport(type, this.context.get(Enum, model, model.name).getSourceFile().getFilePath())
            }
            if(field.kind == "object"){
                type = tsType = field.type;
                const model = this.context.getDMMFDocument().datamodel.models.find(value => value.name == field.type);
                this.imports.addImport(type, this.context.get(Entity, model, model.name).getSourceFile().getFilePath())
            }
            if(field.kind == "scalar"){
                type = field.type;
                if(field.type == 'Int' || field.type == 'Float'){
                    this.imports.addImport(field.type, '@nestjs/graphql');
                    tsType = 'number';
                }
                if(field.type == 'String'){
                    tsType = 'string';
                }
                if(field.type == 'Boolean'){
                    tsType = 'boolean';
                }
                if(field.type == 'DateTime'){
                    type = 'Date';
                    tsType = 'Date';
                }
            }

            if (field.kind == "scalar") {
                const imp = scalarToType(field.type);
                if(imp && imp.moduleImport) this.imports.addImport(imp.type, imp.moduleImport);
                type = imp ? imp.type : field.type
                tsType = scalarToTSType(field.type)
            }
            classDeclaration.addProperty({
                name: field.name,
                type: tsType,
                trailingTrivia: "\r\n",
                decorators: [
                    {
                        name: 'Field',
                        arguments: [
                            writer => writer.write(`_type => ${type}`),
                            writer => writer.write(`{ nullable: ${!field.isRequired} }`),
                        ]
                    }
                ]
            })
        })

        this.resolveImports();
        this.sourceFile.saveSync();
    }

    getKind(): string {
        return "entity";
    }
}