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
        forms.initFormField(this.props.form, this.props.field);
    }

    /**
     * `referenceField` is the `name` prop of a `Select` component,
     *  which is the `table` props of higher-order `AsyncOptionsList < Options` components
     *  and the key used in the store for the selected item.
     */
    static propTypes = {
        referenceField: React.PropTypes.string.isRequired,  // the store key for the other input's form value, which should have been specified via `field`!
        field: React.PropTypes.string.isRequired,  // the name of the form field - to find the value in store
        form: React.PropTypes.string.isRequired,  // the form name - to find the value in store
        table: React.PropTypes.string.isRequired,  // the db table to query the data from
        storeKey: React.PropTypes.string.isRequired,  // the store key for the result list
        label: React.PropTypes.string,  // The text above the input
        formatter: React.PropTypes.func,  // ex: object => [id, name]
        selectProps: React.PropTypes.object,  // other props to pass to the Select lower-level component
    };

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        let storeKey = this.props.storeKey;
        this.unsubscribe = store.subscribe(() => {
            let storeState = store.getState();
            let list = storeState.facilityData[storeKey];
            let formValues = storeState.common.forms[this.props.form];
            // Since it depends on another field of the same form, no need to
            //  do anything if the other field has not yet sent its value to the store.
            if (formValues !== undefined) {
                let referenceValue = formValues[this.props.referenceField];
                // The value it dends on changed, ask for new data
                if (referenceValue && referenceValue !== this.referenceValue) {
                    this.referenceValue = referenceValue;  // avoids infinite callback loop
                    store.dispatch(getSecondaryOptionsListAsync(this.props.table, referenceValue, storeKey));
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
            <Select field={this.props.field} label={this.props.label} form={this.props.form}
                    ref={(c) => {this._select = c;}}
                    options={this.getList()}
                    {...this.props.selectProps}
            />
        );
    }

}


export default AsyncSecondaryOptionsList;
