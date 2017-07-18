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
import * as tables from './tables.js';
import { ROW_HEIGTH, GRID_HEIGTH } from './columns';

import Feedback from '../utils/Feedback';
import DataLoadingIcon from '../utils/DataLoadingIcon';
import FormControl from 'react-bootstrap/lib/FormControl';
import { Column, Table, AutoSizer, SortIndicator, SortDirection, InfiniteLoader} from 'react-virtualized';
import { Link } from 'react-router';



class CommonTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gridHeight = 400;
        this.nVisibleRows = (this.gridHeight / ROW_HEIGTH) - 1;
        if (this.props.domain === "facility" ) {
            this.nrowsPerQuery = 40;
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
            disableHeader: false,
            headerHeight: 35,
            height: 600,
            hideIndexRow: false,
            overscanRowCount: 10,
            rowHeight: 30,
            scrollToIndex: undefined,
            sortBy: 'id',
            sortDirection: SortDirection.DESC,
        };
        this._headerRenderer = this._headerRenderer.bind(this);
        this._sort = this._sort.bind(this);
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
        form: PropTypes.string,  // the name of the form it corresponds to, to show the feedback messages
    };

    getDataAsync(limit, offset, sortBy, sortDir, filterBy) {
        let _this = this;
        let dataLength = this.props.data.length;
        this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly,
            limit, offset,
            sortBy || this.state.sortBy, sortDir || this.state.sortDirection, filterBy || this.state.searchTerm)
        .done((data) => {
            // `data` is only the new block. The whole data is in `this.props.data`.
            if (data.length !==0) {
                let hasNextPage = data.length % this.nrowsPerQuery === 0;
                let newDataLength = dataLength + data.length;
                let rowCount = hasNextPage ? newDataLength + 1 : newDataLength;
                _this.setState({rowCount});
            } else {
                _this.setState({rowCount:0})

            }
        })
        .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
    }

    componentWillMount() {
        // Can try to cache that result, but do it properly so that for instance it still understands active or not
        this.getDataAsync(this.nrowsPerQuery, 0);
    }

    onSearch(e) {
        let value = e.target.value;
        this.setState({ searchTerm: value });
        if (this.props.domain === "facility") {
            this.getDataAsync(this.nrowsPerQuery, 0, null, null, value);
        } else if (this.props.domain === "admin") {
        
        }
    }

    //resetSearch function needs to be re-implemented
    resetSearch() {
        this.setState({searchTerm: ""});
    }

    loadMoreRows({ startIndex, stopIndex }) {
        let dataLength = this.props.data.length;
        if (dataLength % this.nrowsPerQuery === 0) {
            console.info("Load more rows!", `${dataLength}-${dataLength + this.nrowsPerQuery}`);
            this.getDataAsync(this.nrowsPerQuery, dataLength, this.state.sortBy, this.state.sortDirection, this.state.searchTerm);
        }
    }

    isRowLoaded({ index }) {
        return index < this.props.data.length;
    }

    getColumns(width, list){
        let namesForColumns;
        if (this.props.domain === "facility") {  
            namesForColumns = facilityDataColumns[this.props.table];
        }
        else if (this.props.domain === "admin") {
            namesForColumns = adminColumns[this.props.table];
        }
        const columnsNumber = namesForColumns.length;
        const columnWidth = (width-40) / (columnsNumber-1);

        /* This ahs nothing to do in this file. */
        return namesForColumns.map( s => {
            let node;
                if (s.field === 'id') {
                    node = <Column key={s}
                                   label={s.headerName}
                                   dataKey={s.field}
                                   width={40}
                                   cellRenderer={this._idColumnLink.bind(this)}
                                   disableSort= {false}
                    />;
                } else if (s.field === 'isValidated') {
                    node = <Column key={s}
                                   label={s.headerName}
                                   dataKey={s.field}
                                   cellRenderer={this._cellRenderer.bind(this)}
                                   width={columnWidth}
                                   disableSort= {false}
                    />;
                } else {
                    node = <Column key={s}
                                   label={s.headerName}
                                   dataKey={s.field}
                                   disableSort={false}
                                   headerRenderer={this._headerRenderer}
                                   width={columnWidth}
                    />;
                }
            return node
        });

     }

    _getRow (list, index) {
        return list.size !== 0 ? list.get(index % list.size) : {};
    }

    _headerRenderer ({ columnData, dataKey, disableSort, label, sortBy, sortDirection }) {
        return (
            <div>
                {label}
                {sortBy === dataKey &&
                    <SortIndicator sortDirection={sortDirection} />
                }
            </div>
        );
    }

    _cellRenderer({ cellData, columnData, dataKey, rowData, rowIndex }) {
        return cellData ?
            <i className="fa fa-check" aria-hidden="true"/> :
            <i className="fa fa-times" style={{color:'red'}} aria-hidden="true"/>;
    }

    _sort({ sortBy, sortDirection }) {
        if (this.props.domain === "facility") {
            this.getDataAsync(this.nrowsPerQuery, 0, sortBy, sortDirection);
        } else if (this.props.domain === "admin") {
            this.setState({ sortBy, sortDirection });
        }
    }

    _idColumnLink(obj) {
         return (
             <div>
                <Link to = {`${this.props.domain}/${this.props.name}/update/${obj.cellData}`}>
                    {obj.cellData}
                </Link>
             </div>
         );
    }

    headerRowRenderer = ({ className, columns, style }) => {
        return (
            <div
                className={cx(className, css.RVheader)}
                role='row'
                style={style}
            >
                {columns}
            </div>
        );
    };

    localSort(list) {
        return list
            .sortBy(item => item.get(this.state.sortBy))
            .update(list => (this.state.sortDirection === SortDirection.DESC) ? list.reverse() : list);
    }

    localSearch(list) {
        if (this.state.searchTerm === "") {
            return list;
        } else {
            return list.filter(item => {
                return this.props.columns.find((col) => {
                    return (''+item.get(col.field)).includes(this.state.searchTerm);
                });
            });
        }
    }


    render() {
        let data = this.props.formatter(this.props.data);
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        let columnDefs = this.props.columns;
        if (!columnDefs) {
            throw new ReferenceError("No columns definition found for table "+ this.props.table);
        }
        tables.checkData(data);

        let cssHeight;
        cssHeight = (this.gridHeight > (data.length + 1) * ROW_HEIGTH) ? (data.length + 1) * ROW_HEIGTH  : this.gridHeight;

        const {
            disableHeader,
            headerHeight,
            height,
            hideIndexRow,
            overscanRowCount,
            rowHeight,
            //scrollToIndex,
            sortBy,
            sortDirection,
            //useDynamicRowHeight
        } = this.state;

        let rowCount = this.state.rowCount;
        let list = Immutable.fromJS(data);
        console.log(columnDefs)
        if (this.props.domain === "admin") {
            list = this.localSort(this.localSearch(list));
            rowCount = list.size;
        }

        const rowGetter = ({index}) => this._getRow(list, index);
        //console.log("nrows:", this.state.rowCount);

        return (
            <div style={{width: '100%', height: '100%'}}>

                {/* Search field */}

                <div>
                    <div type="button" className={css.resetBtn} onClick={this.resetSearch.bind(this)}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                    </div>
                    <FormControl
                        type="text"
                        className={css.searchField}
                        placeholder="Search"
                        value={this.state.searchTerm}
                        onChange={this.onSearch.bind(this)}
                    />
                </div>
                <div className="clearfix"/>

                {/* Feedback */}

                { this.props.form &&
                    <Feedback reference={this.props.form}/>
                }

                {/* The table */}

                <div className={css.AutoSizerContainer} style={{height: cssHeight + 'px', width: '100%'}}>
                    <InfiniteLoader isRowLoaded={this.isRowLoaded.bind(this)}
                                    loadMoreRows={this.loadMoreRows.bind(this)}
                                    rowCount={rowCount}
                                    threshold={10}>
                        {({ onRowsRendered, registerChild }) => (
                            <AutoSizer>
                                {({ height, width }) => (
                                        <Table
                                            ref={registerChild}
                                            width={width}
                                            height={height}
                                            disableHeader={disableHeader}
                                            headerClassName={css.headerColumn}
                                            headerHeight={headerHeight}
                                            headerRowRenderer={this.headerRowRenderer}
                                            rowHeight={ROW_HEIGTH}
                                            onRowsRendered={onRowsRendered}
                                            noRowsRenderer={() => rowCount !== 0 ? null : <div style={{textAlign: 'center'}}>{"No data"}</div>}
                                            rowGetter={rowGetter}
                                            rowCount={rowCount}
                                            sort={this._sort}
                                            sortBy={sortBy}
                                            sortDirection={sortDirection}
                                        >
                                            {this.getColumns(width-50, list)}
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


