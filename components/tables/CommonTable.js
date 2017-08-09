"use strict";
import React from 'react';
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as tables from './tables.js';
import adminColumns from './adminData/columns';
import facilityDataColumns from './facilityData/columns';
import { getTableDataAsync } from '../actions/actionCreators/facilityDataActionCreators';

import { Column, Table, AutoSizer, SortDirection, InfiniteLoader} from 'react-virtualized';
import AsyncTable from './AsyncTable';


class CommonTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gridHeight = tables.GRID_HEIGTH;
        this.rowHeight = tables.ROW_HEIGTH;
        this.nVisibleRows = (this.gridHeight / this.rowHeight) - 1;
        this.headerHeight = 35;
        this.overscanRowCount = 10;  // "Number of rows to render above/below the visible bounds of the list"
        this.useDynamicRowHeight = false;
        if (this.props.domain === "facility" ) {
            this.nrowsPerQuery = 100;
        } else {
            this.nrowsPerQuery = 10000000;
        }
        if (this.nrowsPerQuery < this.nVisibleRows) {
            console.warn("Must query at least as many rows as we can display to enable scrolling",
                `(${this.nrowsPerQuery} < ${this.nVisibleRows})`);
        }
        this.state = {
            searchTerm: "",
            rowCount: 0,
            sortBy: 'id',
            sortDirection: SortDirection.DESC,
        };
    }

    static propTypes = {
        dataStoreKey: PropTypes.string.isRequired,  // store key for the table data (in "async")
        columns: PropTypes.array.isRequired, // columns definition
        table: PropTypes.string.isRequired,  // database table name - to fetch the content
        name: PropTypes.string.isRequired,
        domain: PropTypes.string.isRequired,  // "facility" or "admin"
        activeOnly: PropTypes.bool,  // whether it should call ?active=true when fetching the content
        data: PropTypes.array,  // the table content (an array of row objects)
        isLoading: PropTypes.bool,  // loading spinner
        formatter: PropTypes.func,  // to reformat the data so that it fits the columns definition
    };

    /** Fetch a page of data from backend. */
    getDataAsync = (limit, offset, sortBy, sortDir, filterBy) => {
        return this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly,
            limit, offset,
            sortBy || this.state.sortBy, sortDir || this.state.sortDirection, filterBy || this.state.searchTerm);
    };

    render() {
        let columnDefs = (this.props.domain === "facility") ?
            facilityDataColumns[this.props.table] :
            adminColumns[this.props.table];
        return (
            <div style={{width: '100%', height: '100%'}}>

                <AsyncTable
                    getDataAsync={this.getDataAsync}
                    getColumns={this.getColumns}
                    data={this.props.data}
                    columns={columnDefs}
                    //isLoading={this.props.isLoading}
                    formatter={this.props.formatter}
                    sortAsync={this.props.domain === "facility"}
                    filterAsync={this.props.domain === "facility"}
                />

            </div>
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


