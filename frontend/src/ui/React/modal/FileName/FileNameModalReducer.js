/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

const initialState = {
    open: false,
    okCallback:()=>{},
    cancelCallback:()=>{}
};

export default function confirmationReducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN_FILE_NAME_MODAL":
            if (action.open) return { open: action.open, okCallback:action.okCallback,  cancelCallback:action.cancelCallback};
            return {...initialState};
        default:
            return state;
    }
}