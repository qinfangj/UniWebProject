"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOptionsListAsync, getConditionalOptionsListAsync } from '../../actions/actionCreators/formsActionCreators';
import Select from '../elements/Select';


/**
 * Wrapper on a Select that fetches the options list from backend, async.
 * If `hasNoneValue`, it adds a supplementary 'none' option.
 */
class AsyncOptionsList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        table: PropTypes.string.isRequired,  // the db table to query the data from
        form: PropTypes.string.isRequired,  // the form name - to find the value in store
        field: PropTypes.string.isRequired,  // the name of the form field - to find the value in store
        storeKey: PropTypes.string.isRequired,  // the data store key for the result list
        formatter: PropTypes.func,  // (row object from backend) => `[id, name]`
        suffix: PropTypes.string,  // route suffix for conditional lists (e.g. "all" in "/table/projects/list/all")
        hasNoneValue: PropTypes.bool,  // whether there can be a "no item selected" option
    };

    componentWillMount() {
        let storeKey = this.props.storeKey;
        if (this.props.suffix) {
            this.props.getConditionalOptionsListAsync(this.props.table, this.props.suffix, storeKey);
        } else {
            this.props.getOptionsListAsync(this.props.table, storeKey);
        }
    }

    getList() {
        let options = this.props.options.map(v => this.props.formatter(v));
        if (this.props.hasNoneValue) {
            options.unshift([-1, '-']);
        }
        return options;
    }

    render() {
        return (
            <Select
                {...this.props}
                options={this.getList()}
            />
        );
    }

}


AsyncOptionsList.defaultProps = {
    hasNoneValue: true,
    options: [],
};

const mapStateToProps = (state, ownProps) => {
    return {
        options: state.options[ownProps.storeKey],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOptionsListAsync: (table, storeKey) => dispatch(getOptionsListAsync(table, storeKey)),
        getConditionalOptionsListAsync: (table, suffix, storeKey) => dispatch(getConditionalOptionsListAsync(table, suffix, storeKey)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsyncOptionsList);

