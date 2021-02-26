/**
 * Created by Ivan on 25.02.2021
 */
import {Named} from "./named";
import {EntityDefinition} from "./entity.definition";
import {EnumDefinition} from "./enum.definition";

export interface ApplicationDefinition extends Named{
    entities: EntityDefinition[];
    enums?: EnumDefinition[];
}