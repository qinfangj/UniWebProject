"use strict";
import React from 'react';
import { connect } from 'react-redux';
import * as helpers from '../helpers';
import CommonHeaderRow from '../CommonHeaderRow';
import sampleModel from '../formModels/sampleModel';



/**
 * The header of the libraries batch insert table.
 */
class SamplesHeaderRow extends React.PureComponent {
    render() {
        return (
            <CommonHeaderRow
                formModel={sampleModel}
                formData={this.props.formData}
                formModelName="userDataForms.samples.requests"
                emptyRowModel={helpers.newSampleRow()}
            />
        );
    }
}


function mapStateToProps(state) {
    let formData = state.userDataForms.samples.requests;
    return {
        formData: formData,
    };
}


export default connect(mapStateToProps)(SamplesHeaderRow);


