import LineLine from "../LineLine";
import LineElement from "../../../../elements/LineElement";

export default class ChamferLineLine extends LineLine{

    constructor(distance){
        super();

        this.distance=distance;
    }

    /**
     * @param {LineElement|GraphicElement} line1
     * @param {LineElement|GraphicElement} line2
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(line1, line2) {
        let intersectPoint  = line1._line.getCrossPoint(line2._line);
        if(!intersectPoint || !(intersectPoint.compare(line1.p1) || intersectPoint.compare(line1.p2)
            || intersectPoint.compare(line2.p1) || intersectPoint.compare(line2.p2))){
            return false;
        }

        let points = [];
        if(line1.p2.compare(intersectPoint)){
            line1._line.setLength(line1.length()-this.distance);
            points.push(line1.p2.copy());
        }else{
            let temp = new (container.resolve('math')).Line(line1.p2.copy(), line1.p1.copy());
            temp.setLength(line1.length()-this.distance);
            line1.p1=temp._p2;
            points.push(line1.p1.copy());
        }

        if(line2.p2.compare(intersectPoint)){
            line2._line.setLength(line2.length()-this.distance);
            points.push(line2.p2.copy());
        }else{
            let temp = new (container.resolve('math')).Line(line2.p2.copy(), line2.p1.copy());
            temp.setLength(line2.length()-this.distance);
            line2.p1=temp._p2;
            points.push(line2.p1.copy());
        }

        let newElement = new LineElement(points[0], points[1]);
        return {sourceElements:[line1, line2], newElements:[newElement]};
    }
}