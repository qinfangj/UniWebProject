"use strict";
import React from 'react';
import Select from '../../elements/Select';
import dataStoreKeys from '../../../constants/dataStoreKeys';
import fields from '../../fields';
import { connect } from 'react-redux';



/**
 * List available basecallings output folders for a given run ID.
 * Used in Alignemnts insert form.
 */
class BasecallingsOutputFolders extends React.PureComponent {
    formatter(v) { return [v.id, v.outputDir]; }
    render() {
        let {options, ...otherProps} = this.props;
        options = options.map((v) => this.formatter(v));
        return (
            <Select
                options={options}
                {...otherProps}
            />
        );
    }
}

BasecallingsOutputFolders.defaultProps = {
    field: fields.BASECALLING_ID,
    label: "Unaligned data output folder",
};

const mapStateToProps = (state, ownProps) => {
    // Need to specify the form in the store key because there is a different one
    // for each different selected project.
    let storeKey = ownProps.form +'_'+ dataStoreKeys.BASECALLINGS_OUTPUT_FOLDERS_FOR_RUN;
    let options = state.forms[storeKey] || [];
    return {
        options: options,
    };
};


export default connect(mapStateToProps)(BasecallingsOutputFolders);

