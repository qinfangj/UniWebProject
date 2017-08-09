"use strict";
import React from 'react';
import PropTypes from 'prop-types'
import css from './tables.css';
import Immutable from 'immutable'
import * as tables from './tables.js';

import DataLoadingIcon from '../utils/DataLoadingIcon';
import FormControl from 'react-bootstrap/lib/FormControl';
import { Column, Table, AutoSizer, SortDirection, InfiniteLoader} from 'react-virtualized';



class AsyncTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.nrowsPerQuery = 100;
        this.gridHeight = tables.GRID_HEIGTH;
        this.rowHeight = tables.ROW_HEIGTH;
        this.nVisibleRows = (this.gridHeight / this.rowHeight) - 1;
        this.headerHeight = 35;
        this.overscanRowCount = 10;  // "Number of rows to render above/below the visible bounds of the list"
        this.useDynamicRowHeight = false;
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
        getDataAsync: PropTypes.func.isRequired,  // how to get more data
        data: PropTypes.array.isRequired,  // the table content (an array of row objects)
        columns: PropTypes.array.isRequired, // columns definition
        getColumns: PropTypes.func,  // how to create the <Columns> based on the columns definition object
        formatter: PropTypes.func,  // to reformat the data so that it fits the columns definition
        sortBy: PropTypes.string,
        sortDirection: PropTypes.string,
        sortAsync: PropTypes.bool,
        filterAsync: PropTypes.bool,
    };

    /** Fetch a page of data from backend. */
    getDataAsync = (limit, offset, sortBy, sortDir, filterBy, reset) => {
        let _this = this;
        let dataLength = reset ? 0 : this.props.data.length;
        this.props.getDataAsync(limit, offset, sortBy, sortDir, filterBy)
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
    };
    
    componentWillMount() {
        // Can try to cache that result, but do it properly so that for instance it still understands active or not
        this.getDataAsync(this.nrowsPerQuery, 0);
    }

    /** Backend sort. */
    _sort = ({ sortBy, sortDirection }) => {
        this.setState({ sortBy, sortDirection, rowCount: 0 });
        if (this.props.sortAsync) {
            this.getDataAsync(this.nrowsPerQuery, 0, sortBy, sortDirection, this.state.searchTerm, true);
        }
    };

    /** Backend search. */
    _search = (e) => {
        let filterBy = e.target.value;
        this.setState({ searchTerm: filterBy, rowCount: 0 });
        if (this.props.filterAsync) {
            this.getDataAsync(this.nrowsPerQuery, 0, this.state.sortBy, this.state.sortDirection, filterBy, true);
        }
    };

    /** Remove any filter (when click on the cross in the search field). */
    _resetSearch = () => {
        this.setState({ searchTerm: "" });
        if (this.props.filterAsync) {
            this.getDataAsync(this.nrowsPerQuery, 0, this.state.sortBy, this.state.sortDirection, "", true);
        }
    };

    /** RV infinite loader needs to know if a row is already in the current data, given an index. */
    isRowLoaded = ({ index }) => {
        return index < this.props.data.length;
    };

    /** RV infinite loader needs to know how to query the next rows on scroll. */
    loadMoreRows = ({ startIndex, stopIndex }) => {
        let dataLength = this.props.data.length;
        if (dataLength % this.nrowsPerQuery === 0) {
            console.info("Load more rows!", `${dataLength}-${dataLength + this.nrowsPerQuery}`);
            this.getDataAsync(this.nrowsPerQuery, dataLength, this.state.sortBy, this.state.sortDirection, this.state.searchTerm, false);
        } else {
            console.info(`End of data (at ${dataLength}).`)
        }
    };

    /** Construct an array of <Column>s from the columns definition. */
    getColumns = (width) => {
        let columnDefs = this.props.columns;
        const ncols = columnDefs.length;
        const sharedColumnWidth = (width-70) / (ncols-1);  // except the ID column which is fixed at 70px
        let _idColumnLink = (obj) => tables.idColumnLink(this.props.domain, this.props.table, obj.cellData);
        return columnDefs.map( s => {
            let cellRenderer = (s.field === 'id') ? _idColumnLink : s.cellRenderer;
            let columnWidth = (s.field === 'id') ? 70 : sharedColumnWidth;
            let node = <Column key={s}
                       label={s.headerName}
                       dataKey={s.field}
                       headerRenderer={tables._headerRenderer}
                       width={columnWidth}
                       cellRenderer={cellRenderer}
                   />;
            return node;
        });
    };

    render() {
        let sortBy = this.state.sortBy;
        let sortDirection = this.state.sortDirection;
        let rowCount = this.state.rowCount;
        let overscanRowCount = this.overscanRowCount;

        /* Format data */
        let data = this.props.formatter ? this.props.formatter(this.props.data) : this.props.data;
        tables.checkData(data);
        let list = Immutable.fromJS(data);
        if (! this.props.filterAsync) {
            list = tables.localSearch(list, this.state.searchTerm, this.props.columns);
            rowCount = list.size;
        }
        if (! this.props.sortAsync) {
            list = tables.sortImmutable(list, sortBy, sortDirection);
            rowCount = list.size;
        }
        const rowGetter = ({index}) => tables._getRow(list, index);
        const getColumns = this.props.getColumns || this.getColumns;

        // Height that would take the table if all rows would be displayed. Still in use??
        let cssHeight = (this.gridHeight > (data.length + 1) * tables.ROW_HEIGTH) ? (data.length + 1) * tables.ROW_HEIGTH : this.gridHeight;

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
                                        headerRowRenderer={tables.headerRowRenderer}
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
                                        {getColumns(width-50, this.props.columns)}
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


AsyncTable.defaultProps = {
    sortAsync: true,
    filterAsync: true,
    data: [],
    //isLoading: false,
    formatter: (data) => data,
};


export default AsyncTable;
