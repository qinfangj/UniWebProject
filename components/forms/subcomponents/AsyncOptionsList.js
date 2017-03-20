"use strict";
import React from 'react';
import store from '../../../core/store';
import { getOptionsListAsync, getConditionalOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import Select from '../elements/Select';
import * as forms from '../forms';


/**
 * Wrapper on a Select that fetches the options list from backend, async.
 * If `hasNoneValue`, it adds a supplementary 'none' option.
 */
class AsyncOptionsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {list: []};
    }

    static propTypes = {
        table: React.PropTypes.string.isRequired,  // the db table to query the data from
        form: React.PropTypes.string.isRequired,  // the form name - to find the value in store
        field: React.PropTypes.string.isRequired,  // the name of the form field - to find the value in store
        storeKey: React.PropTypes.string.isRequired,  // the data store key for the result list
        formatter: React.PropTypes.func,  // (row object from backend) => `[id, name]`
        suffix: React.PropTypes.string,  // route suffix for conditional lists (e.g. "all" in "/table/projects/list/all")
        hasNoneValue: React.PropTypes.bool,  // whether there can be a "no item selected" option
    };

    componentWillMount() {
        let storeKey = this.props.storeKey;
        this.unsubscribe = store.subscribe(() => {
            let list = store.getState().forms[storeKey];
            if (list) {
                this.assertIsArray(list);
                this.setState({ list });
            }
        });
        // Already in cache: just load it
        let list = store.getState().forms[storeKey];
        if (list) {
            this.assertIsArray(list);
            this.setState({ list });
        // Request from backend
        } else {
            if (this.props.suffix) {
                store.dispatch(getConditionalOptionsListAsync(this.props.table, this.props.suffix, storeKey));
            } else {
                store.dispatch(getOptionsListAsync(this.props.table, storeKey));
            }
            this.setState({ list: [] });
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    assertIsArray(list) {
        if (!list || !Array.isArray(list)) {
            throw "Options list is not an array: "+list.toString();
        } else {
            return true;
        }
    }

    getList() {
        let options = this.state.list.map(v => this.props.formatter(v));
        if (this.props.hasNoneValue) {
            options.unshift([-1, '-']);
        }
        return options;
    }

    render() {
        return (
            <Select {...this.props}
                    ref={(c) => {this._select = c;}}
                    options={this.getList()}
            />
        );
    }

}


AsyncOptionsList.defaultProps = {
    hasNoneValue: true,
};


export default AsyncOptionsList;


//-----------------------------------------------------
// Try with "connect" method
//-----------------------------------------------------

// import { connect } from 'react-redux';
//
// const mapStateToProps = (state, ownProps) => {
//     return {list: state.facilityData[ownProps.storeKey]};
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchData: (url) => dispatch(itemsFetchData(url))
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(AsyncOptionsList);

