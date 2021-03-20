/**
 * Created by Ivan on 10.03.2021
 */
import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import {DMMF} from "@prisma/generator-helper/dist/dmmf";
import {resolve} from "path";
import {ApplicationContext, Handlers} from "./core/application.context";
import {Generated} from "./core/generated";
import {HandlerOptionsModel} from "./handlers/handler.options";
import {HandlerParser} from "./handler.parser";
generatorHandler({
    onManifest: () => ({
        defaultOutput: "node_modules/@generated/type-graphql",
        prettyName: "TypeGraphQL integration",
        requiresGenerators: ["prisma-client-js"],
    }),
    onGenerate: generate,
});

export async function generate(options: GeneratorOptions) {
    handler({
        dmmf: options.dmmf,
        handler: options.generator.config.handler as any
    });
}

export interface Options {
    dmmf: DMMF.Document,
    handler: string,
}


// function getMatch(constructor: Function, doc: string){
//     const docs = doc.split('\n');
//     docs.forEach(meta => {
//         getMethods(constructor.prototype).forEach(method => {
//             const match = meta.match(new RegExp(`@${constructor.name}\.${method}\\((.*?)\\)`));
//             if (match) {
//                 // const meta = eval(`([${match[1]}])`)
//                 // handler[method](value, meta)
//             }
//         })
//     })
// }

export function handler(options: Options) {
    const module = require(resolve(process.cwd() + '/' + options.handler));
    if(!module.getHandlers) throw new Error('Method getHandlers not found!');
    const constructors = module.getHandlers();
    const app = new ApplicationContext(options.dmmf);
    const gen = new HandlerParser(app, constructors);
    gen.parse()
    app.generate({} as any);
    // const app = new ApplicationContext(options.dmmf);
    // for (const constructor of constructors) {
    //     if (constructor instanceof Function) {
    //         const handler = new constructor(app)
    //         options.dmmf.datamodel.models.forEach(value => {
    //             if (value.documentation) {
    //                 const docs = value.documentation.split('\n');
    //                 docs.forEach(meta => {
    //                     getMethods(constructor.prototype).forEach(method => {
    //                         const match = meta.match(new RegExp(`@${constructor.name}\.${method}\\((.*?)\\)`));
    //                         if (match) {
    //                             const meta = eval(`([${match[1]}])`)
    //                             // handlers.model[value.name] = handlers.model[value.name] || []
    //                             // handlers.model[value.name].push((gen: Generated<any>) => handler[method](({} as HandlerOptionsModel)))
    //                         }
    //                     })
    //                 })
    //             }
    //
    //
    //         })
    //     }
    // }
}