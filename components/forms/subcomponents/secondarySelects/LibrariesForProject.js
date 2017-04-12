"use strict";
import React from 'react';
import Select from '../../elements/Select';
import dataStoreKeys from '../../../constants/dataStoreKeys';
import fields from '../../fields';
import { connect } from 'react-redux';



/**
 * List available libraries for a selected project.
 * This is a simple Select with specific formatter and default store keys.
 * Used in Runs and Bioanalysers insert (sub-) forms.
 * The `refFieldName` prop is the name of the projects selection field.
 */
class LibrariesForProject extends React.PureComponent {
    formatter(v) { return [v.id, v.name]; }
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
    refFieldName: "",
};

const mapStateToProps = (state, ownProps) => {
    // Need to specify the form in the store key because there is a different one
    // for each different selected project.
    let storeKey = ownProps.form +'_'+ dataStoreKeys.LIBRAIRIES_FOR_PROJECT +'_'+ ownProps.refFieldName;
    let options = state.options[storeKey] || [];
    return {
        options: options,
    };
};


export default connect(mapStateToProps)(LibrariesForProject);

