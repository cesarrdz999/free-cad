import Arc from "../../../../elements/Arc";
import LineArc from "../LineArc";
import LineElement from "../../../../elements/LineElement";
import LineArcIntersector from '../../intersects/LineArc';

export default class RoundLineArc extends LineArc{

    constructor(radius){
        super();

        this.radius=radius;
    }

    /**
     * @param {LineElement} line
     * @param {Arc} arc
     * @return {null|{sourceElements:Array.<GraphicElement>, newElements:Array.<GraphicElement>}}
     */
    corner(line, arc) {
        let lineArcIntersector = new LineArcIntersector();

        let intersectPoint  = lineArcIntersector.getIntersectPoints(line, arc);
        if(!intersectPoint || intersectPoint.length!=1 || !(intersectPoint[0].compare(line.p1) || intersectPoint[0].compare(line.p2))){
            console.log(intersectPoint);
            return null;
        }else{
            intersectPoint = intersectPoint[0];
        }

        let sourceLine = line.copy();

        let parallels = line._line.getParallels(this.radius);
        let arcs = [arc.copy(), arc.copy()];
        arcs[0].radius+=this.radius;
        arcs[1].radius-=this.radius;

        let center = [];

        for(let parallel of parallels){
            for(let a of arcs) {
                center.push(...lineArcIntersector.getIntersectPoints(new LineElement(parallel._p1, parallel._p2), a));
            }
        }
        console.log(center, "center ");

        if(center.length==1){
            center=center[0];
        }else if(center.length==2) {
            return null;
        }else{
            return null;
        }
        let p1 = line._line.perpendicularPoint(center);

        let tempLine = new LineElement(arc.center, center.copy());
        tempLine._line.setLength(arc.radius+this.radius*2);
        let p2 = lineArcIntersector.getIntersectPoints(tempLine, arc)[0];

        if(intersectPoint.compare(line.p1)){
            line.p1=p1.copy();
        }else{
            line.p2=p1.copy();
        }

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


        let mainArcVector = new (container.resolve("math").Line)(arc.center, p2).toVector();

        let oldStart = arc.startAngle;

        arc.startAngle=baseVector.getAngle(mainArcVector);
        if(lineArcIntersector.getIntersectPoints(sourceLine, arc).length==1){
            arc.startAngle=oldStart;
            arc.endAngle=baseVector.getAngle(mainArcVector);
        }

        newElement.height=arc.height;
        return {sourceElements:[line, arc], newElements:[newElement]};
    }
}