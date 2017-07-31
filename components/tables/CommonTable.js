"use strict";
import React from 'react';
import PropTypes from 'prop-types'
import css from './tables.css';
import cx from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable'

import adminColumns from './adminData/columns';
import facilityDataColumns from './facilityData/columns';
import { getTableDataAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { ROW_HEIGTH, GRID_HEIGTH, idColumnLink, checkData, sortImmutable } from './tables';

import DataLoadingIcon from '../utils/DataLoadingIcon';
import FormControl from 'react-bootstrap/lib/FormControl';
import { Column, Table, AutoSizer, SortIndicator, SortDirection, InfiniteLoader} from 'react-virtualized';



class CommonTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gridHeight = GRID_HEIGTH;
        this.rowHeight = ROW_HEIGTH;
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

    /**
     * Fetch a page of data from backend.
     */
    getDataAsync(limit, offset, sortBy, sortDir, filterBy, reset=false) {
        let _this = this;
        let dataLength = reset ? 0 : this.props.data.length;
        this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly,
            limit, offset,
            sortBy || this.state.sortBy, sortDir || this.state.sortDirection, filterBy || this.state.searchTerm)
        .done((data) => {
            // `data` is only the new block. The whole data is in `this.props.data`.
            if (data.length !== 0) {
                let hasNextPage = data.length % this.nrowsPerQuery === 0;
                let newDataLength = dataLength + data.length;
                let rowCount = hasNextPage ? newDataLength + 1 : newDataLength;
                _this.setState({ rowCount });
            } else {
                _this.setState({ rowCount: 0 })

            }
        })
        .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
    }

    componentWillMount() {
        // Can try to cache that result, but do it properly so that for instance it still understands active or not
        this.getDataAsync(this.nrowsPerQuery, 0);
    }

    /**
     * Backend sort.
     */
    _sort = ({ sortBy, sortDirection }) => {
        this.setState({ sortBy, sortDirection, rowCount: 0 });
        if (this.props.domain === "facility") {
            this.getDataAsync(this.nrowsPerQuery, 0, sortBy, sortDirection, this.state.searchTerm, true);
        }
    };

    /**
     * Backend search.
     */
    _search = (e) => {
        let filterBy = e.target.value;
        this.setState({ searchTerm: filterBy, rowCount: 0 });
        if (this.props.domain === "facility") {
            this.getDataAsync(this.nrowsPerQuery, 0, this.state.sortBy, this.state.sortDirection, filterBy, true);
        }
    };

    /**
     * Remove any filter (when click on the cross in the search field).
     */
    _resetSearch = () => {
        this.setState({ searchTerm: "" });
        if (this.props.domain === "facility") {
            this.getDataAsync(this.nrowsPerQuery, 0, this.state.sortBy, this.state.sortDirection, "", true);
        }
    };

    /**
     * RV infinite loader needs to know how to query the next rows on scroll.
     */
    loadMoreRows = ({ startIndex, stopIndex }) => {
        let dataLength = this.props.data.length;
        if (dataLength % this.nrowsPerQuery === 0) {
            console.info("Load more rows!", `${dataLength}-${dataLength + this.nrowsPerQuery}`);
            this.getDataAsync(this.nrowsPerQuery, dataLength, this.state.sortBy, this.state.sortDirection, this.state.searchTerm, false);
        } else {
            console.info(`End of data (at ${dataLength}).`)
        }
    };

    /**
     * RV infinite loader needs to know if a row is already in the current data, given an index.
     */
    isRowLoaded = ({ index }) => {
        return index < this.props.data.length;
    };

    /**
     * Construct an array of <Column>s from the columns definition.
     */
    getColumns = (width) => {
        let columnDefs;
        if (this.props.domain === "facility") {
            columnDefs = facilityDataColumns[this.props.table];
        }
        else if (this.props.domain === "admin") {
            columnDefs = adminColumns[this.props.table];
        }
        const ncols = columnDefs.length;
        const sharedColumnWidth = (width-70) / (ncols-1);  // except the ID column which is fixed at 70px

        return columnDefs.map( s => {
            let cellRenderer = (s.field === 'id') ? this._idColumnLink : s.cellRenderer;
            let columnWidth = (s.field === 'id') ? 70 : sharedColumnWidth;
            let node = <Column key={s}
                       label={s.headerName}
                       dataKey={s.field}
                       headerRenderer={this._headerRenderer}
                       width={columnWidth}
                       cellRenderer={cellRenderer}
                   />;
            return node;
        });
    };

    /**
     * RV: Return row[*index*] from *list*.
     */
    _getRow = (list, index) => {
        return list.size !== 0 ? list.get(index % list.size) : {};
    };

    /**
     * Format the ID column so that it contains a link to the update form.
     */
    _idColumnLink = (obj) => {
        return idColumnLink(this.props.domain, this.props.table, obj.cellData);
    };

    /**
     * Format the header of a Column so that it has the arrow indicating the direction of search.
     */
    _headerRenderer = ({ columnData, dataKey, disableSort, label, sortBy, sortDirection }) => {
        return (
            <div>
                {label}
                {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
            </div>
        );
    };

    /**
     * RV: Format the whole header row, given the array of Columns.
     */
    headerRowRenderer = ({ className, columns, style }) => {
        return (
            <div role="row" style={style} className={cx(className, css.RVheader)} >
                {columns}
            </div>
        );
    };

    /**
     * In admin forms, filter the whole data in memory.
     */
    localSearch = (list) => {
        if (this.state.searchTerm === "") {
            return list;
        } else {
            let term = this.state.searchTerm.toLowerCase();
            return list.filter(item => {
                return this.props.columns.find((col) => {
                    return (''+item.get(col.field)).toLowerCase().includes(term);
                });
            });
        }
    };


    render() {
        let sortBy = this.state.sortBy;
        let sortDirection = this.state.sortDirection;
        let rowCount = this.state.rowCount;
        let overscanRowCount = this.state.overscanRowCount;

        /* Define columns */
        let columnDefs = this.props.columns;
        if (!columnDefs) {
            throw new ReferenceError("No columns definition found for table "+ this.props.table);
        }

        /* Format data */
        let data = this.props.formatter ? this.props.formatter(this.props.data) : this.props.data;
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        checkData(data);
        let list = Immutable.fromJS(data);
        if (this.props.domain === "admin") {
            list = this.localSearch(list);
            list = sortImmutable(list, sortBy, sortDirection);
            rowCount = list.size;
        }
        const rowGetter = ({index}) => this._getRow(list, index);

        // Height that would take the table if all rows would be displayed. Still in use??
        let cssHeight = (this.gridHeight > (data.length + 1) * ROW_HEIGTH) ? (data.length + 1) * ROW_HEIGTH : this.gridHeight;

        //console.log("nrows:", this.state.rowCount);

        return (
            <div style={{width: '100%', height: '100%'}}>

                {/* Search field */}

                <div>
                    <div type="button" className={css.resetBtn} onClick={this._resetSearch}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                    </div>
                    <FormControl
                        type="text"
                        className={css.searchField}
                        placeholder="Search"
                        value={this.state.searchTerm}
                        onChange={this._search}
                    />
                </div>
                <div className="clearfix"/>

                {/* The table */}

                <div className={css.tableContainer} style={{height: cssHeight + 'px', width: '100%'}}>
                    <InfiniteLoader
                        isRowLoaded={this.isRowLoaded}
                        loadMoreRows={this.loadMoreRows}
                        rowCount={rowCount}
                        threshold={20}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <AutoSizer>
                                {({ height, width }) => (
                                    <Table
                                        ref={registerChild}
                                        width={width}
                                        height={height}
                                        headerClassName={css.headerColumn}
                                        headerHeight={this.headerHeight}
                                        headerRowRenderer={this.headerRowRenderer}
                                        noRowsRenderer={() => rowCount === 0 && <div style={{textAlign: 'center'}}>{"No data"}</div>}
                                        onRowsRendered={onRowsRendered}
                                        overscanRowCount={overscanRowCount}
                                        rowCount={rowCount}
                                        rowHeight={this.rowHeight}
                                        rowGetter={rowGetter}
                                        sort={this._sort}
                                        sortBy={sortBy}
                                        sortDirection={sortDirection}
                                    >
                                        {this.getColumns(width-50)}
                                    </Table>
                                )}
                            </AutoSizer>
                        )}
                    </InfiniteLoader>
                </div>
                <div style={{height: (this.gridHeight-cssHeight) + 'px', width: '100%'}} />

                {/* Loading spinner */}

                <DataLoadingIcon />

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


