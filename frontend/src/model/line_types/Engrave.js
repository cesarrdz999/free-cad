import LineType from './LineType';

export default class Engrave extends LineType{
    constructor(){
        super();
        this.label="Engrave";
        this.name="Engrave";
        this.id=53;

        this.helpURL="https://www.emachineshop.com/help-line-types/#engrave";
    }

    /**
     * @inheritDoc
     * @return {CommentToSelf}
     */
    copy(){
        let res = new Engrave();
        res.type=this.type;
        return res;
    }

    /**
     * @inheritDoc
     * @return {Array.<{propName: value}>}
     */
    getLineStyle(){
        let res = super.getLineStyle();
        res['strokeStyle']='#ff16ff';
        res['fillStyle']='#ff16ff';
        return res;
    }
}
