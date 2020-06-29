import Arc from "../../../../elements/Arc";
import LineElement from "../../../../elements/LineElement";
import ArcArc from "../ArcArc";

export default class ChamferArcArc extends ArcArc{

    constructor(distance){
        super();

        this.distance=distance;
    }

    /**
     * @param {Arc} arc1
     * @param {Arc} arc2
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(arc1, arc2) {
        if(arc1.incrementAngle==360 || arc2.incrementAngle==360 || arc1.center.isNear(arc2.center, 1e-4)){
            return null;
        }
        let commonPoints = this._getCommonPoints(arc1, arc2);

        if(commonPoints.length==0){
            return null;
        }

        let res = [];
        for(let commonPoint of commonPoints){
            let el = this._getNewElementByCommonPoint(commonPoint, arc1, arc2);
            if(el) {
                res.push(el);
            }
        }

        if(res.length==0){
            return null;
        }

        return {sourceElements:[arc1, arc2], newElements:res};
    }

    /**
     * @param {Point} commonPoint
     * @param {Arc} arc1
     * @param {Arc} arc2
     * @return {LineElement}
     * @private
     */
    _getNewElementByCommonPoint(commonPoint, arc1, arc2){
        let distance = this.distance/2;

        let angle1 = (distance*180)/(Math.PI*arc1.radius);
        let angle2 = (distance*180)/(Math.PI*arc2.radius);

        if(angle1>=arc1.incrementAngle || angle2>=arc2.incrementAngle){
            return null;
        }

        let p1 = null;
        let p2 = null;

        if(arc1.getPointOffset(0).isNear(commonPoint, 1E-3)){
            arc1.startAngle+=angle1;
            p1=arc1.getPointOffset(0);
        }else{
            arc1.endAngle-=angle1;
            p1=arc1.getPointOffset(1);
        }

        if(arc2.getPointOffset(0).isNear(commonPoint, 1E-3)){
            arc2.startAngle+=angle2;
            p2=arc2.getPointOffset(0);
        }else{
            arc2.endAngle-=angle2;
            p2=arc2.getPointOffset(1);
        }

        return new LineElement(p1, p2);

    }

    /**
     * @param arc1
     * @param arc2
     * @return {Array.<Point>}
     * @private
     */
    _getCommonPoints(arc1, arc2){
        let commonPoints = [];
        if(arc1.getPointOffset(0).isNear(arc2.getPointOffset(0), 1E-4)){
            commonPoints.push(arc1.getPointOffset(0));
        }

        if(arc1.getPointOffset(1).isNear(arc2.getPointOffset(1), 1E-4)){
            commonPoints.push(arc1.getPointOffset(1));
        }

        if(arc1.getPointOffset(0).isNear(arc2.getPointOffset(1), 1E-4)){
            commonPoints.push(arc1.getPointOffset(0));
        }

        if(arc1.getPointOffset(1).isNear(arc2.getPointOffset(0), 1E-4)){
            commonPoints.push(arc1.getPointOffset(1));
        }

        return commonPoints;
    }
}