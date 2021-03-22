import {SourceFile} from "ts-morph";
import {ApplicationContext} from "./application.context";
import {Imports} from "../nest/imports";
import {PathResolver} from "../nest/path.resolver";

/**
 * Created by Ivan on 12.03.2021
 */

export abstract class Generated<T>{
    protected readonly sourceFile: SourceFile;
    protected readonly imports: Imports = new Imports();
    abstract generate(): void;

    constructor(protected context: ApplicationContext, protected model?: T) {
        const path: string = PathResolver[this.getKind()] ? PathResolver[this.getKind()](this as any) : `./default.${this.getKind()}.ts`
        this.sourceFile = context.getProject().createSourceFile(path, '', {
            overwrite: true
        });
    }

    getSourceFile(): SourceFile{
        return  this.sourceFile;
    };

    resolveImports(){
        this.imports.resolveImports(this.sourceFile);
    }

    getContext(){
        return this.context;
    }

    getKind(): string {
        return this.constructor.name.toLowerCase();
    }

    getGenData(){
        return this.model;
    }
    abstract getName(): string;

    abstract equals(model: T): boolean;
}