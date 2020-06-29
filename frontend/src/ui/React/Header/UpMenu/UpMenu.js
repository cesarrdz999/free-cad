/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "./up-menu.scss";
import Material from "./RightButtons/Material";
import SelectFinish from "./RightButtons/SelectFinish";
import Quantity from "./RightButtons/Quantity";

import { connect } from "react-redux";
import {withRouter}from 'react-router-dom';

import Group from "../../../../model/elements/Group";
import ToolButton from "../../independentComponents/ToolButton";


class UpMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            group:false,
            ungroup:false,
            desktop:container.resolve('mobileDetector').mobile()==null
        }
    }

    componentDidMount(){

        let updateGroupStateButtons = ()=>{
            let group = false;
            let ungroup = false;
            if(app.selectElements.length>1){
                group=true;
            }
            for(let el of app.selectElements){
                if(el.typeName=="Group" || (el.typeName=="Text" && (el.lineType.name=="Auto" || el.lineType.name=="Engrave"))){
                    ungroup=true;
                    break;
                }
            }
            this.setState({
                group:group,
                ungroup:ungroup
            });
        };

        app.addHandler('selectElements', updateGroupStateButtons);
        app.addHandler('updateSelectElements', updateGroupStateButtons);
        app.addHandler('clearSelectElements',()=>{
            this.setState({
                group:false,
                ungroup:false
            })
        })
    }

    get groupImgPath(){
        let path = "resources/images/";
        if(this.state.group){
            path+='group_active.jpg';
        }else{
            path+='Group.png';
        }
        return path;
    }

    get ungroupImgPath(){
        let path = "resources/images/";
        if(this.state.ungroup){
            path+='ungroup_active.jpg';
        }else{
            path+='Ungroup.png';
        }
        return path;
    }

    render() {
        return (
            <div className="UpMenu" style={this.props.style}>
                <div className="Buttons">
                    <div className="LeftButtonGroup">
                        <div className="btn-group-two">
                            <ToolButton onClick={() => this.state.group && app.group()}
                                    tabIndex={-1} data-tip={container.resolve("tips").getTip('group')} data-html={true}>
                                <img width="25px" src={this.groupImgPath} />
                            </ToolButton>
                            <ToolButton onClick={() => this.state.ungroup && app.ungroup()} tabIndex={-1} data-tip={container.resolve("tips").getTip('ungroup')} data-html={true}>
                                <img width="25px" src={this.ungroupImgPath} />
                            </ToolButton>
                        </div>
                        <div className="btn-group-three">
                            <ToolButton onClick={() => app.board.zoomToFitScreen()} tabIndex={-1} data-tip={container.resolve("tips").getTip('fitScreen')} data-html={true}>
                                <img width="25px" src="resources/images/ZoomToFitScreen.png" />
                            </ToolButton>
                            <ToolButton onClick={() => app.appZoomToActualSize()} tabIndex={-1} data-tip={container.resolve("tips").getTip('actualSize')} data-html={true}>
                                <img width="25px" src="resources/images/ZoomToActualSize.png" />
                            </ToolButton>
                            {this.state.desktop && <ToolButton onClick={() => app.setTool("Zoom")} tabIndex={-1} data-tip={container.resolve("tips").getTip('zoomTool')} data-html={true} data-place="bottom">
                                <img width="25px" src="resources/images/Zoom.png" />
                            </ToolButton>}
                        </div>
                        <div className="btn-group-other">
                            <ToolButton onClick={() => app.deleteSelected()} tabIndex={-1} data-tip={container.resolve("tips").getTip('delete')} data-html={true}>
                                <i className="sprite sprite-Cancel"></i>
                            </ToolButton>
                            <ToolButton tabIndex={-1} onClick={()=>this.props.openPreferenceModal(!this.props.openPreferencesModal)} data-tip={container.resolve("tips").getTip('preferences')} data-html={true}>
                                <img width="24px" src="resources/images/Preferences.png" />
                            </ToolButton>
                            <ToolButton onClick={() => {this.props.updateDimension(this.props.dimension === "Millimeters"?"Inches":"Millimeters");}} tabIndex={-1} data-tip={container.resolve("tips").getTip('toggle')} data-html={true}>
                                <img width="24px" src="resources/images/ToggleInch.png" />
                            </ToolButton>
                            <ToolButton onClick={() => app.intersectSelectedElements()} tabIndex={-1} data-tip={container.resolve("tips").getTip('intersect')} data-html={true}>
                                <i className="sprite sprite-Intersect"></i>
                            </ToolButton>
                            <ToolButton onClick={() => container.resolve('3dView').show3D()} tabIndex={-1} data-tip={container.resolve("tips").getTip('3D')} data-html={true}>
                                <i className="sprite sprite-3dPreview"></i>
                            </ToolButton>
                            <ToolButton onClick={() => container.resolve('app').priceAnalyze()} tabIndex={-1} data-tip={container.resolve("tips").getTip('price-analyze')} data-html={true}>
                                <i className="sprite sprite-Ok"></i>
                            </ToolButton>
                        </div>
                    </div>
                    {this.state.desktop && <div className="RightButtons { this.state.desktop }">
                        <Material />
                        <SelectFinish />
                        <Quantity />
                    </div>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
  return {
    dimension: state.preferencesReducer.popup.dimension,
    openPreferencesModal: state.preferencesReducer.popup.open
  };
};

const mapDispatchToProps = dispatch => {
    return {
        updateDimension: value => {
            dispatch({type: "UPDATE_DIMENSION", dimension: value, apply: true});
        },
        openPreferenceModal: () => {
            dispatch({type: "OPEN_PREFERENCE_POPUP"});
        }
    };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UpMenu));
