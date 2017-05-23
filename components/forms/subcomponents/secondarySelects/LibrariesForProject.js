"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../elements/Select';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../fields';
import tableNames from '../../../tables/tableNames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSecondaryOptionsListAsync, changeFormValue } from '../../../actions/actionCreators/formsActionCreators';


/**
 * List available libraries for a selected project.
 * This is a simple Select with specific formatter and default store keys.
 * Used in Runs and Bioanalysers insert (sub-) forms.
 * The `refFieldName` prop is the name of the projects selection field.
 */
class LibrariesForProject extends React.PureComponent {

    formatter(v) { return [v.id, v.name]; }

    componentWillMount() {
        if (this.props.onMount) {
            this.props.getSecondaryOptionsListAsync(tableNames.LIBRARIES, this.props.refValue, this.props.storeKey);
        }
    }

    componentWillReceiveProps(newProps) {
        let refValue = newProps.refValue;
        if (refValue && refValue !== this.props.refValue) {
            this.props.getSecondaryOptionsListAsync(tableNames.LIBRARIES, refValue, newProps.storeKey);
        }
    }

    render() {
        let {options, ...otherProps} = this.props;
        options = options.map((v) => this.formatter(v));
        options.unshift([-1, '-']);
        return (
            <Select
                options={options}
                {...otherProps}
            />
        );
    }
}

LibrariesForProject.propTypes = {
    // If we have several independent such fields in the same form, identify them.
    // The best way is to use the reference field name, which is also unique in the form.
    refFieldName: PropTypes.string,
    onMount: PropTypes.bool,  // fire the fetch directly with the current refValue without waiting for the refValue to change
};

LibrariesForProject.defaultProps = {
    field: fields.LIBRARY_ID,
    label: null,
    refFieldName: fields.PROJECT_ID,
    options: [],
    refValue: -1,
    onMount: false,
};

const mapStateToProps = (state, ownProps) => {
    // Need to specify the form in the store key because there is a different one
    // for each different selected project.
    if (! state.forms[ownProps.form]) {
        console.warn("Uninitialized form");
        return {options: []};
    }
    let storeKey = ownProps.form +'_'+ optionsStoreKeys.LIBRAIRIES_FOR_PROJECT +'_'+ ownProps.refFieldName;
    let options = state.options[storeKey] || [];
    let refValue = state.forms[ownProps.form][ownProps.refFieldName];
    return {
        options: options,
        refValue: refValue,
        storeKey: storeKey,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSecondaryOptionsListAsync, changeFormValue }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LibrariesForProject);

