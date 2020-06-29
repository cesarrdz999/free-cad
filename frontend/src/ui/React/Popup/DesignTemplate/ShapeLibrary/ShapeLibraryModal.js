/**
 * Copyright (c) 2019 Micro Logic Corp.
 */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import ShapeLibrary from "./ShapeLibrary";
import "../designTemplateModalContent.scss";

class ShapeLibraryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desktop: container.resolve("mobileDetector").mobile() == null
    };
  }

  openHelp() {
    window.open("https://www.emachineshop.com/part-template-design-wizards/");
  }

  render() {
    return (
      <Dialog
        maxWidth="md"
        fullWidth={false}
        open={this.props.open}
        onClose={this.props.close}
        onBackdropClick={this.props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialogTitle">
          <img width="30px" src="resources/images/icon.png" />
          <h2 className="shapeLibHeading">Shape Library</h2>
        </div>

        <ShapeLibrary />

        <DialogActions className="modalFooter">
          <div style={{ padding: "10px" }}>
            <label>
              <Checkbox
                onChange={() => {
                  this.props.changeAddCurrent(!this.props.current);
                }}
                checked={this.props.current}
                color="primary"
              />
              Add to current design
            </label>
          </div>
          <div className="buttonContainer">
            <Button
              onClick={this.props.openShape}
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
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}
const mapStateToProps = state => {
  return {
    open: state.shapeLibraryReducer.openModal,
    current: state.shapeLibraryReducer.addToCurrentDesign
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch({ type: "CLOSE_SHAPE_LIBRARY" });
    },
    openShape: () => {
      dispatch({ type: "OPEN_SHAPE_LIBRARY" });
    },
    changeAddCurrent: current => {
      dispatch({ type: "CHANGE_ADD_TO_CURRENT_DESIGN", current });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeLibraryModal);
