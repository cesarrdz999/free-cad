/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";

export default class DesignList extends React.Component {
    constructor(props) {
        super(props)
    }

    /**
     * @param {ShapeCreator} creator
     */
    changeShapeCreator(creator){
        this.props.changeShapeCreator(creator);
    }
}

