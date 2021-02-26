/**
 * Created by Ivan on 25.02.2021
 */
import {Named} from "./named";
import {FieldDefinition} from "./field.definition";

export interface EntityDefinition extends Named{
    fields: FieldDefinition[]
}