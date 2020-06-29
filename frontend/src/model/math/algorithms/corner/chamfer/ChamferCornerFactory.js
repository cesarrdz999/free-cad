import CornerFactory from "./../CornerFactory";
import ChamferLineLine from "./ChamferLineLine";
import ChamferLineArc from "./ChamferLineArc";
import ChamferArcArc from "./ChamferArcArc";

export default class ChamferCornerFactory extends CornerFactory{

    constructor(distance) {
        super();

        this.distance=distance;
    }

    getLineArc() {
        return new ChamferLineArc(this.distance);
    }

    getLineLine() {
        return new ChamferLineLine(this.distance);
    }

    getArcArc() {
        return new ChamferArcArc(this.distance);
    }
}