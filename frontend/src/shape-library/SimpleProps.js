import ShapeCreator from "./ShapeCreator";
import ResizeElementsCommand from "../command/ResizeElementsCommand";

export default class SimpleProps extends ShapeCreator{

    constructor(name, describe, document, url=''){
        super(name, describe);

        /** @type {string} */
        this.name=name;

        /** @type {string} */
        this.describe=describe;

        /** @type {string} */
        this.typeName="SimpleProps";

        /** @type {Document} */
        this.document = document;

        /** @type {string} */
        this.url = url;

        /** @type {JSON} */
        this.default = this.getPropsList();
    }

    getPropsList() {
        let res = [];
        if(this.document._elements.length==0){
            return res;
        }
        let rect = this.document.getExtremum().toRect();
        res['width']= rect.width;
        res['height']= rect.height;
        return res;
    }

    getParamLabel(param) {
        let labels = {
            'width': 'X',
            'height': 'Y'
        };

        return labels[param];
    }

    resetProps() {
        Object.keys(this.default).map((name) => {
            this.setProp(name, this.default[name]);
        });
    }

    setProp(name, value) {
        let extremum = this.document.getExtremum();

        let oldWidth = extremum.max.x- extremum.min.x;
        let oldHeight = extremum.max.y- extremum.min.y;

        let width=oldWidth;
        let height=oldHeight;

        switch (name) {
            case "width":
                height = height * value / width;
                width = value;
                break;
            case "height":
                width = width * value / height;
                height = value;
                break;
            default:
                throw new Exception("The shape creator doesn't have "+name+" prop, for set this value "+value, this);
        }

        /** @type {Vector} */
        let vector =new (container.resolve('math')).Vector(width-oldWidth, height-oldHeight);

        let command = new ResizeElementsCommand(this.document, this.document._elements, vector
            , ResizeElementsCommand.CONTROL_POINT_X.right, ResizeElementsCommand.CONTROL_POINT_Y.top, false);

        command.executeCommand();

    }

    getDocument() {
        return this.document;
    }

    getUrl() {
        return this.url;
    }
}