/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

const initialState = {
    openModal: false,
    okCallback:null,
    cancelCallback:null,
    quantity:container.resolve('config').quantity,
    quantityInput:container.resolve('config').quantity,
};

container.resolve('config').addHandler('change', (fieldName) => {
    if (fieldName == 'quantity') {
        setTimeout(() => {
            store.dispatch({type: "CLOSE_QUANTITY_MODAL"});
        }, 0);
    }
});


export default function quantityWindowReducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN_QUANTITY_MODAL":
            return {
                ...state,
                openModal: true,
                okCallback: action.okCallback,
                cancelCallback: action.cancelCallback
            };
        case "OK_QUANTITY_MODAL":
            container.resolve('config').quantity = state.quantityInput;
            return {...state, openModal: false, quantity: state.quantityInput};
        case "CHANGE_QUANTITY":
            return {...state, quantityInput: action.quantity.replace(/[^0-9]/g, '')};
        case "CLOSE_QUANTITY_MODAL":
            let quantityConfig = container.resolve('config').quantity;
            return {...initialState, quantity: quantityConfig, quantityInput: quantityConfig };
        default:
            return state;
    }
}