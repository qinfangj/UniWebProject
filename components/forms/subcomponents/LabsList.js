import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';
import _ from 'lodash';

import { getOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
import Select from '../elements/Select';

/**
 * Dropdown with available values for the laboratory.
 */
class LabsList extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {list: [], value: null};
    }

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let list = store.getState().async["labsList"];
            let value = list.length > 0 ? list[0].id : null;  // first one of the list
            this.setState({ list: list, value: value });
        });
        store.dispatch(getOptionsListAsync("people", "labsList"));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    getList() {
        return _.sortBy(this.state.list, ["last_name", "first_name"]).map(v => {
            return [v.id, v.last_name +" "+ v.first_name];
        });
    }

    render() {
        return (
            <Select name="personInCharge" label="Laboratory" ref={(c) => {this._select = c;}}
                options={this.getList()}
            />
        );
    }

}


export default LabsList;
