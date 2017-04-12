"use strict";
import React from 'react';
import Select from '../../elements/Select';
import dataStoreKeys from '../../../constants/dataStoreKeys';
import fields from '../../fields';
import { connect } from 'react-redux';


/**
 * The list of Samples that corresponds to a selected project (see `changeFormValue` action).
 * This is a simple Select with specific formatter and default store keys.
 * Used in User requests and Libraries insert forms.
 */
class SamplesForProject extends React.PureComponent {
    formatter(v) { return [v.id, v.name + (v.shortName ? " ("+v.shortName+")" : "")]; }
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

SamplesForProject.defaultProps = {
    field: fields.SAMPLE_ID,
    label: "Sample",
};

const mapStateToProps = (state, ownProps) => {
    // Need to specify the form in the store key because there is a different one
    // for each different selected project.
    let storeKey = ownProps.form +'_'+ dataStoreKeys.SAMPLES_FOR_PROJECT;
    let options = state.forms[storeKey] || [];
    return {
        options: options,
    };
};


export default connect(mapStateToProps)(SamplesForProject);