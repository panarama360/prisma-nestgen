import {DMMF} from "prisma/prisma-client/runtime";
import {Generated} from "../core/generated";

/**
 * Created by Ivan on 11.03.2021
 */

export class Enum extends Generated<DMMF.DatamodelEnum>{
    getName(): string {
        return this.model.name;
    }
    generate(){
        this.imports.addImport('registerEnumType', '@nestjs/graphql');
        const en = this.sourceFile.addEnum({
            isExported: true,
            name: this.model.name,
            members: this.model.values.map(val => ({
                name: val.name,
            }))
        })
        this.sourceFile.insertText(this.sourceFile.getLastChild().getPos(), `
        registerEnumType(${en.getName()}, {
          name: '${en.getName()}'
        });
        `)
        this.sourceFile.formatText();
        this.resolveImports();
        this.sourceFile.saveSync();
    }

    getKind(): string {
        return 'enum';
    }
}