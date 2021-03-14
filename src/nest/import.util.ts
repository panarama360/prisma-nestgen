/**
 * Created by Ivan on 10.03.2021
 */
import {SourceFile} from "ts-morph";
import * as path from "path";
import {Generated} from "../core/generated";

export class Imports{
    public imports: Record<string, Set<string>> = {};

    addImport(impName: string, path: string){
        if(!this.imports[path]) this.imports[path] = new Set<string>();
        this.imports[path].add(impName)
    }
    fromGenerated(gen: Generated<any>){
        this.addImport(gen.getName(), gen.getSourceFile().getFilePath())
    }
    addImports(impNames: string[], path: string){
        impNames.forEach(value => this.addImport(value, path))
    }

    resolveImports(file: SourceFile){
        for (const imp in this.imports){
            let p = imp;
            if(path.isAbsolute(p))
                p = './'+file.getRelativePathTo(imp)
                    .replace(/\.ts/g, '');
            if(file.getFilePath() !== imp)
                file.addImportDeclaration({
                    namedImports: Array.from(this.imports[imp].values()).map(value => ({
                        name: value
                    })),
                    moduleSpecifier: `${p}`
                })
        }
    }
}
