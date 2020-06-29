/**
 * Copyright (c) 2019 Micro Logic Corp.
 */
import "../dropdown-menu.scss";
import React from "react";
import ConfirmSaveDesignModal from "./ConfirmSaveDesignModal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Document from "../../../../../model/Document";


class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            desktop: container.resolve('mobileDetector').mobile() == null
        };
    }

    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener("click", this.hideDropdownMenu);
        });
    };

    hideDropdownMenu = () => {
        this.setState({displayMenu: false}, () => {
            document.removeEventListener("click", this.hideDropdownMenu);
        });
    };

    toggleDropdownMenu = (event) => {
        event.preventDefault();
        !this.state.displayMenu ? this.setState({displayMenu: true}) : this.setState({displayMenu: false});
    }

    // --------------methods for NewModal Window-------------------------------------
    clickNewModal = event => {
        if(global.debug.newFileWithShapeLibrary){
            this.props.openNewFileModal();
        }else {
            event.preventDefault();
            app.openDocument(new Document());
        }
    };


    closeNewModal = () => {

        this.setState(
            prevState => ({openNewModal: prevState.openNewModal}),
            () => {
                this.setState({openNewModal: !this.state.openNewModal});
            }
        );
    };

    closeNewModalOfConfirm = (value) => {
        this.setState({ openNewModal: value })
     }
// ------------open link button Help----------
    openWindow = ()=> {
        window.open('https://www.emachineshop.com/help-wizards/')
    };

    openFile = e =>{
        Helper.openFile().then((file)=>{
            app.open(file);
        });
    };

    importFile = e =>{
        let newInput = document.createElement('input');
        newInput.setAttribute('type','file');
        newInput.setAttribute('accept','.dxf');

        newInput.onchange = function(){
            //todo: check count files
            app.import(this.files[0]);
            newInput.remove();
        };
        newInput.click();
    };

    render() {
        if (this.state.desktop) {
            return this.desktopView();
        } else {
            return this.mobileView();
        }
    }

    mobileView() {
        return (
            <li className="metismenu-item" onClick={this.toggleDropdownMenu}>
                <a className={this.state.displayMenu ? "metismenu-link active" : "metismenu-link"} href="#">File <span>&#x25BA;</span></a>
                <ul className={this.state.displayMenu ? "metismenu-container visible" : "metismenu-container"}>
                    <li className="metismenu-item" onClick={this.props.openNewFileModal}><a className="metismenu-link close" href="#">New</a></li>
                    <li className="metismenu-item" onClick={this.openFile}><a className="metismenu-link close" href="#">Open</a></li>
                    <li className="metismenu-item" onClick={()=> app.saveAs('xml')}><a className="metismenu-link close" href="#">Download</a></li>
                    <li className="metismenu-item" onClick={()=> app.print()}><a className="metismenu-link close" href="#">Print</a></li>
                    <li className="metismenu-item" onClick={()=>{app.restore()}}><a className="metismenu-link close" href="#">Restore</a></li>
                </ul>
                <ConfirmSaveDesignModal closeNewModalOfConfirm ={this.closeNewModalOfConfirm}/>
            </li>
        )
    }

    desktopView() {
        return (
            <div className="Menu">
                <div className="btn" onClick={this.showDropdownMenu} >
                    File
                    {this.state.displayMenu ? (
                        <ul>
                            <li onClick={this.clickNewModal}>
                                <a href="#">New</a>
                            </li>
                            <li onClick={this.openFile}>
                                <a href="#">Open</a>
                            </li>
                            <li onClick={()=> app.saveAs('xml')}>
                                <a href="#">Download</a>
                            </li>
                            <li onClick={this.importFile}>
                                <a href="#">Import</a>
                            </li>
                            <li onClick={()=> app.print()}>
                                <a href="#">Print</a>
                            </li>
                            <li onClick={()=> app.setTracingPaper()}>
                                <a href="#">Tracing paper</a>
                            </li>
                            <li onClick={()=>{app.restore()}}>
                                <a href="#">
                                    Restore
                                </a>
                            </li>
                            {/*<li>*/}
                                {/*<a href="#">Exit</a>*/}
                            {/*</li>*/}
                        </ul>
                    ) : null}
                </div>
                <ConfirmSaveDesignModal closeNewModalOfConfirm ={this.closeNewModalOfConfirm}/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
      openConfirmSaveDesign: state.confirmSaveDesignReducer.openConfirmSaveDesign
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      updateConfirmSaveDesign: openConfirmSaveDesign => {
        dispatch({
          type: "OPEN_CONFIRM_SAVE_DESIGN",
          payload: openConfirmSaveDesign
        });
      },
      openNewFileModal:()=>{
          dispatch({type: "OPEN_NEW_FILE_MODAL"});
      }
    };
  };

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(File));
