/**
 * Created by Ivan on 13.03.2021
 */
import {Generated} from "../core/generated";
import {DMMF} from "@prisma/client/runtime";
import {Entity} from "./entity";
import {Args} from "./args";

export class Resolver extends Generated<DMMF.Model>{

    generate(): void {
        const entityName = this.model.name;
        const actions = [
            { action: DMMF.ModelAction.create, method: 'Mutation'},
            { action: DMMF.ModelAction.update, method: 'Mutation'},
            { action: DMMF.ModelAction.updateMany, method: 'Mutation'},
            { action: DMMF.ModelAction.delete, method: 'Mutation'},
            { action: DMMF.ModelAction.deleteMany, method: 'Mutation'},
            { action: DMMF.ModelAction.findMany, method: 'Query'},
            { action: DMMF.ModelAction.findOne, method: 'Query'},
        ];

        this.imports.addImports(['Resolver', 'Query', 'Mutation'], '@nestjs/graphql');
        this.imports.addImport(entityName, this.context.getByName(Entity, this.model.name).getSourceFile().getFilePath());

        const classDeclaration = this.sourceFile.addClass({
            isExported: true,
            decorators: [
                {
                    name: 'Resolver',
                    arguments: [
                        `_type => ${entityName}`
                    ]
                }
            ],
            name: `${this.model.name}Resolver`,
        })

        // classDeclaration.addMethods(actions.map(value => {
        //     return {
        //         name: `${value.action}${entityName}`,
        //         decorators: [
        //
        //         ],
        //     }
        // }))


        actions.forEach(value => {
            const arg = this.context.get(Args, {model: this.model, action: value.action}, this.model.name);
            this.imports.addImport(arg.getName(), arg.getSourceFile().getFilePath());
            this.imports.addImport(value.method, '@nestjs/graphql');
            this.imports.addImport('Args', '@nestjs/graphql');

            classDeclaration.addMethod({
                name: `${value.action}${entityName}`,
                decorators: [{
                    name: value.method,
                    arguments: [
                        `returns => ${entityName}`
                    ]
                }],
                parameters: [{
                    name: 'args',
                    decorators: [{
                        name: 'Args',
                        arguments: []
                    }],
                    type: arg.getName()
                }]
            })
        })

        this.resolveImports();
        this.sourceFile.saveSync();
    }

    getKind(): string {
        return "resolver";
    }

    getName(): string {
        return `${this.model.name}Resolver`;
    }

}