import React from 'react';
import store from '../../../core/store';

import { getOptionsListAsync, getConditionalOptionsListAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import Select from '../elements/Select';


/**
 * Dropdown with available options
 */
class AsyncOptionsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {list: [], value: null};
    }

    static propTypes = {
        table: React.PropTypes.string.isRequired,  // the db table to query the data from
        field: React.PropTypes.string.isRequired,  // the name of the form field - to find the value in store
        form: React.PropTypes.string.isRequired,  // the form name - to find the value in store
        storeKey: React.PropTypes.string.isRequired,  // the data store key for the result list
        label: React.PropTypes.string,  // The text above the input
        formatter: React.PropTypes.func,  // ex: row object from REST => [id, name]
        suffix: React.PropTypes.string,  // route suffix for conditional lists (e.g. "all" in "/table/projects/list/all")
        selectProps: React.PropTypes.object,  // other props to pass to the Select lower-level component
    };

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        let storeKey = this.props.storeKey;
        this.unsubscribe = store.subscribe(() => {
            let list = store.getState().facilityData[storeKey];
            if (list) {
                let value = list.length > 0 ? list[0].id : null;  // first one of the list
                this.setState({ list, value });
            }
        });
        let list = store.getState().facilityData[storeKey];
        if (list) {
            let value = list.length > 0 ? list[0].id : null;  // first one of the list
            this.setState({ list, value });
        } else {
            if (this.props.suffix) {
                store.dispatch(getConditionalOptionsListAsync(this.props.table, this.props.suffix, storeKey));
            } else {
                store.dispatch(getOptionsListAsync(this.props.table, storeKey));
            }
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
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


export default AsyncOptionsList;
