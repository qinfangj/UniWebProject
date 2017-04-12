"use strict";
import React from 'react';
import Select from '../../elements/Select';
import dataStoreKeys from '../../../constants/dataStoreKeys';
import fields from '../../fields';
import { connect } from 'react-redux';



/**
 * List available library pools for a given project.
 * Used in Runs insert (sub-) form.
 */
class PoolsForProject extends React.PureComponent {
    formatter(v) { return [v.id, v.pool]; }
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
    refFieldName: React.PropTypes.string,
};

PoolsForProject.defaultProps = {
    field: fields.USER_REQUEST_ID,
    label: null,
    refFieldName: "",
};

const mapStateToProps = (state, ownProps) => {
    // Need to specify the form in the store key because there is a different one
    // for each different selected project.
    let storeKey = ownProps.form +'_'+ dataStoreKeys.POOLS_FOR_PROJECT +'_'+ ownProps.refFieldName;
    let options = state.forms[storeKey] || [];
    return {
        options: options,
    };
};


export default connect(mapStateToProps)(PoolsForProject);

