"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryProjectsAsync } from '../../../actions/actionCreators/queryProjectsActionCreators';
import columnDefs from '../columns';

import SimpleRVTable from '../../SimpleRVTable';


/**
 * Table that displays the *result* of the Projects/samples query.
 */
class QueryProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.queryType = "";
    }

    static propTypes = {
        queryType: PropTypes.string.isRequired,  // from router, see parent (route) component
        selectedSamples: PropTypes.array,
        //searchTerm: PropTypes.string,
    };

    getDataAsync = (selectedSamples, queryType) => {
        return this.props.queryProjectsAsync(
                selectedSamples || this.props.selectedSamples,
                queryType || this.queryType)
            .fail(() => console.error("queryProjectsAsync() failed to load data."));
    };

    /* If query type has changed (route change), query new data */
    componentWillReceiveProps(newProps) {
        let queryType = newProps.queryType;
        if (queryType !== this.queryType) {
            this.queryType = queryType;
            this.getDataAsync(this.props.selectedSamples, queryType);
        }
    }

    formatData(data) {
        let L = data.length;
        for (let i=0; i < L; i++) {
            let d = data[i];
            d.submitter = (d.submitter_first_name + d.submitter_last_name) || "";
        }
        return data;
    }

    render() {
        let data = this.formatData(this.props.tableData);
        return (
            <SimpleRVTable
                columnDefs={columnDefs[this.props.queryType]}
                getDataAsync={this.getDataAsync}
                tableData={data}
            />
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        tableData: state.queryProjects.tableData,
        searchTerm: state.queryProjects.searchTerm,
        selectedSamples: state.queryProjects.selectedSamples,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ queryProjectsAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryProjectsTable);
