import Corner from "./Corner";

/**
 * @abstract
 */
export default class LineLine extends Corner{

    /**
     * @param {LineElement} line1
     * @param {LineElement} line2
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(line1, line2) {
        return super.corner(line1, line2);
    }
}