/**
 * Created by Ivan on 15.03.2021
 */
import {ClassDeclaration, MethodDeclaration, PropertyDeclaration} from "ts-morph";
import {DMMF} from "@prisma/client/runtime";
import {Generated} from "../core/generated";

export interface DefaultOptions<T = any, G = any>{
    meta: T;
    generated: Generated<G>
}

export interface HandlerOptionsModel<T> extends DefaultOptions<T>{
    kind: 'entity' | 'resolver' | 'where' | 'data' | 'input' | 'output';
    declaration: ClassDeclaration;
    model: DMMF.Model;
}

export interface HandlerOptionsField<T> extends DefaultOptions<T>{
    declaration: ClassDeclaration;
    model: DMMF.Model;
    field: DMMF.Field;
}

export type HandlerOptions<T> = HandlerOptionsModel<T> | HandlerOptionsField<T>;