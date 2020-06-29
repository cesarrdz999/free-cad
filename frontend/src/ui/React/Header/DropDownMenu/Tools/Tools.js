/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from "react";
import "../dropdown-menu.scss";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const useStyles = {
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400
    }
};

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            desktop: container.resolve("mobileDetector").mobile() == null
        };
    }

    showDropdownMenu = event => {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener("click", this.hideDropdownMenu);
        });
    };

    hideDropdownMenu = () => {
        this.setState({displayMenu: false}, () => {
            document.removeEventListener("click", this.hideDropdownMenu);
        });
    };

    toggleDropdownMenu = event => {
        event.preventDefault();
        !this.state.displayMenu
            ? this.setState({displayMenu: true})
            : this.setState({displayMenu: false});
    };

    render() {
        if (this.state.desktop) {
            return this.desktopView();
        } else {
            return this.mobileView();
        }
    }

    desktopView() {
        const {classes} = this.props;
        return (
            <div className="Menu">
                <div className="btn" onClick={this.showDropdownMenu}>
                    Tools
                    {this.state.displayMenu ? (
                        <ul>
                            <li onClick={this.props.openShapeLibraryModal}>
                                <a href="#">Shape Library</a>
                            </li>
                        </ul>
                    ) : null}
                </div>
            </div>
        );
    }

    mobileView() {
        return (
            <li className="metismenu-item" onClick={this.toggleDropdownMenu}>
                <a
                    className={
                        this.state.displayMenu ? "metismenu-link active" : "metismenu-link"
                    }
                    href="#"
                >
                    Tools <span>&#x25BA;</span>
                </a>
                <ul
                    className={
                        this.state.displayMenu
                            ? "metismenu-container visible"
                            : "metismenu-container"
                    }
                >
                    <li className="metismenu-item" onClick={this.props.openShapeLibraryModal}>
                        <a className="metismenu-link" href="#">
                            Shape Library
                        </a>
                    </li>
                </ul>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        openShapeLibraryModal:()=>{
            dispatch({type: "OPEN_SHAPE_LIBRARY_MODAL"});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Tools));
