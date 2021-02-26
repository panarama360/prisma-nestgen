/**
 * Created by Ivan on 25.02.2021
 */

import {ApplicationDefinition} from "../core/definitions/application.definition";
import {DefaultValues, TypeFieldObject, TypeFieldScalar} from "../core/definitions/field.definition";
import {Application} from "../core/nodes/application";

describe('create app context', () => {
    let appDef: ApplicationDefinition;
    test('type application definition', () => {
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
    })


    test('node count', () => {
        const app = new Application(appDef);
        let count = 0
        app.visitNodes(appNode => {
            count++;
        });
        expect(count).toBe(7)
    })
})