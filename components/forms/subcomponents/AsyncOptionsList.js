import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
import Select from '../elements/Select';
import constants from '../../constants/constants';

/**
 * Dropdown with available options
 */
class AsyncOptionsList extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {list: [], value: null};
    }

    static propTypes = {
        table: React.PropTypes.string,
        label: React.PropTypes.string,
        formatter: React.PropTypes.func,  // object => [id, name]
    };

    getValue() {
        return this._select.getValue();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let list = store.getState().async[constants.OPTIONS + this.props.table];
            if (list) {
                let value = list.length > 0 ? list[0].id : null;  // first one of the list
                this.setState({ list, value });
            }
        });
        store.dispatch(getOptionsListAsync(this.props.table));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getList() {
        return this.state.list.map(v => {
            return [v.id, v.name];
        });
    }

    render() {
        return (
            <Select name={this.props.table} label={this.props.label} ref={(c) => {this._select = c;}}
                    options={this.getList()}
            />
        );
    }

}


export default AsyncOptionsList;
