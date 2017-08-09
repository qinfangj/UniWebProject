"use strict";
import React from 'react';
import { connect } from 'react-redux';
import libraryModel from '../formModels/libraryModel';
import CommonFeatRow from '../CommonFeatRow';



/**
 * A specific implementation of CommonFeatRow from libraries.
 */
class LibraryRow extends React.PureComponent {
    render() {
        return (
            <CommonFeatRow
                formData={this.props.formData}
                options={this.props.options}
                rowIndex={this.props.rowIndex}
                model={libraryModel}
                formModelName="userDataForms.libraries.requests"
            />
        );
    }
}


function mapStateToProps(state) {
    let formData = state.userDataForms.libraries.requests;
    return {
        formData: formData,
        options: state.options,
    };
}


export default connect(mapStateToProps)(LibraryRow);

