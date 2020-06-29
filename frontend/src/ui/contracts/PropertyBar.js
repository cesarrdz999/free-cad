/*
 * Created by Panasenco Yurii on 2020.
 * Copyright (c) 2020 Micro Logic Corp.
 *
 */

const fieldRules = JSON.parse(Helper.Request.httpGet('/resources/data/PropertySettings.json'));

/**
 * The interface for communicate with the property bar.
 * @abstract
 */
export default class ProgressBar{ //todo: need to make as an interface and create class for implementation it
    constructor(){

    }

    /**
     * @param elements
     * @return {string}
     * @private
     */
    getLineType(elements) {
        let lineType = elements[0].lineType.name;
        for (let i = 1; i < elements.length; i++) {
            if (lineType != elements[i].lineType.name) {
                lineType = "";
                break;
            }
        }
        return lineType;
    }

    /**
     * @param fields
     * @param elements
     * @return {{startAngle: string, textSize: string, threadRadius: string, lineLength: string, insideAngle: string, fontName: string, metric: string, lineType: string, lineAngle: string, bendAngle: string, width: string, Z: string, text: string, typeOfComment: string, radius: string, height: string}}
     * @private
     */
    calculateFieldValues(fields, elements) {
        let lineType = "";
        let metric = "";
        let threadRadius = "";
        let bendAngle = "";
        let typeOfComment = "";
        let lineLength = "";
        let lineAngle = "";
        let radius = "";
        let insideAngle = "";
        let startAngle = "";
        let textSize = "";
        let height = "";
        let width = "";
        let text = "";
        let Z = "";
        let fontName= "";

        if (elements.length == 0) {
            return {lineType, metric, threadRadius, bendAngle, typeOfComment, lineLength, lineAngle, radius, startAngle,
                insideAngle,textSize, height, width, text, Z, fontName};
        }

        for (let field of fields) {
            switch (field) {
                case "type":
                    lineType = this.getLineType(elements);
                    break;
                case "metric":
                    metric = elements[0]._lineType.processing[0].type;
                    for(let i=1; i<elements.length; i++){
                        if(metric !=elements[i]._lineType.processing[0].type){
                            metric="";
                            break;
                        }
                    }
                    break;
                case "threadRadius":
                    threadRadius = elements[0]._lineType.processing[0].id;
                    for(let i=1; i<elements.length; i++){
                        if(threadRadius !=elements[i]._lineType.processing[0].id){
                            threadRadius="";
                            break;
                        }
                    }
                    break;
                case "bendAngle":
                    bendAngle = elements[0]._lineType.processing[0].angle;
                    break;
                case "typeOfComment":
                    typeOfComment = elements[0]._lineType.type;
                    for(let i=1; i<elements.length; i++){
                        if(typeOfComment !=elements[i]._lineType.type){
                            typeOfComment="";
                            break;
                        }
                    }
                    break;
                case "lineLength":
                    lineLength = elements[0].length();
                    break;
                case "lineAngle":
                    lineAngle = elements[0].angle;
                    break;
                case "radius":
                    radius = elements[0].radius;
                    for(let i=1; i<elements.length; i++){
                        if(radius !=elements[i].radius){
                            radius="";
                            break;
                        }
                    }
                    break;
                case "insideAngle":
                    insideAngle=elements[0].incrementAngle.toFixed(2);
                    break;
                case "startAngle":
                    startAngle=elements[0].startAngle.toFixed(2);
                    break;
                case "textSize":
                    textSize = elements[0].fontSize;
                    for(let i=1; i<elements.length; i++){
                        if(textSize !=elements[i].fontSize){
                            textSize="";
                            break;
                        }
                    }
                    break;
                case "height":
                    let ext = app.currentDocument.getExtrenum(elements);
                    width = (ext.max.x- ext.min.x).toFixed(3);
                    height = (ext.max.y- ext.min.y).toFixed(3);
                    break;
                case "text":
                    text=elements[0].text;
                    break;
                case "Z":
                    Z = elements[0].height;
                    for(let i=1; i<elements.length; i++){
                        if(Z !=elements[i].height){
                            Z="";
                            break;
                        }
                    }
                    break;
                case "font":
                    fontName = elements[0].font.name;
                    break;
            }

        }


        return {lineType, metric, threadRadius, bendAngle, typeOfComment, lineLength, lineAngle, radius, startAngle,
            insideAngle, textSize, height, width, text, Z, fontName};
    }

    recalculateFields(elements) {

        function type(element) {
            let res = element.typeName;
            if (res == "Arc" && Helper.Math.equals(element.incrementAngle, 360)) {
                res = "Circle";
            }
            return res;
        }

        let fields = [];
        if (elements.length > 0) {
            let elementType = type(elements[0]);
            let lineType = this.getLineType(elements);
            let countElements = elements.length;

            for (let i = 1; i < elements.length; i++) {
                let elType = type(elements[i]);
                if (elType != elementType) {
                    elementType = "Multiple";
                }
            }

            if (/Comment.*/g.test(lineType)) {
                lineType = "Comment";
            } else if (lineType == "") {
                lineType = "Multiple";
            }

            let rules = fieldRules.rules.filter(r => r.element == elementType && r.lineType == lineType);
            if (rules.length > 1) {
                rules = rules.filter(r => r.countElements == (countElements == 1 ? "1" : "*"));
            }


            if (rules[0].template) {
                fields = fieldRules.templates[rules[0].template];
            } else {
                fields = rules[0].properties
            }
        }

        let fieldValues = this.calculateFieldValues(fields, elements);

        setTimeout(()=>{
            store.dispatch({type: "PROP_BAR_UPDATE_FIELDS", fields, fieldValues});
        },0);

    }

}
