/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "./front-panel.scss";
import Button from "@material-ui/core/Button";

import DocumentRedererBoard from "../../../../../2d/DocumentRedererBoard";
import DimensionField from "../../../../independentComponents/DimensionField/DemensionField";

//todo: need generalization for preview
export default class FrontPanel extends React.Component {

    /**
     * @param {{props:[], shapeCreator:ShapeCreator, changeProp:function}} props - props need for updating this component without reducer,
     * changeProp - function(propName, propValue)
     */
    constructor(props) {
        super(props);

        this.board = new DocumentRedererBoard();
        this.preview = React.createRef();

        this.state={
            dimension:this.getDimension(container.resolve('config').dimension),
        }
    }

    getDimension(name){
        if (name === "Millimeters") {
            return {name:'mm', multiplier:1};
        } else {
            return {name:"''", multiplier:25.4};
        }
    }


    componentDidMount() {
        let canvasContainer = this.preview.current;
        canvasContainer.appendChild(this.board.canvas);
        this.board.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        this.board.document=this.props.shapeCreator.getDocument();
        this.board.zoomToFitScreen();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.board.document=nextProps.shapeCreator.getDocument();
        this.board.zoomToFitScreen();
    }

    render() {
        return (<>
                <div className="rightSection">
                    <div className="topHeader">{this.props.shapeCreator.describe?this.props.shapeCreator.describe:this.props.shapeCreator.name}</div>
                    <div className="topbar">
                        <div> Parameters</div>
                        <Button className="resetBtn" color="primary" onClick={() => this.props.resetProps()}>
                            Reset
                        </Button>
                    </div>
                    <div className="tableContainer">
                        <div className="unorderList">
                            <ul className="ulStyle">
                                <li className="leftLi" style={{textAlign: "center"}}> Parameters </li>
                                {Object.keys(this.props.props).map((data, i) => {
                                    return (
                                        <li key={i} className="leftLi">
                                            <span className="leftSpace">{this.props.shapeCreator.getParamLabel(data)}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="unorderList">
                            <ul className="ulStyle">
                                <li className="leftLi rightLi" style={{textAlign: "center"}} >Value</li>
                                {Object.keys(this.props.props).map((data, i) => {
                                    return (
                                        <li key={i} className="leftLi rightLi">
                                            <DimensionField
                                                className="inputText"
                                                dimension={this.state.dimension}
                                                value={this.props.props[data]}
                                                onChange={(value)=>this.props.changeProp(data, value)}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="shapeContainer">
                        <div className="previewHeadline"> Preview</div>
                        <div id="preview" ref={this.preview}></div>
                    </div>
                </div>
            </>
        );
    }
}

