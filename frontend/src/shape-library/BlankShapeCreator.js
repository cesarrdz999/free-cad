import ShapeCreator from "./ShapeCreator";
import Document from "../model/Document";

export default class BlankShapeCreator extends ShapeCreator{

    constructor(){
        super("", "");

        /** @type {Document} */
        this.document = new Document();

        this.typeName="Blank";
    }

    getPropsList() {
        return [];
    }


    setProp(name, value) {
        throw new Exception("The shape creator doesn't have "+name+" prop, for set this value "+value, this);
    }

    getDocument() {
        return this.document;
    }
}