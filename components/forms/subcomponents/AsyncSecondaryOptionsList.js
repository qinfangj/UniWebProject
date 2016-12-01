import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getSecondaryOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
import Select from '../elements/Select';
import constants from '../../constants/constants';

/**
 * Dropdown with available options depending on the selected value
 * in another input field `referenceField`.
 */
class AsyncSecondaryOptionsList extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.referenceValue = null; // not in state because not used for display. Only the callback updated the component.
        this.state = {list: [], value: null};
    }

    /**
     * `referenceField` is the `name` prop of a `Select` component,
     *  which is the `table` props of higher-order `AsyncOptionsList < Options` components
     *  and the key used in the store for the selected item.
     */
    static propTypes = {
        referenceField: React.PropTypes.string.isRequired,  // the store key for the other input's form value
        table: React.PropTypes.string.isRequired,
        form: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        formatter: React.PropTypes.func,  // ex: object => [id, name]
        storeKey: React.PropTypes.string,  // the store key for the result list - defaults to `table` prop
        selectProps: React.PropTypes.object,  // other props to pass to the Select lower-level component
    };

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        this.storeKey = this.props.storeKey || (constants.SECONDARY_OPTIONS + this.props.form +"_"+ this.props.table);
        this.unsubscribe = store.subscribe(() => {
            let storeState = store.getState();
            let list = storeState.async[this.storeKey];
            let formValues = storeState.common.forms[this.props.form];
            // Since it depends on another field of the same form, no need to
            //  do anything if the other field has not yet sent its value to the store.
            if (formValues !== undefined) {
                let referenceValue = formValues[this.props.referenceField];
                // The value it dends on changed, ask for new data
                if (referenceValue && referenceValue !== this.referenceValue) {
                    this.referenceValue = referenceValue;  // avoids infinite callback loop
                    store.dispatch(getSecondaryOptionsListAsync(this.props.table, referenceValue, this.storeKey));
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

    getList() {
        return this.state.list.map(v => this.props.formatter(v));
    }

    render() {
        return (
            <Select name={this.props.table} label={this.props.label} form={this.props.form}
                    ref={(c) => {this._select = c;}}
                    options={this.getList()}
                    {...this.props.selectProps}
            />
        );
    }

}


export default AsyncSecondaryOptionsList;
