

export default class ShapeCreator {

    constructor(name, describe){

        /** @type {string} */
        this.name=name;

        /** @type {string} */
        this.describe=describe;

        /** @type {string} */
        this.typeName="Default";

        this.isLoad = false;
    }

    /**
     * @return {Array.<string, value>}
     */
    getPropsList(){
        throw new Exception(`The method doesn't have implementation.`);
    }

    /**
     *
     * @param {string} name
     * @param {*} value
     * @return {boolean}
     */
    setProp(name, value){
        throw new Exception(`The method doesn't have implementation.`);
    }

    getDocument(){
        throw new Exception(`The method doesn't have implementation.`);
    }
}