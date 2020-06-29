import Rule from "../Rule";
import ShapeBuilder from "../ShapeBuilder";
import RemoveElementSolution from './../solutions/RemoveElement';
import Engrave from "../../model/line_types/Engrave";
import GraphicElement from "../../model/GraphicElement";

export default class EngraveInShape extends Rule{

    /**
     *
     * @param {Document} document
     */
    constructor(document){
        super(document);

        /** @type {string} */
        this.errorMessage = "ERROR: The highlighted Engrave line(s) must be inside the line that defines the shape of the part.";
    }


    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        let shapes = this.getEngraveOutsideShapeByDocument(this.document);
        return shapes != null;
    }


    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        let res = super.createSolutions();

        res[0].previewDocument = this.document.getSnapshot();
        let redShape = this.getEngraveOutsideShapeByDocument(res[0].previewDocument);
        for(let shapeEl of redShape.elements) {
            shapeEl._renderer.error = true;
        }

        res.push(this._createRemoveSolution());
        return res;
    }


    /**
     * @return {Solution}
     * @private
     */
    _createRemoveSolution(){
        let shape = this.getEngraveOutsideShapeByDocument(this.document);

        let previewDoc = this.document.getSnapshot();
        let shape2 = this.getEngraveOutsideShapeByDocument(previewDoc);
        for(let el of shape2.elements) {
            previewDoc.removeElement(el);
        }

        return new RemoveElementSolution(this.document, shape.elements, previewDoc);
    }


    /**
     * @param {Document} document
     * @return {Shape|null}
     */
    getEngraveOutsideShapeByDocument(document){
        let shapeBuilder = new ShapeBuilder(document);

        let shapes = shapeBuilder.buildShapes(false, true);
        shapes = shapes.filter(sh=>(sh.elements.length > 1)&&(sh.height!=GraphicElement.AirInside));

        let shapeEngraves = shapeBuilder.buildShapes();
        shapeEngraves = shapeEngraves.filter(s=>s.elements.every(l=>l.lineType instanceof Engrave));

        for (let engrave of shapeEngraves) {
            let isOK = false;
            for (let shape of shapes){
                if (shape.isContain(engrave)) {
                    isOK = true;
                    break;
                }
            }
            if (!isOK) {
                return engrave;
            }
        }

        return null;
    }
}
