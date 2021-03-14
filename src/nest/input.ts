/**
 * Created by Ivan on 11.03.2021
 */

import {DMMF} from '@prisma/generator-helper'
import {Generated} from "../core/generated";
import {scalarToType, scalarToTSType} from "../type.helper";

/**
 * Created by Ivan on 11.03.2021
 */
export interface InputData {
    input: DMMF.InputType
}

export class Input extends Generated<InputData> {
    generate() {
        this.imports.addImports(['InputType', 'Field'], '@nestjs/graphql');

        const classDeclaration = this.sourceFile.addClass({
            isExported: true,
            decorators: [
                {
                    name: 'InputType',
                    arguments: [
                        // `{ isAbstract: true }`
                    ]
                }
            ],
            name: this.model.input.name,
        })
        this.model.input.fields.forEach(value => {
            let inputModel;
            if (value.inputTypes.length == 2) {
                if (value.inputTypes[0].isList != value.inputTypes[1].isList) {
                    inputModel = value.inputTypes[0].isList ? value.inputTypes[0] : value.inputTypes[1];
                }else {
                    inputModel = value.inputTypes.find(val => (val.type as string).match(/Filter$/))
                }
            }
            if (value.inputTypes.length == 1) {
                inputModel = value.inputTypes[0];
            }
            if(!inputModel) inputModel = value.inputTypes[0];
            if (inputModel.location == "scalar") {
                const imp = scalarToType(inputModel.type);
                if(imp && imp.moduleImport) this.imports.addImport(imp.type, imp.moduleImport);
                classDeclaration.addProperty({
                    name: value.name,
                    type: scalarToTSType(inputModel.type),
                    hasQuestionToken: !value.isRequired,
                    decorators: [
                        {
                            name: 'Field',
                            arguments: [`_types => ${imp ? imp.type : inputModel.type}`, `{nullable: ${!value.isRequired}}`]
                        }
                    ]
                })
            }
            if (inputModel.location == "inputObjectTypes") {
                const input = this.context.get(Input, {
                    input: this.context.getDMMFDocument().schema.inputObjectTypes.prisma.find(input => input.name == inputModel.type)
                }, inputModel.type as string);
                this.imports.fromGenerated(input);

                classDeclaration.addProperty({
                    name: value.name,
                    type: `${inputModel.isList ? `${input.getName()}[]` : input.getName()}`,
                    hasQuestionToken: !value.isRequired,
                    decorators: [
                        {
                            name: 'Field',
                            arguments: [`_types => ${inputModel.isList ? `[${input.getName()}]` : input.getName()}`, `{nullable: ${!value.isRequired}}`]
                        }
                    ]
                })
            }
        })
        this.resolveImports();
        this.sourceFile.formatText();
        this.sourceFile.saveSync();
    }


    getKind(): string {
        return "input";
    }

    getName(): string {
        return this.model.input.name;
    }

}