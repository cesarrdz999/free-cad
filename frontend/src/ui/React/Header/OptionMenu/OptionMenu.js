import React, {Component} from 'react';
import PropsTypes from 'prop-types';

import './option-menu.scss';

import File from "../DropDownMenu/File/File";
import Edit from "../DropDownMenu/Edit/Edit";

import Line from "../DropDownMenu/Line/Line";
import Job from "../DropDownMenu/Job/Job";
import Help from "../DropDownMenu/Help/Help";
import View from '../DropDownMenu/View/View';
import Tools from "../DropDownMenu/Tools/Tools";

class OptionMenu extends Component {
    constructor(props) {
        super(props);
    }

    handleClose(e) {
        if (e.target.className.includes('close')) {
            this.props.closeCallback();
        }
    }

    render() {
        return (
            <div className="OptionMenu">
                <div className="metismenu">
                    <ul onClick={this.handleClose.bind(this)} className="metismenu-container">
                        <File history={this.props.history}/>
                        <Edit/>
                        <Line/>
                        <View/>
                        <Tools />
                        <Job closeMenu={this.handleClose.bind(this)} history={this.props.history}/>
                        <Job history={this.props.history}/>
                        <Help />
                    </ul>
                </div>
            </div>
        )
    }
}

OptionMenu.PropsTypes = {
    closeCallback: PropsTypes.func.isRequired
}

export default OptionMenu