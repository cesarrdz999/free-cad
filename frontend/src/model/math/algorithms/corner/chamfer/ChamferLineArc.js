import Arc from "../../../../elements/Arc";
import LineArc from "../LineArc";
import LineElement from "../../../../elements/LineElement";

export default class ChamferLineArc extends LineArc {

    constructor(distance) {
        super();

        this.distance = distance;
    }

    /**
     * @param {LineElement} line
     * @param {Arc} arc
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(line, arc) {
        if (arc.incrementAngle == 360) {
            return null;
        }
        let commonPoints = this._getCommonPoints(line, arc);

        if (commonPoints.length == 0) {
            return null;
        }
        let res = [];

        for (let commonPoint of commonPoints) {
            let el = this._getNewElementByCommonPoint(commonPoint, line, arc);
            if (el) {
                res.push(el);
            }
        }

        if (res.length == 0) {
            return null;
        }

        return {sourceElements: [line, arc], newElements: res};
    }

    /**
     * @param {Point} commonPoint
     * @param {LineElement} line
     * @param {Arc} arc
     * @return {LineElement}
     * @private
     */
    _getNewElementByCommonPoint(commonPoint, line, arc) {

        let angle1 = (this.distance * 180) / (Math.PI * arc.radius);

        if (angle1 >= arc.incrementAngle) {
            return null;
        }

        let p1 = null;
        let p2 = null;

        if (arc.getPointOffset(0).isNear(commonPoint, 1E-3)) {
            arc.startAngle += angle1;
            p1 = arc.getPointOffset(0);
        } else {
            arc.endAngle -= angle1;
            p1 = arc.getPointOffset(1);
        }

        if (line.p1.isNear(commonPoint, 1E-4)) {
            let tempLine = new LineElement(line.p2, line.p1);
            tempLine._line.setLength(line.length() - this.distance);
            p2 = tempLine.p2.copy();
        } else {
            line._line.setLength(line.length() - this.distance);
            p2 = line.p2.copy();
        }

        return new LineElement(p1, p2);

    }

    /**
     * @param {LineElement} line
     * @param {Arc} arc
     * @return {Array.<Point>}
     * @private
     */
    _getCommonPoints(line, arc) {
        let commonPoints = [];
        if (arc.getPointOffset(0).isNear(line.p1, 1E-4)) {
            commonPoints.push(line.p1);
        }

        if (arc.getPointOffset(1).isNear(line.p2, 1E-4)) {
            commonPoints.push(line.p2);
        }

        if (arc.getPointOffset(0).isNear(line.p2, 1E-4)) {
            commonPoints.push(line.p2);
        }

        if (arc.getPointOffset(1).isNear(line.p1, 1E-4)) {
            commonPoints.push(line.p1);
        }

        return commonPoints;
    }
}