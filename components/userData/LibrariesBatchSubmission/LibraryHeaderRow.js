"use strict";
import React from 'react';
import { connect } from 'react-redux';
import * as helpers from '../helpers';
import CommonHeaderRow from '../CommonHeaderRow';



/**
 * The header of the libraries batch insert table.
 */
class LibrariesHeaderRow extends React.PureComponent {
    render() {
        return (
            <CommonHeaderRow
                formData={this.props.formData}
                formModelName="userData.libraries"
                emptyRowModel={helpers.newLibraryRow()}
            />
        );
    }
}


function mapStateToProps(state) {
    let formData = state.userData.libraries;
    return {
        formData: formData,
    };
}


export default connect(mapStateToProps)(LibrariesHeaderRow);


