import Group from "../../../model/elements/Group";

/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

const initialState = {
  openModal: false,
  addToCurrentDesign: true,
  shapeCreator: null,
  listOfShapes: []
};

export default function shapeLibraryReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_SHAPE_LIBRARY_MODAL":
      return {
        ...initialState,
        openModal: true
      };
    case "CHANGE_ADD_TO_CURRENT_DESIGN":
      return {
        ...state,
        addToCurrentDesign: action.current
      }
    case "CLOSE_SHAPE_LIBRARY":
      return {
        ...initialState
      };
    case "CHANGE_SHAPE_CREATOR_SHAPE_LIBRARY":
      return {
        ...state,
        shapeCreator: action.shapeCreator,
        propsValue: action.shapeCreator.getPropsList()
      };
    case "CHANGE_PROP_OF_SHAPE_CREATOR_SHAPE_LIBRARY":
      state.shapeCreator.setProp(action.propName, action.propValue);
      return {
        ...state,
        propsValue: state.shapeCreator.getPropsList()
      };
    case "RESET_PROP_VALUES_OF_SHAPE_CREATOR_SHAPE_LIBRARY":
      state.shapeCreator.resetProps();
      return {
        ...state,
        propsValue: state.shapeCreator.getPropsList()
      };
    case "OPEN_SHAPE_LIBRARY":
      setTimeout(() => {
        if (state.addToCurrentDesign) {
          let doc = state.shapeCreator.getDocument();
          let group = new Group();
          for (let el of doc._elements) {
            group.addElement(el);
          }
          if(app.currentDocument._elements.length>0) {
            let extremum = app.currentDocument.getExtremum();
            group.move(extremum.maxX + 15, extremum.minY);
          }
          app.addElement(group).then(() => {
            app.board.zoomToFitScreen();
          });
        } else {
          // app.openDocument(doc);
          app.openUrl(state.shapeCreator.getUrl());
        }
      }, 0);
      return {
        ...initialState
      };
    default:
      return state;
  }
}
