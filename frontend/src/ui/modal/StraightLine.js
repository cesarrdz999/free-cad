
export default class StraightLine{

    constructor(okCallback, cancelCallback){
        this.okCallback=okCallback;
        this.cancelCallback=cancelCallback;
    }

    show(){
        store.dispatch({
            type:'OPEN_STRAIGHT_LINE_MODAL',
            okCallback:this.okCallback,
            cancelCallback:this.cancelCallback,
            payload:true
        });
    }


    get data(){
        return {showAgain:store.getState().straightLineWindowReducer.showAgain};
    }

}