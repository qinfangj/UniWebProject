"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import adminColumns from './adminData/columns';
import facilityDataColumns from './facilityData/columns';
import { getTableDataAsync } from '../actions/actionCreators/facilityDataActionCreators';

import AsyncTable from './_AsyncTable';


/**
 * Infinite loading table common to "Facility data" and "Admin" sections.
 */
class CommonTable extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        dataStoreKey: PropTypes.string.isRequired,  // store key for the table data (in "async")
        columns: PropTypes.array.isRequired, // columns definition
        table: PropTypes.string.isRequired,  // database table name - to fetch the content
        name: PropTypes.string.isRequired,
        domain: PropTypes.string.isRequired,  // "facility" or "admin"
        activeOnly: PropTypes.bool,  // whether it should call ?active=true when fetching the content
        formatter: PropTypes.func,  // to reformat the data so that it fits the columns definition
        // From store
        data: PropTypes.array,  // the table content (an array of row objects)
        isLoading: PropTypes.bool,  // loading spinner
    };

    /** Fetch a page of data from backend. */
    getDataAsync = (limit, offset, sortBy, sortDir, filterBy) => {
        return this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly,
            limit, offset, sortBy, sortDir, filterBy);
    };

    render() {
        let columnDefs = (this.props.domain === "facility") ?
            facilityDataColumns[this.props.table] :
            adminColumns[this.props.table];
        let nrowsPerQuery = (this.props.domain === "facility") ? 100 : 10000000;
        let data = this.props.formatter(this.props.data);

        return (
            <AsyncTable
                data={data}
                getDataAsync={this.getDataAsync}
                getColumns={this.getColumns}
                columnDefs={columnDefs}
                //isLoading={this.props.isLoading}
                formatter={this.props.formatter}
                sortAsync={this.props.domain === "facility"}
                filterAsync={this.props.domain === "facility"}
                nrowsPerQuery={nrowsPerQuery}
            />
        )
    }
}


CommonTable.defaultProps = {
    activeOnly: false,
    data: [],
    isLoading: false,
    formatter: (data) => data,
};

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.facilityData[ownProps.dataStoreKey].data,
        allLoaded: state.facilityData[ownProps.dataStoreKey].allLoaded,
        isLoading: state.facilityData.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getTableDataAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonTable);


