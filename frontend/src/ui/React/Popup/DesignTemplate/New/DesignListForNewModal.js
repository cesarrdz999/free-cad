

/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import DesignList from "../DesignList";
import BlankShapeCreator from "../../../../../shape-library/BlankShapeCreator";
import Document from "../../../../../model/Document";
import Arc from "../../../../../model/elements/Arc";
import {Point} from "../../../../../model/Model";
import SimpleProps from "../../../../../shape-library/SimpleProps";

export default class DesignListForNewModal extends DesignList {
    constructor(props) {
        super(props);

        let doc = new Document();
        doc.addElement(new Arc(new Point(), 4));
        doc.addElement(new Arc(new Point(5,5), 2));
        this.shapeCreator = new SimpleProps("Circle", "Is it simple circle", doc);
    }

    render() {
        return (
            <ul>
                <li onClick={()=>this.changeShapeCreator(new BlankShapeCreator())}><img src="" alt=""/>Blank design</li>
                <li onClick={()=>this.changeShapeCreator(this.shapeCreator)}><img src="" alt=""/>Front Panel/Name Plate/Sign</li>
            </ul>
        );
    };
}

