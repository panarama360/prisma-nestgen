/**
 * Created by Ivan on 26.02.2021
 */

import {PrismaGenerator} from "../prisma/prisma.generator";
import {ApplicationDefinition} from "../core/definitions/application.definition";
import {DefaultValues, TypeFieldObject, TypeFieldScalar} from "../core/definitions/field.definition";
import {Application} from "../core/nodes/application";

describe('prisma generator', () => {
    let appDef: ApplicationDefinition;
    appDef = {
        name: 'Application',
        entities: [
            {
                name: 'user',
                fields: [
                    {
                        type: TypeFieldScalar.Int,
                        name: 'id',
                        isId: true,
                        default: DefaultValues.AUTOINCREMENT
                    }
                ]
            },
            {
                name: 'organisation',
                fields: [
                    {
                        type: TypeFieldScalar.Int,
                        name: 'id',
                        isId: true,
                        default: DefaultValues.AUTOINCREMENT
                    },
                    {
                        type: TypeFieldObject.Enum,
                        name: 'id',
                        enum: 'TestEnum'
                    }
                ]
            }
        ],
        enums: [
            {
                name: 'TestEnum',
                values: [
                    'hello'
                ]
            }
        ]
    }
    const app = new Application(appDef);
    test('generate', async () => {
        console.log(await new PrismaGenerator(app).printPrisma());
    })
})