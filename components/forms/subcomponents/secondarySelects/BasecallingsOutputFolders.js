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
 * List available basecallings output folders for a selected run.
 * This is a simple Select with specific formatter and default store keys.
 * Used in Alignemnts insert form.
 */
class BasecallingsOutputFolders extends React.PureComponent {

    formatter(v) { return [v.id, v.outputDir]; }

    componentWillReceiveProps(newProps) {
        let refValue = newProps.refValue;
        if (refValue && refValue !== this.props.refValue) {
            this.props.getSecondaryOptionsListAsync(tableNames.BASECALLINGS, refValue, newProps.storeKey);
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

BasecallingsOutputFolders.defaultProps = {
    field: fields.BASECALLING_ID,
    label: "Unaligned data output folder",
};

const mapStateToProps = (state, ownProps) => {
    // Need to specify the form in the store key because there is a different one
    // for each different selected project.
    let storeKey = ownProps.form +'_'+ optionsStoreKeys.BASECALLINGS_OUTPUT_FOLDERS_FOR_RUN;
    let options = state.options[storeKey] || [];
    let refValue = state.forms[ownProps.form][fields.RUN_ID];
    return {
        options: options,
        refValue: refValue,
        storeKey: storeKey,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getSecondaryOptionsListAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BasecallingsOutputFolders);

