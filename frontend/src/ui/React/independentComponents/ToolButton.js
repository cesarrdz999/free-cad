

/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";

export default class ToolButton extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        if (e) {e.preventDefault()}
    };

    render() {
        return (
            <button onMouseDown={this.handleClick} {...this.props}>{this.props.children}</button>
        );
    }
}
