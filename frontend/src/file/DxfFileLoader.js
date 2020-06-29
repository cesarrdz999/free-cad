/**
 * Created on 14.12.19.
 * Copyright (c) 2019 Micro Logic Corp.
 */

import FileLoader from './FileLoader';
import ExtrudeElementsHandler from "../model/handlers/ExtrudeElements";
import ChangeElementsUnitsToMMHandler from "../model/handlers/ChangeElementsUnitsToMM";

export default class DxfFileLoader extends FileLoader{
    constructor(){
        super();
        this.fileSuffix = '.dxf';
    }

    /**
     * @param {File} file
     * @return {Promise}
     */
    load(file){
        //todo: check if file isn't .dxf file
        return new Promise((resolve, reject)=>{
            if (!file) {
                reject('File is required parameter!');
            }
            let formData = new FormData();
            formData.append("password", "meazhysz");
            formData.append("design", file, file.name);

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://www.emachineshop.com/task/convert/2emsx/', false);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    let fileloader = container.resolve('fileLoaderFactory', 'xml');
                    fileloader.convertDataToDocument(xhr.response).then(doc=>{
                        doc.fileName = file.name.substring(0, file.name.length-4);
                        new ExtrudeElementsHandler().handle(doc);
                        new ChangeElementsUnitsToMMHandler().handle(doc);
                        resolve(doc);
                    });
                } else {
                    if (this.status == 404) {
                        reject("DXF File cannot be opened");
                    }
                    else {
                        reject('Error. ' + this.status + ' - ' + xhr.statusText);
                    }
                }
            };
            xhr.onerror = function () {
                if (this.status == 404) {
                    reject("DXF File cannot be opened");
                }
                else {
                    reject('Error. ' + this.status + ' - ' + xhr.statusText);
                }
            };
            xhr.send(formData);
        });
    }
}
