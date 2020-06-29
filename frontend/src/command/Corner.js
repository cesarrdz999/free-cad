/**
 * Copyright (c) 2019 Micro Logic Corp.
 */
import ElementModificationCommand from './ElementModificationCommand';

import LineElement from '../model/elements/LineElement';
import CornerDataValidator from "./behaviors/CornerDataValidator";
import Document from './../model/Document';
import Arc from "../model/elements/Arc";
import CornerDialog from "./behaviors/CornerDialog";
import CommentToSelf from '../model/line_types/CommentToSelf'
import Line from '../model/math/Line'
import Group from '../model/elements/Group';
import RoundLineLine from "../model/math/algorithms/corner/round/RoundLineLine";
import ChamferLineLine from "../model/math/algorithms/corner/chamfer/ChamferLineLine";
import RoundCornerFactory from "../model/math/algorithms/corner/round/RoundCornerFactory";
import ChamferCornerFactory from "../model/math/algorithms/corner/chamfer/ChamferCornerFactory";

let Trigonometric = container.resolve('math').Trigonometric;

export default class Corner extends ElementModificationCommand{

    static TYPE_ROUND = "round";
    static TYPE_CHAMFER = "chamfer";

    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     */
    constructor(document, elements){
        super(document, elements);

        this.groupElements = elements.length == 1;
        this.elements = Document.toSimpleListElements(elements).filter(e=>e.typeName=="Line" || e.typeName=="Arc");

        this.name= 'Corner';

        this.type = Corner.TYPE_ROUND;

        this.behaviors.push(new CornerDataValidator(this));
        this.behaviors.push(new CornerDialog(this));

        this.newElements = [];

        /** @type {number} - the radius fo corner. Millimeters */
        this.radius = 5;
    }


    addNewElement(element){
        for(let el of this.newElements){
            if(el.compare(element)){
                return;
            }
        }
        this.newElements.push(element);
    }

    /**
     * The method need for operation witch replacing or adding any elements.
     * For example command copy, the command creates new element so the method will return true.
     * @return {boolean} - return true if the command replacing or adding any elements
     */
    isReplacedElements(){
        return this.newElements.length>0;
    }

    /**
     * The realisation of the  @see {@link isReplacedElements} method.
     * @return {Array.<GraphicElement>|null} - new elements or null
     * @protected
     */
    getReplaceElements(){
        return this.newElements;
    }


    /**
     * @inheritDoc
     */
    executeCommand(){
        let cornerFactory = null;
        switch (this.type) {
            case Corner.TYPE_ROUND:
                cornerFactory = new RoundCornerFactory(this.radius);
                break;
            case Corner.TYPE_CHAMFER:
                cornerFactory = new ChamferCornerFactory(this.radius);
                break;
            default:
                console.error("Unsupported corner type.");
        }
        
        return this.corner(cornerFactory);
    }

    /**
     * @param {CornerFactory} cornerFactory
     * @return {boolean}
     */
    corner(cornerFactory){

        let res = false;
        for(let i=0; i<this.elements.length-1; i++){
            for(let j=i+1; j<this.elements.length; j++) {
                res |= this.cornerElements(cornerFactory, this.elements[i], this.elements[j]);
            }
            this.document.removeElement(this.elements[i]);
            this.document.addElement(this.elements[i]);
        }

        if(res) {
            if (this.groupElements && this.isReplacedElements()) {
                let group = new Group();
                for (let el of this.newElements) {
                    group.addElement(el);
                    this.document.removeElement(el);
                }
                this.newElements = [group];
                this.document.addElement(group);
            } else {
                this.document.removeElement(this.elements[this.elements.length - 1]);
                this.document.addElement(this.elements[this.elements.length - 1]);
            }
        }
        return res;
    }


    cornerElements(cornerFactory, element1, element2){
        let res = cornerFactory.corner(element1, element2);
        if(!res){
            return false;
        }
        for(let newElement of res.newElements) {
            this.document.addElement(newElement);
            this.addNewElement(newElement);
        }
        for(let el of res.sourceElements) {
            this.addNewElement(el);
        }
        return true;
    }
}