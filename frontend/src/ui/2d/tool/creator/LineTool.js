/**
 * Created by dev on 09.01.19.
 * Copyright (c) 2019 Micro Logic Corp.
 */

import CreatorToolsInTwoSteps from './CreatorToolsInTwoSteps';
import LineElement from '../../../../model/elements/LineElement';

export default class LineTool extends CreatorToolsInTwoSteps{
    constructor(document){
        super(document);
        
        this.cursor.src = 'resources/images/Line.png';
        this.name="Line";
    }

    /**
     * @return {LineElement}
     */
    get line(){
        return this._element;
    }

    setPosition2(point){
        if(Helper.Key.ctrlKey && !Helper.Key.shiftKey) {
            point = this._discreteBy15Degrees(point);
        }
        this.line.p2=point;
    }

    mouseUp(point, e) {
        let showStraightLineDialog = container.resolve('config').showStraightLineDialog;

        if(showStraightLineDialog && (this._element && this.step === 2)) {
            let isStraight = this._isStraight();

            if (isStraight.result) {
                let modal = container.resolve('straightLineWindow', [()=>{
                    container.resolve('config').showStraightLineDialog = modal.data.showAgain;
                    app.setLineAngleElement(isStraight.changeToAngle);
                }, () => {
                    container.resolve('config').showStraightLineDialog = modal.data.showAgain;
                }]);

                modal.show();
            }
        }
        super.mouseUp(point, e);
    }

    /**
     * @return {object}
     */
    _isStraight() {
        let result = false;

        let angle = this.line.angle;

        let changeToAngle = null;

        [0, 90, 180, 270, 360].some((a) => {
            let max = a + 1;
            let min = a - 1;

            let maxResult = (angle > a && angle < max);
            let minResult = (angle > min && angle < a);

            result = (maxResult && a !== 360) || (minResult && a !== 0);

            changeToAngle = a;

            return result;
        });

        return {
            result,
            changeToAngle
        };
    }

    /**
     * @param {Point} point
     * @return {Point}
     * @private
     */
    _discreteBy15Degrees(point){
        let tempPoint = this._element.p1.copy();
        tempPoint.x += 1;

        /** @type {Line} */
        let baseLine = new (container.resolve('math')).Line(this._element.p1.copy(), tempPoint);

        let tempLine = new LineElement(this._element.p1.copy(), point);
        
        let angle = baseLine.toVector().getAngle(tempLine._line.toVector());

        if(angle%15>7.5){
            tempLine.rotate(tempLine.p1, -(15-(angle%15)));
        }else {
            tempLine.rotate(tempLine.p1, angle % 15);
        }
        
        return tempLine.p2;
    }

    /**
     * @param point
     * @return {LineElement}
     */
    createElement(point){
        let element = new LineElement(point, point);
        element.lineType = this._lineType=container.resolve('lineTypeFactory', [element, true]);
        return element;
    }
}