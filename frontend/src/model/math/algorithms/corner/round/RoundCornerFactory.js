import CornerFactory from "./../CornerFactory";
import RoundLineLine from "./RoundLineLine";
import RoundLineArc from "./RoundLineArc";
import RoundArcArc from "./RoundArcArc";

export default class RoundCornerFactory extends CornerFactory{

    constructor(radius) {
        super();

        this.radius=radius;
    }

    getLineArc() {
        return new RoundLineArc(this.radius);
    }

    getLineLine() {
        return new RoundLineLine(this.radius);
    }

    getArcArc() {
        return new RoundArcArc(this.radius);
    }
}