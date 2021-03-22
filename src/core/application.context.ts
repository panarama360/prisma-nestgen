/**
 * Created by Ivan on 12.03.2021
 */
import {Generated} from "./generated";
import {Project} from "ts-morph";
import {DMMF} from "prisma/prisma-client/runtime";
import {PrismaService} from "../nest/generated/prisma.service";
import {Entity} from "../nest/generated/entity";
import {Resolver} from "../nest/generated/resolver";
import {Enum} from "../nest/generated/enum";

export interface Handlers {
    model: Record<string, Function[]>;
    field: Record<string, Function[]>;
    enum: Record<string, Function[]>;
}

export class ApplicationContext {
    public generated: Generated<any>[] = [];
    private project: Project = new Project();
    private prismaService: PrismaService;

    constructor(private readonly document: DMMF.Document) {

    }

    getProject() {
        return this.project;
    }

    getDMMFDocument() {
        return this.document;
    }

    getModelNames() {
        return this.document.datamodel.models.map(value => value.name);
    }

    getEnumNames() {
        return this.document.datamodel.enums.map(value => value.name);
    }

    generate(handlers: Handlers) {
        this.document.datamodel.enums.forEach(value => {
            this.get(Enum, value.name);
        })
        this.document.datamodel.models.forEach(value => {
            this.get(Entity, value.name);
            this.get(Resolver, value.name);
        })
    }

    getByModel(constructor: new (...args: any) => Generated<any>, model: any) {
        return this.generated.find(value => value instanceof constructor && value.equals(model));
    }

    get<T>(constructor: new (app: ApplicationContext, model: T) => Generated<T>, model: T) {
        const gen = this.getByModel(constructor, model);
        if (gen) return gen;
        const ent = new constructor(this, model);
        this.generated.push(ent);
        ent.generate();
        return ent;
    }

    getPrismaService() {
        if (!this.prismaService) {
            this.prismaService = new PrismaService(this, {})
            this.prismaService.generate();
        }
        return this.prismaService;
    }
}