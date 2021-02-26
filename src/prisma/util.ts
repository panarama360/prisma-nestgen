/**
 * Created by Ivan on 17.02.2021
 */
import {ScalarType} from "prisma-schema-dsl";
import {TypeFieldScalar} from "../core/definitions/field.definition";

export const TypeFieldToScalarPrisma = {
    [TypeFieldScalar.String]: ScalarType.String,
    [TypeFieldScalar.Int]: ScalarType.Int,
    [TypeFieldScalar.Float]: ScalarType.Float,
    [TypeFieldScalar.JSON]: ScalarType.Json,
    [TypeFieldScalar.Boolean]: ScalarType.Boolean,
    [TypeFieldScalar.Date]: ScalarType.DateTime,
    [TypeFieldScalar.Date]: ScalarType.DateTime,

}

export const ResolveRelation = {

}