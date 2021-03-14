/**
 * Created by Ivan on 13.03.2021
 */

enum PrismaScalars {
    String = "String",
    Boolean = "Boolean",
    Int = "Int",
    Float = "Float",
    DateTime = "DateTime",
    Json = "Json",
    BigInt = "BigInt",
    Decimal = "Decimal",
    Bytes = "Bytes",
}

export function scalarToType(scalar: string){
    switch (scalar) {
        case PrismaScalars.Int:
            return {
                type: "Int",
                moduleImport: "@nestjs/graphql"
            };
        case PrismaScalars.Float: {
            return {
                type: "Float",
                moduleImport: "@nestjs/graphql"
            };
        }
        case PrismaScalars.Json:
            return {
                type: "GraphQLJSONObject",
                moduleImport: "graphql-scalars"
            };
        case PrismaScalars.BigInt: {
            return {
                type: "GraphQLBigInt",
                moduleImport: "graphql-scalars"
            };
        }
        case PrismaScalars.DateTime: {
            return {
                type: "Date",
            };
        }
        default:
            return null
    }
}
export function scalarToTSType(scalar: string) {
    switch (scalar) {
        case PrismaScalars.String: {
            return "string";
        }
        case PrismaScalars.Boolean: {
            return "boolean";
        }
        case PrismaScalars.Int:
        case PrismaScalars.Decimal:
        case PrismaScalars.Float: {
            return "number";
        }
        case PrismaScalars.DateTime: {
            return "Date";
        }
        case PrismaScalars.Json:
            return 'any';
        case PrismaScalars.BigInt: {
            return "bigint";
        }
        case PrismaScalars.Bytes: {
            return "Buffer";
        }
        default:
            throw new Error(`Unrecognized scalar type: ${scalar}`);
    }
}