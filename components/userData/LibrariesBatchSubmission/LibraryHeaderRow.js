"use strict";
import React from 'react';
import { connect } from 'react-redux';
import * as helpers from '../helpers';
import CommonHeaderRow from '../CommonHeaderRow';
import libraryModel from '../formModels/libraryModel';



/**
 * The header of the libraries batch insert table.
 */
class LibrariesHeaderRow extends React.PureComponent {
    render() {
        return (
            <CommonHeaderRow
                formModel={libraryModel}
                formData={this.props.formData}
                formModelName="userDataForms.libraries.requests"
                emptyRowModel={helpers.newLibraryRow()}
            />
        );
    }
}


function mapStateToProps(state) {
    let formData = state.userDataForms.libraries.requests;
    return {
        formData: formData,
    };
}


export default connect(mapStateToProps)(LibrariesHeaderRow);


