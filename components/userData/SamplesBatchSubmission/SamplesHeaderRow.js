"use strict";
import React from 'react';
import { connect } from 'react-redux';
import * as helpers from '../helpers';
import CommonHeaderRow from '../CommonHeaderRow';



/**
 * The header of the libraries batch insert table.
 */
class SamplesHeaderRow extends React.PureComponent {
    render() {
        return (
            <CommonHeaderRow
                formData={this.props.formData}
                formModelName="userData.samples"
                emptyRowModel={helpers.newSampleRow()}
            />
        );
    }
}


function mapStateToProps(state) {
    let formData = state.userData.samples;
    return {
        formData: formData,
    };
}


export default connect(mapStateToProps)(SamplesHeaderRow);


