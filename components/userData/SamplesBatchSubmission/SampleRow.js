"use strict";
import React from 'react';
import { connect } from 'react-redux';
import sampleModel from '../formModels/sampleModel';
import CommonFeatRow from '../CommonFeatRow';



/**
 * A specific implementation of CommonFeatRow from samples.
 */
class SampleRow extends React.PureComponent {
    render() {
        return (
            <CommonFeatRow
                formData={this.props.formData}
                options={this.props.options}
                rowIndex={this.props.rowIndex}
                model={sampleModel}
                formModelName="userDataForms.samples.requests"
            />
        );
    }
}


function mapStateToProps(state) {
    let formData = state.userDataForms.samples.requests;
    return {
        formData: formData,
        options: state.options,
    };
}


export default connect(mapStateToProps)(SampleRow);


