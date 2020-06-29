
export default class Quantity{
    show(){
        store.dispatch({
            type:'OPEN_QUANTITY_MODAL'
        });
    }


    get data(){
        return {quantity:store.getState().quantityWindowReducer.quantity};
    }

}