import {SourceFile} from "ts-morph";
import {ApplicationContext} from "./application.context";
import {Imports} from "../nest/import.util";
import {PathResolver} from "../nest/path.resolver";

/**
 * Created by Ivan on 12.03.2021
 */

export abstract class Generated<T>{
    protected readonly sourceFile: SourceFile;
    protected readonly imports: Imports = new Imports();
    abstract generate(): void;

    constructor(protected context: ApplicationContext, protected model: T) {
        this.sourceFile = context.getProject().createSourceFile(PathResolver[this.getKind()](model), '', {
            overwrite: true
        });
    }

    getSourceFile(): SourceFile{
        return  this.sourceFile;
    };

    resolveImports(){
        this.imports.resolveImports(this.sourceFile);
    }

    abstract getName(): string

    abstract getKind(): string;
}