/**
 * Created by dev on 11.03.19.
 * Copyright (c) 2019 Micro Logic Corp.
 */

import Behavior from '../Behavior';
import Document from '../../model/Document';
import Arc from '../../model/elements/Arc';
import Text from "../../model/elements/Text";

export default class ResizeTextQuestion extends Behavior{

    /**
     * The method is main method of behavior. It's execute the operation
     * @param {ResizeElementsCommand} command - the parameter need for edition the command state
     * @return {Promise} - the promise in resolve send result of execution behavior {true|false}
     */
    execute(command){
        return new Promise((resolve, reject)=>{
            if(this.isHasAnText(command) && command._isCentralControlPoint()){
                container.resolve('confirmChangeArcToSplinesDialog').modalOpenConfirmation(
                    ()=>{
                        command.convertTextToElements = true;
                        resolve(true);
                    },()=>{
                        command.convertTextToElements = false;
                        resolve(false);
                    }
                );
            }else{
                command.convertTextToElements = false;
                resolve(true);
            }
        });
    }

    /**
     * @param {ResizeElementsCommand} command
     * @return {boolean}
     * @private
     */
    isHasAnText(command){
        let elements = Document.toSimpleListElements(command.elements);
        for(let el of elements) {
            if (el instanceof Text) {
                return true;
            }
        }
        return false;
    }
}