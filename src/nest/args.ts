/**
 * Created by Ivan on 13.03.2021
 */
import {Generated} from "../core/generated";
import {DMMF} from "@prisma/client/runtime";
import {Input} from "./input";
import * as camelcase from 'camelcase'

export interface ArgsData {
    action: DMMF.ModelAction,
    model: DMMF.Model
}

// updateMany
export class Args extends Generated<ArgsData> {

    generate(): void {
        this.imports.addImports(['Field', 'ArgsType'], '@nestjs/graphql');
        const inputImports: string[] = []
        switch (this.model.action) {
            case DMMF.ModelAction.findOne:
                inputImports.push(...this.whereUnique())
                break;
            case DMMF.ModelAction.findMany:
                inputImports.push(...this.where())
                break;
            case DMMF.ModelAction.deleteMany:
                inputImports.push(...this.where())
                break;
            case DMMF.ModelAction.delete:
                inputImports.push(...this.whereUnique())
                break;

            case DMMF.ModelAction.create:
                inputImports.push(...this.create())
                break;
            case DMMF.ModelAction.update:
                inputImports.push(...this.update())
                break;
            case DMMF.ModelAction.updateMany:
                inputImports.push(...this.updateMany())
                break;
        }

        this.sourceFile.formatText();
        inputImports.forEach(val => {
            const input = this.context.getDMMFDocument().schema.inputObjectTypes.prisma.find(value => value.name == val);
            const inputGen = this.context.get(Input, {
                input,
            }, input.name)
            this.imports.addImport(val, inputGen.getSourceFile().getFilePath());
        })

        this.resolveImports();
        this.sourceFile.saveSync();
    }

    getKind(): string {
        return "args";
    }

    private where() {
        const whereName = `${this.model.model.name}WhereInput`
        this.sourceFile.insertText(0, `
            @ArgsType()
            export class ${this.getName()} {
            
                @Field((type) => ${whereName})
                where: ${whereName}
            }
        `);
        return [whereName];
    }

    private whereUnique() {
        const whereName = `${this.model.model.name}WhereUniqueInput`
        this.sourceFile.insertText(0, `
            @ArgsType()
            export class ${this.getName()} {
            
                @Field((type) => ${whereName})
                where: ${whereName}
            }
        `);
        return [whereName];
    }

    private updateMany() {
        const whereName = `${this.model.model.name}WhereInput`
        const dataName = `${this.model.model.name}UpdateManyMutationInput`
        this.sourceFile.insertText(0, `
            @ArgsType()
            export class ${this.getName()} {
            
                @Field((type) => ${dataName})
                data: ${dataName}
                
                @Field((type) => ${whereName})
                where: ${whereName}
            }
        `);
        return [whereName, dataName]
    }

    getName(): string {
        return `${camelcase(this.model.action, {pascalCase: true})}${this.model.model.name}Args`;
    }

    private create() {

        const dataName = `${this.model.model.name}CreateInput`
        this.sourceFile.insertText(0, `
            @ArgsType()
            export class ${this.getName()} {
            
                @Field((type) => ${dataName})
                data: ${dataName}
                
            }
        `);
        return [dataName]
    }

    private update() {
        const whereName = `${this.model.model.name}WhereUniqueInput`
        const dataName = `${this.model.model.name}UpdateInput`
        this.sourceFile.insertText(0, `
            @ArgsType()
            export class ${this.getName()} {
            
                @Field((type) => ${dataName})
                data: ${dataName}
                
                @Field((type) => ${whereName})
                where: ${whereName}
            }
        `);
        return [whereName, dataName]
    }
}