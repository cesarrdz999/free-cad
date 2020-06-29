/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "./new.scss";


import {connect} from "react-redux";
import DesignTemplateModalContent from "../DesignTemplateModalContent";
import FrontPanel from "../design-creator/size/FrontPanel";
import SimpleProps from "../../../../../shape-library/SimpleProps";
import DesignListForNewModal from "./DesignListForNewModal";
import BlankDisign from "../design-creator/blank/BlankDesign";

class New extends React.Component {

    getDesignSettingsUIByShapeCreator() {
        if (!this.props.shapeCreator) {
            return (<BlankDisign/>);
        }

        switch (this.props.shapeCreator.typeName) {
            case "SimpleProps":
                return (<FrontPanel props={this.props.propsValue} shapeCreator={this.props.shapeCreator}
                                    changeProp={this.props.changePropValue}/>);
            default:
                return (<BlankDisign/>);
        }
    }

    render() {
        return (
            <DesignTemplateModalContent
                title="To create your own design select 'Blank Design'. Or select one of the listed wizards and enter the desired parameters."
                designList={<DesignListForNewModal changeShapeCreator={this.props.changeShapeCreator}/>}
                designSettings={this.getDesignSettingsUIByShapeCreator()}
            />
        );
    };
}

const mapStateToProps = state => {
    return {
        shapeCreator: state.newFileReducer.shapeCreator,
        propsValue: state.newFileReducer.propsValue,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeShapeCreator: creator => {
            dispatch({type: "CHANGE_SHAPE_CREATOR_FILE_NEW_MODAL", shapeCreator: creator});
        },
        changePropValue: (name, value) => {
            dispatch({type: "CHANGE_PROP_OF_SHAPE_CREATOR_FILE_NEW_MODAL", propName: name, propValue: value});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
