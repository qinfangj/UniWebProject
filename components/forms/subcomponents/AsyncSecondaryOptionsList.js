"use strict";
import React from 'react';
import store from '../../../core/store';
import * as forms from '../forms';

import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import Select from '../elements/Select';


/**
 * Dropdown with available options depending on the selected value
 * in another input field `referenceField`.
 */
class AsyncSecondaryOptionsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.referenceValue = null; // not in state because not used for display. Only the callback updates the component.
        this.state = {list: [], value: null};
        //forms.initFormField(this.props.form, this.props.field, -1);
    }

    /**
     * `referenceField` is the `name` prop of a `Select` component,
     *  which is the `table` props of higher-order `AsyncOptionsList < Options` components
     *  and the key used in the store for the selected item.
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

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let list = store.getState().facilityData[this.props.storeKey];
            let formValues = store.getState().forms[this.props.form];
            // Since it depends on another field of the same form, no need to
            //  do anything if the other field has not yet sent its value to the store.
            if (formValues !== undefined) {
                let referenceValue = formValues[this.props.referenceField];
                // The value it depends on changed, ask for new data
                if (referenceValue && referenceValue !== this.referenceValue) {
                    this.referenceValue = referenceValue;  // avoids infinite callback loop
                    store.dispatch(getSecondaryOptionsListAsync(this.props.table, referenceValue, this.props.storeKey));
                }
                // New data received, update options list
                else if (list) {
                    let value = list.length > 0 ? list[0].id : null;  // first one of the list
                    this.setState({ list, value });
                }
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidUpdate() {
        forms.initFormField(this.props.form, this.props.field, this.state.value);
    }

    getList() {
        return this.state.list.map(v => this.props.formatter(v));
    }

    render() {
        return (
            <Select
                options={this.getList()}
                {...this.props}
            />
        );
    }

}


export default AsyncSecondaryOptionsList;
