
export default class Corner{

    /**
     * @param {GraphicElement} element1
     * @param {GraphicElement} element2
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     * @abstract
     */
    corner(element1, element2){
        throw new Exception("the corner function doesn't have implementation", [this.constructor ,this]);
    }
}