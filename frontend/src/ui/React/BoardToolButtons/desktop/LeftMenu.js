/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "./left-menu.scss";
import {connect} from "react-redux";
import ToolButton from "../../independentComponents/ToolButton";

class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        let magnit = container.resolve('config').magnificationMode;
        this.state = {
            magnit
        };
    }

    handleClickSnapToLines = () => {
        let newValue = !this.state.magnit;
        this.setState({magnit:newValue});
        app.magnificationMode = newValue;
    };


    openHelp() {
        window.open("https://www.emachineshop.com/help/");
    }


    render() {
        return (
            <div className="LeftMenu">
                <ToolButton tabIndex={-1} className={this.props.tool == "Pointer" ? "active" : ""}>
                    <img
                        onClick={() => this.props.setTool("Pointer")}
                        width="25px"
                        src="resources/images/Select.png"
                        data-tip={container.resolve("tips").getTip('select-tool')} data-html={true}
                    />
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "Line" ? "active" : ""}
                    onClick={() => this.props.setTool("Line")}
                    tabIndex={-1}
                    data-tip={container.resolve("tips").getTip('line-tool')} data-html={true}
                >
                    <i className="sprite sprite-LineTool"></i>
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "Rectangle" ? "active" : ""}
                    onClick={() => {
                        this.props.setTool("Rectangle");
                    }}
                    tabIndex={-1}
                    data-tip={container.resolve("tips").getTip('rect-tool')} data-html={true}
                >
                    <i className="sprite sprite-RectTool"></i>
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "Circle" ? "active" : ""}
                    onClick={() => {
                        this.props.setTool("Circle");
                    }}
                    tabIndex={-1}
                    data-tip={container.resolve("tips").getTip('circle-tool')} data-html={true}
                >
                    <i className="sprite sprite-CircleTool"></i>
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "Eraser" ? "active" : ""}
                    onClick={() => this.props.setTool("Eraser")} tabIndex={-1}
                >
                    <img
                        width="25px"
                        src="resources/images/Eraser.png"
                        data-tip={container.resolve("tips").getTip('eraser-tool')} data-html={true}
                    />
                </ToolButton>
                <ToolButton onClick={() => app.corner()} tabIndex={-1}
                        data-tip={container.resolve("tips").getTip('corner-tool')} data-html={true}>
                    <i className="sprite sprite-CornerTool"></i>
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "Text" ? "active" : ""}
                    onClick={() => this.props.setTool("Text")}
                    tabIndex={-1}
                >
                    <img
                        width="25px"
                        src="resources/images/Text.png"
                        data-tip={container.resolve("tips").getTip('text-tool')} data-html={true}
                    />
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "EditLine" ? "active" : ""}
                    onClick={() => this.props.setTool("EditLine")}
                    tabIndex={-1}
                    data-tip={container.resolve("tips").getTip('line-edit-tool')}
                    data-html={true}
                >
                    <i className="sprite sprite-EditLineTool"></i>
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "Ruler" ? "active" : ""}
                    onClick={() => this.props.setTool("Ruler")} tabIndex={-1}>
                    <img
                        width="25px"
                        src="resources/images/Ruler.png"
                        data-tip={container.resolve("tips").getTip('ruler-tool')} data-html={true}
                    />
                </ToolButton>
                <ToolButton
                    onClick={this.handleClickSnapToLines}
                    style={{
                        backgroundColor: (this.state.magnit?"#40404066":"#f0f0f0d9")
                    }}
                    tabIndex={-1}
                >
                    <img
                        width="25px"
                        src="resources/images/SnapToLines.png"
                        data-tip={container.resolve("tips").getTip('snap-tool')} data-html={true}
                    />
                </ToolButton>
                <ToolButton
                    className={this.props.tool == "TracingPaper" ? "active" : ""}
                    onClick={() => this.props.setTool("TracingPaper")}
                    tabIndex={-1}
                    data-tip={container.resolve("tips").getTip('tracing-paper')}
                    data-html={true}
                >
                    <img
                        width="25px"
                        src="resources/images/TracingPaper.png"
                        data-tip={container.resolve("tips").getTip('tracing-paper')} data-html={true}
                    />
                </ToolButton>
                <ToolButton onClick={this.openHelp.bind(this)} tabIndex={-1}
                        data-tip={container.resolve("tips").getTip('help-tool')} data-html={true}>
                    <i className="sprite sprite-Question"></i>
                </ToolButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tool: state.borderToolPanelReducer.tool,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTool: name => {
            dispatch({type: "SET_BORDER_TOOL", toolName: name});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
