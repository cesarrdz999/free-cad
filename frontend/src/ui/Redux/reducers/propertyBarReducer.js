/**
 * Copyright (c) 2019 Micro Logic Corp.
 */


const initialState = {
    fields: [],
    fieldValues: {
        lineType: ""
    }
};

export default function propertyBarReducer(state = initialState, action) {

    switch (action.type) {
        case "PROP_BAR_UPDATE_FIELDS":
            return {...state, fields: action.fields, fieldValues: action.fieldValues};

        default:
            return state;
    }
}