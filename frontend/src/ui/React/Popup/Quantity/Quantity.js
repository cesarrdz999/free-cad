/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "../Simplify/simlify.scss";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";

class Quantity extends React.Component {

    changeQuantity(e){
        let value = e.target.value;
        this.props.changeQuantity(value);
    }

    render() {
        return (
            <Dialog
                onBackdropClick={this.props.close}
                maxWidth={false}
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                id='file-name-modal'
            >
                <DialogTitle id="alert-dialog-title">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Parts quantity:</span>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="Content">
                        <div className="Text">
                            <input type="text"
                                   value={this.props.quantity}
                                onChange={this.changeQuantity.bind(this)}
                            />
                        </div>
                    </div>

                    <div className="Yes-No-buttons">
                        <Button
                            onClick={this.props.ok}
                            style={{
                                backgroundColor: "#dddada",
                                boxShadow: "2px 2px 1px #000",
                                margin: "0 auto",
                                marginRight: "5px"
                            }}
                            color="primary"
                        >
                            Ок
                        </Button>
                        <Button
                            onClick={this.props.close}
                            style={{
                                backgroundColor: "#dddada",
                                boxShadow: "2px 2px 1px #000",
                                margin: "0 auto"
                            }}
                            color="primary"
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        open: state.quantityWindowReducer.openModal,
        quantity: state.quantityWindowReducer.quantityInput,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ok: () => {
            dispatch({ type: "OK_QUANTITY_MODAL" });
        },
        changeQuantity: quantity =>{
            dispatch({ type: "CHANGE_QUANTITY", quantity: quantity });
        },
        close: () => {
            dispatch({ type: "CLOSE_QUANTITY_MODAL"});
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Quantity);
