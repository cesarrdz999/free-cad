import Corner from "./Corner";

export default class CornerFactory extends Corner{


    /**
     * @param {GraphicElement} element1
     * @param {GraphicElement} element2
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(element1, element2){
        if(element1.typeName=="Line" && element2.typeName=="Line") {
            return this.getLineLine().corner(element1, element2);
        } else if (element1.typeName=="Line" && element2.typeName=="Arc"){
            return this.getLineArc().corner(element1, element2);
        } else if (element1.typeName=="Arc" && element2.typeName=="Line"){
            return this.getLineArc().corner(element2, element1);
        } else if (element1.typeName=="Arc" && element2.typeName=="Arc"){
            return this.getArcArc().corner(element1, element2);
        } else{
            throw new Exception("The corner factory doesn't support those element types.", [this, element1, element2]);
        }
        return null;
    }


    /**
     * @return {LineLine}
     * @abstract
     */
    getLineLine(){}

    /**
     * @return {LineArc}
     * @abstract
     */
    getLineArc(){}

    /**
     * @return {ArcArc}
     * @abstract
     */
    getArcArc(){}

}