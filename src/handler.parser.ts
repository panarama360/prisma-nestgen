/**
 * Created by Ivan on 15.03.2021
 */
import {ApplicationContext, Handlers} from "./core/application.context";

export class HandlerParser {
    private handlers: Handlers = {
        enum: {},
        field: {},
        model: {}
    };

    constructor(private readonly context: ApplicationContext, private readonly constructors: any[]) {

    }


    parse() {
        this.constructors.forEach(constructor => {
            const instance = new constructor(this.context);
            this.context.getDMMFDocument().datamodel.models.forEach(model => {
                this.parseDocumentation(model.documentation, constructor);
            })
        })
    }

    getMethods(obj) {
        return Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
    }

    private parseDocumentation(doc: string, constructor: Function) {
        if (!doc) return;

        const docs = doc.split('\n');
        docs.forEach(meta => {
            this.getMethods(constructor.prototype).forEach(method => {
                const match = meta.match(new RegExp(`@${constructor.name}\.${method}\\((.*?)\\)`));
                if (match) {
                    const meta = eval(`([${match[1]}])`)
                    // handlers.model[value.name] = handlers.model[value.name] || []
                    // handlers.model[value.name].push((gen: Generated<any>) => handler[method](({} as HandlerOptionsModel)))
                }
            })
        })
    }

}