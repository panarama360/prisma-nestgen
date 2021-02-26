/**
 * Created by Ivan on 25.02.2021
 */
import {EntityDefinition} from "../definitions/entity.definition";
import {Named} from "../definitions/named";

export abstract class AppNode<Def = any>{
    public nodes: Map<Object, AppNode> = new Map<Object, AppNode>()
    constructor(public parent: AppNode, public definition: Def) {
    }
    visitNodes(callback: (appNode: AppNode) => any){
        const res = callback(this);
        this.nodes.forEach(value => value.visitNodes(callback))
        // if(!res && this.parent) this.parent.nodes.delete(this.definition);
    }
}