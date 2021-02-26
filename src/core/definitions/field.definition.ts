/**
 * Created by Ivan on 25.02.2021
 */
import {Named} from "./named";

export enum RelationTypes {
    O2O = 'one-to-one',
    O2M = 'one-to-many',
    M2M = 'many-to-many',
}

export enum DefaultValues {
    AUTOINCREMENT = 'autoincrement',
    DBGENERATED = 'dbgenerated',
    CUID = 'cuid',
    UUID = 'uuid',
    NOW = 'now',
}

type TypeField = TypeFieldScalar | TypeFieldObject;

export enum TypeFieldObject {
    Relation = 'Relation',
    Enum = 'Enum',
}

export enum TypeFieldScalar {
    String = 'String',
    Int = 'Int',
    Float = 'Float',
    JSON = 'JSON',
    Boolean = 'Boolean',
    Date = 'Date',
    Default = 'Default',
}

export type RelationFields = FieldRelationO2O
    | FieldRelationO2M
    | FieldRelationM2M;
export type ScalarFields = FieldDefault
    | FieldInt
    | FieldFloat
    | FieldString
    | FieldBoolean
    | FieldJSON
    | FieldDate
export type FieldDefinition = FieldEnum
    | ScalarFields
    | RelationFields

interface StandardField<T = any> extends Named {
    type: TypeField;
    isId?: boolean;
    isRequired?: boolean;
    isUnique?: boolean;
    default?: T;
}


export interface FieldDefault<T = any> extends StandardField<T> {
    type: TypeFieldScalar.Default
    typeName: string;
    isList: boolean;
    relationName?: string | null;
    relationFields?: string[];
    relationReferences?: string[];
}

export interface FieldInt extends StandardField<number | DefaultValues.AUTOINCREMENT> {
    type: TypeFieldScalar.Int
}

export interface FieldFloat extends StandardField<number> {
    type: TypeFieldScalar.Float
}

export interface FieldString extends StandardField<string | DefaultValues.CUID | DefaultValues.UUID | DefaultValues.DBGENERATED> {
    type: TypeFieldScalar.String
}

export interface FieldBoolean extends Omit<StandardField<boolean>, 'isId'> {
    type: TypeFieldScalar.Boolean
}

export interface FieldJSON extends Omit<StandardField, 'isId'> {
    type: TypeFieldScalar.JSON
}

export interface FieldDate extends Omit<StandardField<string | DefaultValues.NOW>, 'isId'> {
    type: TypeFieldScalar.Date
}

export interface FieldEnum extends Omit<StandardField<string>, 'isId' | 'isUnique'> {
    type: TypeFieldObject.Enum
    enum: string
}

interface DefaultFieldRelation {
    nameEntity: string
    relationFieldName?: string
    relationName?: string;
}

export interface FieldRelationO2O extends Named, DefaultFieldRelation {
    type: TypeFieldObject.Relation
    relationType: RelationTypes.O2O
}

export interface FieldRelationO2M extends Named, DefaultFieldRelation {
    type: TypeFieldObject.Relation
    relationType: RelationTypes.O2M
}

export interface FieldRelationM2M extends Named, DefaultFieldRelation {
    type: TypeFieldObject.Relation
    relationType: RelationTypes.M2M
}