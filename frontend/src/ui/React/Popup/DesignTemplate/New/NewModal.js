/**
 * Copyright (c) 2019 Micro Logic Corp.
 */
// import "../dropdown-menu.scss";
import React from "react";
import New from './New.js';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";


class NewFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desktop: container.resolve('mobileDetector').mobile() == null
        };
    }

    openHelp(){
        window.open('https://www.emachineshop.com/part-template-design-wizards/')
    }

    render() {
        return (<Dialog
            maxWidth='md'
            fullWidth={true}
            open={this.props.open}
            onClose={this.props.close}
            onBackdropClick={this.props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                style={{ color: "black", textAlign: "left" }}
                id="alert-dialog-title"
            >
                <img
                    width="25px"
                    src="resources/images/icon.png"
                />
                <span>New Design</span>
            </DialogTitle>

            <New/>


            <DialogActions>
                <Button
                    onClick={this.props.create}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000"
                    }}
                    color="primary"
                >
                    OK
                </Button>
                <Button
                    onClick={this.props.close}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000"
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={this.openHelp}
                    style={{
                        backgroundColor: "#dddada",
                        boxShadow: "2px 2px 1px #000"
                    }}
                    color="primary"
                >
                    Help
                </Button>
            </DialogActions>
        </Dialog>);
    }
}
const mapStateToProps = state => {
    return {
        open: state.newFileReducer.openModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        close: ()=>{
            dispatch({type: "CLOSE_NEW_FILE_MODAL"});
        },
        updateConfirmSaveDesign: openConfirmSaveDesign => {
            dispatch({
                type: "OPEN_CONFIRM_SAVE_DESIGN",
                payload: openConfirmSaveDesign
            });
        },
        create:()=>{
            dispatch({type:"CREATE_FILE_NEW_MODAL"});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFileModal);