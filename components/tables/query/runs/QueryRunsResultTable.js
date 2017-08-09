"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryRunsAsync } from '../../../actions/actionCreators/queryRunsActionCreators';
import columnDefs from '../columns';

import SimpleRVTable from '../../SimpleRVTable';


/**
 * Table that displays the *result* of the Runs query.
 */
class QueryRunsTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.queryType = "";
    }

    static propTypes = {
        queryType: PropTypes.string.isRequired,  // from router, see parent (route) component
        selectedRuns: PropTypes.object,
        //searchTerm: PropTypes.string,
    };

    getDataAsync = (selectedSamples, queryType) => {
        return this.props.queryRunsAsync(
            selectedSamples || this.props.selectedRuns,
            queryType || this.queryType)
        .fail(() => console.error("queryRunsAsync() failed to load data."));
    };

    /* If query type has changed (route change), query new data */
    componentWillReceiveProps(newProps) {
        let queryType = newProps.queryType;
        if (queryType !== this.queryType) {
            this.queryType = queryType;
            this.getDataAsync(this.props.selectedRuns, queryType);
        }
    }

    formatData(data) {
        let L = data.length;
        for (let i=0; i < L; i++) {
            let d = data[i];
            d.submitter = (d.submitter_first_name || "") +" "+ (d.submitter_last_name || "");
        }
        return data;
    }

    render() {
        let data = this.formatData(this.props.tableData);
        return (
            <SimpleRVTable
                columnDefs={columnDefs[this.props.queryType]}
                tableData={data}
            />
        );
    }

}


const mapStateToProps = (state) => {
    return {
        tableData: state.queryRuns.tableData,
        selectedRuns: state.queryRuns.selectedRuns,
        searchTerm: state.queryRuns.searchTerm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ queryRunsAsync }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsTable);
