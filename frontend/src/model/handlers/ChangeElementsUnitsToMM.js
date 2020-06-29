/**
 * Copyright (c) 2020 Micro Logic Corp.
 */

import DataHandler from "../DataHandler";
import ResizeElementsCommand from "../../command/ResizeElementsCommand";

export default class ChangeElementsUnitsToMM extends DataHandler{
    /**
     * @inheritDoc
     * @param {Document} document
     * @return {boolean} - true if the document was changed
     */
    handle(document){
        let elements = document._elements;
        let extrenum = app.currentDocument.getExtrenum(elements);

        let oldWidth = extrenum.max.x - extrenum.min.x;
        let oldHeight = extrenum.max.y - extrenum.min.y;
        let width = oldWidth*25.4;
        let height = oldHeight*25.4;

        if (width > 1000 || height > 1000) {
            return false;
        }

        let vector = new (container.resolve('math')).Vector(width-oldWidth, height-oldHeight);
        let command = new ResizeElementsCommand(app.currentDocument, elements, vector,
            ResizeElementsCommand.CONTROL_POINT_X.right, ResizeElementsCommand.CONTROL_POINT_Y.top, true);
        command.executeCommand();

        return true;
    }
}
