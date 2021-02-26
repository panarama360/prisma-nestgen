import {AppNode} from "./node";
import {Application} from "./application";
import {EntityDefinition} from "../definitions/entity.definition";
import {TypeFieldObject} from "../definitions/field.definition";
import {EnumDefinition} from "../definitions/enum.definition";

/**
 * Created by Ivan on 26.02.2021
 */

export class Enum extends AppNode<EnumDefinition>{
    constructor(public app: Application, public enumDef: EnumDefinition) {
        super(app, enumDef);
        // app.nodes.set(enumDef, this);
    }

}