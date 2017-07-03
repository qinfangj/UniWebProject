"use strict";
import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import Immutable from 'immutable'
import { Column, Table, AutoSizer, SortIndicator, SortDirection, InfiniteLoader} from 'react-virtualized';
import { Link } from 'react-router';

import styles from './Table2.css'
import adminColumns from '../../tables/adminData/columns';
import facilityDataColumns from '../../tables/facilityData/columns';
import { getTableDataAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import * as tables from '../tables.js';
import '../../../styles/colors.css';
import cx from 'classnames';
import { ROW_HEIGTH, GRID_HEIGTH } from '../columns';
import css from '../tables.css';
import Feedback from '../../utils/Feedback';
import DataLoadingIcon from '../../utils/DataLoadingIcon';


class CommonTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gridHeight = 400;
        this.nVisibleRows = (this.gridHeight / ROW_HEIGTH) - 1;
        if (this.props.domain ==="data" ) {
            this.nrowsPerQuery = 40;
        } else {
            this.nrowsPerQuery = 10000000;
        }
        if (this.nrowsPerQuery < this.nVisibleRows) {
            console.warn("Must query at least as many rows as we can display to enable scrolling",
                `(${this.nrowsPerQuery} < ${this.nVisibleRows})`);
        }
        this.state = {
            searchValue: "",
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
        columns: PropTypes.array.isRequired, // Ag-grid columsn definition
        table: PropTypes.string.isRequired,  // database table name - to fetch the content
        name: PropTypes.string.isRequired,
        domain: PropTypes.string.isRequired,
        activeOnly: PropTypes.bool,  // whether it should call ?active=true when fetching the content
        data: PropTypes.array,  // the table content (an array of row objects)
        isLoading: PropTypes.bool,  // loading spinner
        formatter: PropTypes.func,  // to reformat the data so that it fits the columns definition
        form: PropTypes.string,  // the name of the form it corresponds to, to show the feedback messages
    };

    getDataAsync(limit, offset, sortBy, sortDir) {
        let _this = this;
        let dataLength = this.props.data.length;
        this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly,
            limit, offset,
            sortBy || this.state.sortBy, sortDir || this.state.sortDirection)
        .done((data) => {
            // `data` is only the new block. The whole data is in `this.props.data`.
            let hasNextPage = data.length % this.nrowsPerQuery === 0;
            let newDataLength = dataLength + data.length;
            let rowCount = hasNextPage ? newDataLength + 1 : newDataLength;
            _this.setState({ rowCount });
        })
        .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
    }

    componentWillMount() {
        // Can try to cache that result, but do it properly so that for instance it still understands active or not
        this.getDataAsync(this.nrowsPerQuery, 0);
    }

    //onSearch function needs to be re-implemented
    onSearch(e) {
        let value = e.target.value;
        // this.setState({searchValue: value});
    }

    //reset function needs to be re-implemented
    reset(){
        this.setState({searchValue: ""});
    }

    loadMoreRows({ startIndex, stopIndex }) {
        let dataLength = this.props.data.length;
        if (dataLength % this.nrowsPerQuery === 0) {
            console.info("Load more rows!", `${dataLength}-${dataLength + this.nrowsPerQuery}`);
            this.getDataAsync(this.nrowsPerQuery, dataLength);
        }
    }

    isRowLoaded({ index }) {
        return index < this.props.data.length;
    }

    // Empty the list and set row count to 1 to enable infinite scroll
    // I think we should reset memoizer here.
    resetList() {
        this.setState({list: [], rowCount: 1});
    }

    getColumns(width, list){
        let namesForColumns;
        if (this.props.domain === "data") {
            namesForColumns = facilityDataColumns[this.props.table];
        }
        else if (this.props.domain === "admin") {
            namesForColumns = adminColumns[this.props.table];
        }
        const columnsNumber = namesForColumns.length;
        const columnWidth = (width-40) / (columnsNumber-1);

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
                } else if (s.field === 'isvalidated') {
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

    _getDatum (list, index) {
        return list.get(index % list.size)
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
        if (this.props.domain === "data") {

            this.getDataAsync(this.nrowsPerQuery, 0, sortBy, sortDirection);
        }
        this.setState({sortBy:sortBy, sortDirection:sortDirection});

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
                className={cx(className, styles.RVheader)}
                role='row'
                style={style}
            >
                {columns}
            </div>
        );
    };


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
            rowCount,
            //scrollToIndex,
            sortBy,
            sortDirection,
            //useDynamicRowHeight
        } = this.state;

        let list = Immutable.fromJS(data);
        let sortedList;
        sortedList = list
            .sortBy(item => item.get(sortBy))
            .update(list =>
                sortDirection === SortDirection.DESC
                    ? list.reverse() : list
            );

        const rowGetter = ({index}) => this._getDatum(sortedList, index);

        return (
            <div style={{width: '100%', height: '100%'}}>

                {/* Search field */}

                <div>
                    <div type="button" className={css.resetBtn} onClick={this.reset.bind(this)}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                    </div>
                    <FormControl
                        type="text"
                        className={css.searchField}
                        placeholder="Search"
                        value={this.state.searchValue}
                        onChange={this.onSearch.bind(this)}
                    />
                </div>
                <div className="clearfix"/>

                {/* Feedback */}

                { this.props.form &&
                    <Feedback reference={this.props.form}/>
                }

                {/* The table */}

                <div className={styles.AutoSizerContainer} style={{height: cssHeight + 'px', width: '100%'}}>
                    <InfiniteLoader isRowLoaded={this.isRowLoaded.bind(this)}
                                    loadMoreRows={this.loadMoreRows.bind(this)}
                                    rowCount={this.state.rowCount}
                                    threshold={10}>
                        {({ onRowsRendered, registerChild }) => (
                            <AutoSizer>
                                {({ height, width }) => (
                                        <Table
                                            ref={registerChild}
                                            width={width}
                                            height={height}
                                            disableHeader={disableHeader}
                                            headerClassName={styles.headerColumn}
                                            headerHeight={headerHeight}
                                            headerRowRenderer={this.headerRowRenderer}
                                            rowHeight={ROW_HEIGTH}
                                            onRowsRendered={onRowsRendered}
                                            noRowsRenderer={() => this.props.isLoading ? null : <div style={{textAlign: 'center'}}>{"No data"}</div>}
                                            rowGetter={rowGetter}
                                            rowCount={this.state.rowCount}
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


