import Arc from "../../../../elements/Arc";
import LineElement from "../../../../elements/LineElement";
import LineArcIntersector from '../../intersects/LineArc';
import ArcArcIntersector from '../../intersects/ArcArc';
import ArcArc from "../ArcArc";

export default class RoundArcArc extends ArcArc{

    constructor(radius){
        super();

        this.radius=radius;
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


        let roundedPoints = this._getRoundedPoints(arc1, arc2);

        if(roundedPoints.length==0){
            return null;
        }

        let parallels = [
            arc1.copy(),
            arc1.copy(),
            arc2.copy(),
            arc2.copy(),
        ];

        parallels[0].radius+=this.radius;
        parallels[1].radius-=this.radius;
        parallels[2].radius+=this.radius;
        parallels[3].radius-=this.radius;

        let centers = [];

        let arcArcIntersector = new ArcArcIntersector();
        for(let i=0; i<parallels.length; i++){
            if(parallels[i].radius<0){
                continue;
            }
            parallels[i].generateNewId();
            for(let j=i+1; j<parallels.length; j++){
                centers.push(...arcArcIntersector.getIntersectPoints(parallels[i], parallels[j]));
            }
        }

        let res = [];
        for(let center of centers){
            let el = this._getNewElementByCenter(center, arc1, arc2);
            if(el) {
                res.push(el);
            }
        }

        return {sourceElements:[arc1, arc2], newElements:res};
    }

    _getNewElementByCenter(center, arc1, arc2){
        let lineArcIntersector = new LineArcIntersector();
        let templine = new LineElement(arc1.center.copy(), center.copy());
        templine._line.setLength(templine.length()+this.radius*2);
        let p1 = lineArcIntersector.getIntersectPoints(templine, arc1)[0];

        let templine2 = new LineElement(arc2.center.copy(), center.copy());
        templine2._line.setLength(templine2.length()+this.radius*2);

        let p2 = lineArcIntersector.getIntersectPoints(templine2, arc2)[0];

        let newElement = this._createNewElement(center, p1, p2);
        this._correctAngleByNewElement(arc1, newElement);
        this._correctAngleByNewElement(arc2, newElement);
        return newElement;

    }

    _createNewElement(center, p1, p2){
        let newElement = new Arc(center.copy(), this.radius);
        let baseVector = new (container.resolve("math").Vector)(1);

        let v1 = new (container.resolve("math").Line)(center, p1).toVector();
        let v2 = new (container.resolve("math").Line)(center, p2).toVector();

        if(v1.getAngle(v2)<180){
            newElement.startAngle=baseVector.getAngle(v1);
            newElement.endAngle=baseVector.getAngle(v2);
        }else{
            newElement.startAngle=baseVector.getAngle(v2);
            newElement.endAngle=baseVector.getAngle(v1);
        }
        return newElement;
    }


    /**
     * @param {Arc} arc
     * @param {Arc} newArc
     * @private
     */
    _correctAngleByNewElement(arc, newArc){
        let oldStart = arc.getPointOffset(0);
        let oldEnd = arc.getPointOffset(1);
        let baseVector = new (container.resolve("math").Vector)(1);
        let vectorToNewPoint =  this._getVectorToNewPoint(arc, newArc);

        let newAngle = baseVector.getAngle(vectorToNewPoint);

        if(newArc.center.distanceTo(oldStart)<newArc.center.distanceTo(oldEnd)){
            arc.startAngle=newAngle;
        }else{
            arc.endAngle=newAngle;
        }

    }

    /**
     * @param {Arc} arc
     * @param {Arc} newArc
     * @private
     */
    _getVectorToNewPoint(arc, newArc){
        let newStart = newArc.getPointOffset(0);
        if(arc.isBelongsToTheElement(newStart, 1E-3)){
            console.log("isBeling");
            let toNewStartPoint =  new (container.resolve("math").Line)(arc.center, newStart);
            return toNewStartPoint.toVector();
        }else{
            let newEnd = newArc.getPointOffset(1);
            let toNewEndPoint = new (container.resolve("math").Line)(arc.center, newEnd);
            return toNewEndPoint.toVector()
        }
    }

    /**
     * @param arc1
     * @param arc2
     * @return {Array.<Point>}
     * @private
     */
    _getRoundedPoints(arc1, arc2){
        let roundedPoints = [];
        if(arc1.getPointOffset(0).isNear(arc2.getPointOffset(0), 1E-4)){
            roundedPoints.push(arc1.getPointOffset(0));
        }

        if(arc1.getPointOffset(1).isNear(arc2.getPointOffset(1), 1E-4)){
            roundedPoints.push(arc1.getPointOffset(1));
        }

        if(arc1.getPointOffset(0).isNear(arc2.getPointOffset(1), 1E-4)){
            roundedPoints.push(arc1.getPointOffset(0));
        }

        if(arc1.getPointOffset(1).isNear(arc2.getPointOffset(0), 1E-4)){
            roundedPoints.push(arc1.getPointOffset(1));
        }

        return roundedPoints;
    }
}