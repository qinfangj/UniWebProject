import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';

import { getOptionsListAsync, getConditionalOptionsListAsync } from '../../actions/actionCreators/asyncActionCreators';
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
        table: React.PropTypes.string.isRequired,
        label: React.PropTypes.string,
        form: React.PropTypes.string,
        formatter: React.PropTypes.func,  // object => [id, name]
        all: React.PropTypes.bool,  // for conditional lists (all/activeOnly etc.)
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
        let list = store.getState().async[constants.OPTIONS + this.props.table];
        if (list) {
            let value = list.length > 0 ? list[0].id : null;  // first one of the list
            this.setState({ list, value });
        } else {
            if (this.props.all === true) {
                store.dispatch(getConditionalOptionsListAsync(this.props.table, true));
            } else if (this.props.all === false) {
                store.dispatch(getConditionalOptionsListAsync(this.props.table, false));
            } else {
                store.dispatch(getOptionsListAsync(this.props.table));

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
            <Select name={this.props.table} label={this.props.label} form={this.props.form}
                    ref={(c) => {this._select = c;}}
                    options={this.getList()}
            />
        );
    }

}


export default AsyncOptionsList;
