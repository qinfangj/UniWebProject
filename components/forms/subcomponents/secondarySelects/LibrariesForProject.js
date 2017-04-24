"use strict";
import React from 'react';
import Select from '../../elements/Select';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../fields';
import tableNames from '../../../tables/tableNames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSecondaryOptionsListAsync } from '../../../actions/actionCreators/formsActionCreators';


/**
 * List available libraries for a selected project.
 * This is a simple Select with specific formatter and default store keys.
 * Used in Runs and Bioanalysers insert (sub-) forms.
 * The `refFieldName` prop is the name of the projects selection field.
 */
class LibrariesForProject extends React.PureComponent {

    formatter(v) { return [v.id, v.name]; }

    componentWillReceiveProps(newProps) {
        let refValue = newProps.refValue;
        if (refValue && refValue !== this.props.refValue) {
            this.props.getSecondaryOptionsListAsync(tableNames.LIBRARIES, refValue, newProps.storeKey);
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

LibrariesForProject.propTypes = {
    // If we have several independent such fields in the same form, identify them.
    // The best way is to use the reference field name, which is also unique in the form.
    refFieldName: React.PropTypes.string,
};

LibrariesForProject.defaultProps = {
    field: fields.LIBRARY_ID,
    label: null,
    refFieldName: fields.PROJECT_ID,
    options: [],
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
    return bindActionCreators({ getSecondaryOptionsListAsync }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LibrariesForProject);

