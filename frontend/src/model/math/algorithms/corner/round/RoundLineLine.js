import LineLine from "../LineLine";
import Arc from "../../../../elements/Arc";

export default class RoundLineLine extends LineLine{

    constructor(radius){
        super();

        this.radius=radius;
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
            return null;
        }
        let baseVector = new (container.resolve('math')).Vector(1);

        let parallel = line1._line.getParallels(this.radius);
        parallel.push(...line2._line.getParallels(this.radius));

        let center = null;
        m: for(let i=0; i<parallel.length; i++){
            for(let j=i+1; j<parallel.length; j++){
                let temp = parallel[i].getCrossPoint(parallel[j]);
                if(temp){
                    center = temp;
                    break m;
                }
            }
        }

        let points = [
            line1._line.perpendicularPoint(center),
            line2._line.perpendicularPoint(center)
        ];

        let v1 = new (container.resolve('math')).Line(center, points[0]).toVector();
        let v2 = new (container.resolve('math')).Line(center, points[1]).toVector();

        let angle = v1.getAngle(v2);
        let newArc = new Arc(center, this.radius);
        if(angle<180){
            newArc.startAngle = baseVector.getAngle(v1);
            newArc.endAngle = baseVector.getAngle(v2);
        }else{
            newArc.startAngle = baseVector.getAngle(v2);
            newArc.endAngle = baseVector.getAngle(v1);
        }

        if(intersectPoint.compare(line1.p1)){
            line1.p1=points[0].copy();
        }else{
            line1.p2=points[0].copy();
        }

        if(intersectPoint.compare(line2.p1)){
            line2.p1=points[1].copy();
        }else{
            line2.p2=points[1].copy();
        }

        newArc.height=line1.height;
        return {sourceElements:[line1, line2], newElements:[newArc]};
    }
}