import Corner from "./Corner";

/**
 * @abstract
 */
export default class ArcArc extends Corner{

    /**
     * @param {Arc} arc1
     * @param {Arc} arc2
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(arc1, arc2) {
        return super.corner(arc1, arc2);
    }
}