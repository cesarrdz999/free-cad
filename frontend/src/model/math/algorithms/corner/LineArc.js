import Corner from "./Corner";

/**
 * @abstract
 */
export default class LineArc extends Corner{

    /**
     * @param {LineElement} line
     * @param {Arc} arc
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(line, arc) {
        return super.corner(line, arc);
    }
}