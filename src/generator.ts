/**
 * Created by Ivan on 10.03.2021
 */
import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import {handler} from "./handler";
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