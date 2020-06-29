/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "./designTemplateModalContent.scss";
import DialogContent from "@material-ui/core/DialogContent";
import "./designTemplateModalContent.scss";

export default function DesignTemplateModalContent(props) {
  return (
    <DialogContent  ref ={props.contentRef}  className="content">
      {props.title && <p> {props.title} </p>}
      <div className="centerSection">
        <div className="designList">{props.designList}</div>
        <div className="designSettings">{props.designSettings}</div>
      </div>
    </DialogContent>
  );
}
 