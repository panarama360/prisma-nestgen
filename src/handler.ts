import {DMMF} from "@prisma/generator-helper/dist/dmmf";
import {resolve} from "path";

/**
 * Created by Ivan on 10.03.2021
 */
export interface Options {
    dmmf: DMMF.Document,
    handler: string,
}

function getMethods(obj) {
    return Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
}

export function handler(options: Options) {
        const module = require(resolve(process.cwd() + '/' + options.handler));
        for (const ex in module) {
            if (module[ex] instanceof Function) {
                const handler = new module[ex](options)
                options.dmmf.datamodel.models.forEach(value => {
                    if (!value.documentation) return;
                    const docs = value.documentation.split('\n');
                    docs.forEach(meta => {
                        getMethods(handler.constructor.prototype).forEach(method => {
                            const match = meta.match(new RegExp(`@${handler.constructor.name}\.${method}\\((.*?)\\)`));
                            if (match) {
                                const args = eval(`([${match[1]}])`)
                                handler[method](value, args)
                            }
                        })
                    })
                })
                if(handler['handle'] && typeof handler['handle'] == 'function')
                    handler['handle']();
            }
        }
}