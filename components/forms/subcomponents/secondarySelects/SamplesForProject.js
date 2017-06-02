"use strict";
import React from 'react';
import Select from '../../elements/Select';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../../constants/fields';
import tableNames from '../../../tables/tableNames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSecondaryOptionsListAsync } from '../../../actions/actionCreators/formsActionCreators';

/**
 * The list of Samples that corresponds to a selected project (see `changeFormValue` action).
 * This is a simple Select with specific formatter and default store keys.
 * Used in User requests and Libraries insert forms.
 */
class SamplesForProject extends React.PureComponent {

    formatter(v) { return [v.id, v.name + (v.shortName ? " ("+v.shortName+")" : "")]; }

    componentWillReceiveProps(newProps) {
        let refValue = newProps.refValue;
        if (refValue && refValue !== this.props.refValue) {
            this.props.getSecondaryOptionsListAsync(tableNames.SAMPLES, refValue, newProps.storeKey);
        }
    }

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
    let storeKey = ownProps.form +'_'+ optionsStoreKeys.SAMPLES_FOR_PROJECT;
    let options = state.options[storeKey] || [];
    let refValue = state.forms[ownProps.form][fields.PROJECT_ID];
    return {
        options: options,
        refValue: refValue,
        storeKey: storeKey,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSecondaryOptionsListAsync }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SamplesForProject);