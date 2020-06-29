/**
 * Copyright (c) 2019 Micro Logic Corp.
 */

import React from 'react'
import './material.scss'
import {connect} from "react-redux";

class Quantity extends React.Component {
    render() {
        return (
            <div className="Material">
                <button className="btn-Material" onClick={this.props.open} tabIndex={-1}>
                    Quantity: {this.props.quantity}
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        quantity: state.quantityWindowReducer.quantity,
    };
};

const mapDispatchToProps = () => {
    return {
        open: () => {
            container.resolve('quantityWindow').show();
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Quantity);
