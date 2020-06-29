/**
 * Copyright (c) 2020 Micro Logic Corp.
 */
import DataHandler from "../DataHandler";
import ShapeBuilder from "../../analyzer/ShapeBuilder";
import GraphicElement from "../GraphicElement";

export default class ExtrudeElements extends DataHandler{

    /**
     * @inheritDoc
     * @param {Document} document
     * @return {boolean} - true if the document was changed
     */
    handle(doc)
    {
        let shapeBuilder = new ShapeBuilder(doc);
        let shapes = shapeBuilder.buildShapes(false).map(shape => {
            return {shape: shape, out: true}
        });
        for (let i = 0; i < shapes.length; i++) {
            for (let j = 0; j < shapes.length; j++) {
                if (i != j && shapes[i].shape.isContain(shapes[j].shape)) {
                    shapes[j].out = false;
                }
            }
        }
        for (let shape of shapes) {
            let shapeHeight = GraphicElement.AirInside;
            if (shape.out) {
                shapeHeight = container.resolve('config').defaultZValue;
            }

            for (let el of shape.shape.elements) {
                el.height = shapeHeight;
            }
        }

        return true;
    }
}
