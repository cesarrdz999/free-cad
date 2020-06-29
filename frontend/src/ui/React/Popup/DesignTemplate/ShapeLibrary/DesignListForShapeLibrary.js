/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { withStyles } from "@material-ui/core/styles";
import DesignList from "./../DesignList";

const useStyles = {
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
};
import treeData from "./shapeLibraryData.json";
import XmlFileLoader from "../../../../../file/XmlFileLoader";
import SimpleProps from "../../../../../shape-library/SimpleProps";

class DesignListForShapeLibrary extends DesignList {
  constructor(props) {
    super(props);
  }

  /**
   * @param {ShapeCreator} creator
   */
  changeShapeCreator(creator) {
    this.props.changeShapeCreator(creator);
  }

  treeItem(name, url) {
    if (url) {
      let response = Helper.Request.httpGet(
        "/resources/doc/Shape Library/" + url
      );
      new XmlFileLoader().convertDataToDocument(response).then(document => {
        this.changeShapeCreator(new SimpleProps(name, null, document, "/resources/doc/Shape Library/" + url));
      });
    }
  }

  render() {
    return (
      <TreeView
        // className={useStyles.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {treeData.map((data, index) => {
          return (
            <TreeItem
              className="treeItem"
              key={index}
              nodeId={`${data.name}_${index}`}
              label={data.name}
              onClick={() => this.treeItem(data.name, data.url && data.url)}
            >
              {data && data.nested
                ? data.nested.map((nest, i) => {
                    return (
                      <TreeItem
                        key={i}
                        nodeId={`${nest.name}_${i}`}
                        label={nest.name}
                        onClick={() => {
                          this.treeItem(nest.name, nest.url);
                          nest.nested ? null: this.props.scrollBottom();
                                
                        }}
                      >
                        {nest && nest.nested
                          ? nest.nested.map((child, i) => {
                              return (
                                <TreeItem
                                  key={i}
                                  nodeId={`${child.name}_${i}`}
                                  label={child.name}
                                  onClick={() => {
                                    this.treeItem(
                                      child.name,
                                      child.url && child.url
                                    );
                                    this.props.scrollBottom();
                                  }}
                                />
                              );
                            })
                          : null}
                      </TreeItem>
                    );
                  })
                : null}
            </TreeItem>
          );
        })}
      </TreeView>
    );
  }
}
export default withStyles(useStyles)(DesignListForShapeLibrary);
