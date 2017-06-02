"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../elements/Select';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../../constants/fields';
import tableNames from '../../../tables/tableNames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSecondaryOptionsListAsync } from '../../../actions/actionCreators/formsActionCreators';


/**
 * List available library pools for a selected project.
 * This is a simple Select with specific formatter and default store keys.
 * Used in Runs insert (sub-) form.
 * The `refFieldName` prop is the name of the projects selection field.
 */
class PoolsForProject extends React.PureComponent {

    formatter(v) { return [v.id, v.pool]; }

    componentWillReceiveProps(newProps) {
        let refValue = newProps.refValue;
        if (refValue && refValue !== this.props.refValue) {
            this.props.getSecondaryOptionsListAsync(tableNames.USER_REQUESTS, refValue, newProps.storeKey);
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

PoolsForProject.propTypes = {
    // If we have several independent such fields in the same form, identify them.
    // This suffix must be the same as was passed to the reference field, see `changeFormValue` action.
    refFieldName: PropTypes.string,
};

PoolsForProject.defaultProps = {
    field: fields.USER_REQUEST_ID,
    label: null,
    refFieldName: "",
};

const mapStateToProps = (state, ownProps) => {
    // Need to specify the form in the store key because there is a different one
    // for each different selected project.
    if (! state.forms[ownProps.form]) {
        console.warn("Uninitialized form");
        return {options: []};
    }
    let storeKey = ownProps.form +'_'+ optionsStoreKeys.POOLS_FOR_PROJECT +'_'+ ownProps.refFieldName;
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


export default connect(mapStateToProps, mapDispatchToProps)(PoolsForProject);

