/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";


export default class DropFileOpen extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.dragAndDropFileOpenInit();
    }

    dragAndDropFileOpenInit() {
        //prevent default behavior for drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        document.addEventListener('drop', this.handleFileDrop);
    }

    handleFileDrop(e) {
        let files = e.dataTransfer.files;
        let filesAmount = files.length;

        if (filesAmount) {
            app.open(files[filesAmount - 1]);
        }
    };

    render() {
        return null;
    }
}