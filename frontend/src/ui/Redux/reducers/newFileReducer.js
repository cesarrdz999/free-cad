/**
 * Copyright (c) 2019 Micro Logic Corp.
 */
import Document from "../../../model/Document";

const initialState = {
    openModal: false,
    addToCurrentDesign:true,
    shapeCreator:null,
    propsValue:[]
};

export default function shapeLibraryReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_SHAPE_CREATOR_FILE_NEW_MODAL":
            return {
                ...state,
                shapeCreator:action.shapeCreator,
                propsValue:action.shapeCreator.getPropsList()
            };
        case "CHANGE_PROP_OF_SHAPE_CREATOR_FILE_NEW_MODAL":
            state.shapeCreator.setProp(action.propName, action.propValue);
            return {
                ...state,
                propsValue:state.shapeCreator.getPropsList()
            };
        case "CREATE_FILE_NEW_MODAL":
            if(state.shapeCreator) {
                let doc = state.shapeCreator.getDocument();
                setTimeout(() => {
                    app.openDocument(doc);
                }, 0);
            }else{
                setTimeout(() => {
                    app.openDocument(new Document());
                }, 0);
            }
            return {
                ...initialState
            };
        case "OPEN_NEW_FILE_MODAL":
            return {
                ...state,
                openModal: true
            };
        case "CLOSE_NEW_FILE_MODAL":
            return {
                ...state,
                openModal:false
            };
        default:
            return state;
    }
}