"use strict";
import React from 'react';
import { connect } from 'react-redux';
import * as forms from '../forms';

import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import Select from '../elements/Select';


/**
 * Dropdown with available options depending on the selected value
 * in another input field `referenceField`.
 */
class AsyncSecondaryOptionsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.referenceValue = null; // not in state because not used for display. Only the callback updates the component.
    }

    /**
     * `referenceField` is the field name of another `Select` component
     * that the options list of this one depends on.
     */
    static propTypes = {
        form: React.PropTypes.string.isRequired,  // the form name - to find the value in store
        field: React.PropTypes.string.isRequired,  // the name of the form field - to find the value in store
        referenceField: React.PropTypes.string.isRequired,  // the store key for the other input's form value, which should have been specified via `field`!
        table: React.PropTypes.string.isRequired,  // the db table to query the data from
        storeKey: React.PropTypes.string.isRequired,  // the store key for the result list
        label: React.PropTypes.string,  // The text above the input
        formatter: React.PropTypes.func,  // ex: object => [id, name]
    };

    /**
     * If the value of the reference select field has changed,
     * fetch the corresponding secondary options.
     */
    componentWillUpdate(nextProps) {
        let refValue = nextProps.referenceValue;
        if (refValue && refValue !== this.referenceValue) {
            this.referenceValue = refValue;  // avoids infinite callback loop
            this.props.getSecondaryOptionsListAsync(this.props.table, refValue, this.props.storeKey);
        }
    }

    componentDidUpdate() {
        forms.initFormField(this.props.form, this.props.field, this.props.value);
    }

    getList() {
        return this.props.list.map(v => this.props.formatter(v));
    }

    render() {
        return (
            <Select options={this.getList()} {...this.props} />
        );
    }

}


AsyncSecondaryOptionsList.defaultProps = {
    list: [],
    value: null,
};

const mapStateToProps = (state, ownProps) => {
    let formData = state.forms[ownProps.form];  // to get the reference field value
    let list = state.forms[ownProps.storeKey];
    let value = (list && list.length > 0) ? list[0].id : null;
    return {
        list: list,
        value: value,
        referenceValue: formData[ownProps.referenceField],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSecondaryOptionsListAsync: (table, refValue, storeKey) => dispatch(getSecondaryOptionsListAsync(table, refValue, storeKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsyncSecondaryOptionsList);

