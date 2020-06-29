/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";

import {connect} from "react-redux";
import DesignTemplateModalContent from "../DesignTemplateModalContent";
import FrontPanel from "../design-creator/size/FrontPanel";
import SimpleProps from "../../../../../shape-library/SimpleProps";
import BlankDesign from "../design-creator/blank/BlankDesign";
import DesignListForShapeLibrary from "./DesignListForShapeLibrary";

class ShapeLibrary extends React.Component {
    constructor(props){
        super(props);
        this.contentRef = React.createRef();
    }

    getDesignSettingsUIByShapeCreator() {
        if (!this.props.shapeCreator) {
            return (<BlankDesign/>);
        }

        switch (this.props.shapeCreator.typeName) {
            case "SimpleProps":
                return (<FrontPanel props={this.props.propsValue} shapeCreator={this.props.shapeCreator}
                                    changeProp={this.props.changePropValue} resetProps={this.props.resetPropValues}/>);
            default:
                return (<BlankDesign/>);
        }
    }

    scrollBottom = () => {
        this.contentRef.current.scrollTop = this.contentRef.current.scrollHeight
    }


    render() {
        return (
            <DesignTemplateModalContent
                contentRef={this.contentRef}
                designList={<DesignListForShapeLibrary scrollBottom = {this.scrollBottom} changeShapeCreator={this.props.changeShapeCreator}/>}
                designSettings={this.getDesignSettingsUIByShapeCreator()}
            />
        );
    };
}

const mapStateToProps = state => {
    return {
        shapeCreator: state.shapeLibraryReducer.shapeCreator,
        propsValue: state.shapeLibraryReducer.propsValue,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeShapeCreator: creator => {
            dispatch({type: "CHANGE_SHAPE_CREATOR_SHAPE_LIBRARY", shapeCreator: creator});
        },
        changePropValue: (name, value) => {
            dispatch({type: "CHANGE_PROP_OF_SHAPE_CREATOR_SHAPE_LIBRARY", propName: name, propValue: value});
        },
        resetPropValues: () => {
            dispatch({type: "RESET_PROP_VALUES_OF_SHAPE_CREATOR_SHAPE_LIBRARY"});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeLibrary);
