/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

const initialState = {
    openModal: false,
    okCallback:null,
    cancelCallback:null,
    showAgain:container.resolve('config').showStraightLineDialog,
};
  
export default function straightLineWindowReducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN_STRAIGHT_LINE_MODAL":
            if(action.payload) {
                return {
                    ...state,
                    openModal: action.payload,
                    okCallback: action.okCallback,
                    cancelCallback: action.cancelCallback
                };
            }else{
                return {
                    ...state,
                    openModal: action.payload,
                };
            }
        case "CHANGE_SHOW_AGAIN":
            return {...state, showAgain: action.showAgain};
        default:
            return state;
    }
}