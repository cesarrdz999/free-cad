/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "./straightLine.scss";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";

class StraightLine extends React.Component {

    changeShowAgain(e){
        let value = e.target.checked;
        this.props.changeShowAgain(value);
    }

    render() {
        return (
            <Dialog
                onBackdropClick={() => {
                    this.props.openModal(!this.props.open);
                    this.props.cancelCallback();
                }}
                maxWidth={'sm'}
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                id='straight-line-modal'
            >
                <DialogTitle id="alert-dialog-title">
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem" }}>
                        <span>This line is not exactly vertical or horizontal.
                            Consider holding down the Ctrl key while drawing a straight line. Fix line automatically?</span>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="Content">
                        <div className="Text">
                            <input id="showCheckBox"
                                   type="checkbox"
                                   checked={this.props.showAgain}
                                   onChange={this.changeShowAgain.bind(this)} />
                            <label htmlFor="showCheckBox">Show this message again</label>
                        </div>
                    </div>

                    <div className="Yes-No-buttons">
                        <Button
                            onClick={() => {
                                this.props.openModal(!this.props.open);
                                this.props.okCallback(this.props.count);
                            }}
                            style={{
                                backgroundColor: "#dddada",
                                boxShadow: "2px 2px 1px #000",
                                margin: "0 auto",
                                marginRight: "5px"
                            }}
                            color="primary"
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={() => {
                                this.props.openModal(!this.props.open);
                                this.props.cancelCallback();
                            }}
                            style={{
                                backgroundColor: "#dddada",
                                boxShadow: "2px 2px 1px #000",
                                margin: "0 auto"
                            }}
                            color="primary"
                        >
                            No
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        open: state.straightLineWindowReducer.openModal,
        okCallback: state.straightLineWindowReducer.okCallback,
        cancelCallback: state.straightLineWindowReducer.cancelCallback,
        showAgain: state.straightLineWindowReducer.showAgain,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openModal: open => {
            dispatch({ type: "OPEN_STRAIGHT_LINE_MODAL", payload: open });
        },
        changeShowAgain: show => {
            dispatch({ type: "CHANGE_SHOW_AGAIN", showAgain: show });
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(StraightLine);
