/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import Rule from './../Rule';
import Bend from "../../model/line_types/Bend";
import ShapeBuilder from "../ShapeBuilder";

export default class NotEndAtEdgesBend extends Rule{
    constructor(document){
        super(document);
        this.errorMessage = "Error: Bend line ends do not end at edges. Please correct the design.";
    }


    /**
     * @return {boolean} - true if the document has an error
     */
    check(){
        return this.getBendsInNoShapes(this.document).length > 0;
    }

    /**
     * @return {Array.<Solution>}
     */
    createSolutions(){
        let res = super.createSolutions();

        let bends = this.getBendsInNoShapes(res[0].document);

        for(let el of bends){
            el._renderer.error=true;
        }

        return res;
    }

    /**
     *
     * @param {Document} doc
     * @return {Array.<LineElement>}
     * @private
     */
    getBendsInNoShapes(doc) {
        let bendsInNoShapes = [];

        let shapeBuilder = new ShapeBuilder(doc);

        let shapes = shapeBuilder.buildShapes(false);

        /** @type {Array.<Shape>} */
        let shapesWithBends = shapes.filter(s=>s.bends.length>0);

        /** @type {Array.<LineElement>} - because bend can be only by line*/
        let allBends = doc.getListSimpleElements().filter(el=>el.lineType instanceof Bend);

        for (let bend of allBends) {
            let bendInShape = false;

            for (let shape of shapesWithBends) {
                let searchRes = shape.bends.find(searchBend => searchBend.id == bend.id);

                if (searchRes) {
                    bendInShape = true;
                }
            }

            if (!bendInShape) {
                bendsInNoShapes.push(bend);
            }
        }

        return bendsInNoShapes;
    }

}
