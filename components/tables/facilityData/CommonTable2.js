"use strict";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';
import Immutable from 'immutable'
import ReactDOM from 'react-dom';
import { Column, Table, AutoSizer, SortIndicator, SortDirection} from 'react-virtualized';
import '!!style!css!react-virtualized/styles.css'; // only needs to be imported once
import { Link } from 'react-router';

import styles from './Table2.css'
import adminColumns from '../../tables/adminData/columns';
import facilityDataColumns from '../../tables/facilityData/columns';
import { getTableDataAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import inputTypes from '../../forms/inputTypes';
import * as tables from '../tables.js';
import '../../../styles/colors.css';
import cx from 'classnames';
import { idColumnWithUpdateLink,ROW_HEIGTH, GRID_HEIGTH } from '../columns';
import css from '../tables.css';
import Feedback from '../../utils/Feedback';
import DataLoadingIcon from '../../utils/DataLoadingIcon';



class CommonTable2 extends React.PureComponent {

    // Table data as a array of objects
    constructor(props) {
        super(props);

        this.gridHeight = 400;
        this.nVisibleRows = (this.gridHeight / ROW_HEIGTH) - 1;
        this.nrowsPerQuery = 40;
        if (this.nrowsPerQuery < this.nVisibleRows) {
            console.warn("Must query at least as many rows as we can display to enable scrolling",
                `(${this.nrowsPerQuery} < ${this.nVisibleRows})`);
        }
        this.state = {
            searchValue: "",
        };

        this.state = {
            list: null,
            disableHeader: false,
            headerHeight: 30,
            height: 600,
            hideIndexRow: false,
            overscanRowCount: 10,
            rowHeight: 30,
            rowCount: 500,
            scrollToIndex: undefined,
            sortBy: 'id',
            sortDirection: SortDirection.ASC,

        };

        this._headerRenderer = this._headerRenderer.bind(this);
        //this._noRowsRenderer = this._noRowsRenderer.bind(this);
        //this._onRowCountChange = this._onRowCountChange.bind(this);
        //this._rowClassName = this._rowClassName.bind(this);
        this._sort = this._sort.bind(this);
        // this.handleScroll = this.handleScroll.bind(this);
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

    componentWillMount() {
        console.log("willMount");
        // Can try to cache that result, but do it properly so that for instance it still understands active or not
        this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly, this.nrowsPerQuery, 0, null, null)
            .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
    }

    // componentDidMount() {
    //     this.api && this.api.doLayout();  // recalculate layout to fill the container div
    //     this.api && this.api.sizeColumnsToFit();  // recalculate columnsKey width to fill the space
    // }
    //
    // componentWillUpdate() {
    //     this.api && this.api.doLayout();  // recalculate layout to fill the container div
    // }


    onSearch(e) {
        let value = e.target.value;
        this.api.setQuickFilter(value);
        this.setState({searchValue: value});
    }

    reset(){
        this.api.setQuickFilter("");
        this.setState({searchValue: ""});
    }


    getColumns(width, list){
        //let namesForColumns = facilityDataColumns[this.props.table];
        //console.log(this.props.domain);
        let namesForColumns;
        if (this.props.domain === "data") {
            namesForColumns = facilityDataColumns[this.props.table];
            console.log(namesForColumns);
        }
        else if (this.props.domain === "admin") {
            namesForColumns = adminColumns[this.props.table];
        }
        //console.log(namesForColumns);
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
                                   //cellDataGetter={
                                   //   ({ columnData, dataKey, rowData }) => {console.log(rowData.id)}
                                   //}
                                   disableSort= {false}
                    />;
                } else {
                    node = <Column key={s}
                                   label={s.headerName}
                                   dataKey={s.field}
                                   disableSort={false}
                                   //sortBy={this.state.sortBy}
                                   //sortDirection={this.state.sortDirection}
                                   headerRenderer={this._headerRenderer}
                                   width={columnWidth}

                    />;
                }


            return node
        });
        //let namesForColumns = Object.keys(data[0]);
        //  return namesForColumns.map( name => {
        //      return (
        //          <Column key={name}
        //              label={name}
        //              dataKey={name}
        //              width={columnWidth}
        //          />
        //      )
        //  })
     }


    // handleScroll(){
    //     // not a very nice way to make use of <b> tags in data
    //     let dom = ReactDOM.findDOMNode(this);
    //     let all = dom.getElementsByClassName('ReactVirtualized__Table__rowColumn');
    //     let texts = [].slice.call(all).filter( (text) => text.innerHTML.indexOf('&lt;') > -1);
    //     texts.map( (el) => {
    //         let text = el.innerHTML;
    //         let newText = text.replace(/&lt;b&gt;/g, '').replace(/&lt;\/b&gt;/g, '');
    //         el.innerHTML = newText;
    //         el.style.fontWeight = 'bold';
    //     })
    // }
    //
    // componentDidMount(){
    //     this.handleScroll();
    // }


    _getDatum (list, index) {
        return list.get(index % list.size)
    }

    _headerRenderer ({
        columnData,
        dataKey,
        disableSort,
        label,
        sortBy,
        sortDirection
    }) {
        return (
            <div>
                {label}
                {sortBy === dataKey &&
                <SortIndicator sortDirection={sortDirection} />
                }
            </div>
        )
    }

    // _noRowsRenderer () {
    //     return (
    //         <div className={styles.noRows}>
    //             No rows
    //         </div>
    //     )
    // }
    //
    // _rowClassName ({ index }) {
    //     if (index < 0) {
    //         return styles.headerRow
    //     } else {
    //         return index % 2 === 0 ? styles.evenRow : styles.oddRow
    //     }
    // }
    // //
    _sort ({ sortBy, sortDirection }) {
        console.log(sortBy);
        console.log(sortDirection);
        this.setState({ sortBy:sortBy});
        this.setState({sortDirection: sortDirection});

        console.log(this.state.sortBy);
        console.log(this.state.sortDirection);
    }

    _idColumnLink (obj){

         return (
             <div>
             <Link to = {`${this.props.domain}/${this.props.name}/update/${obj.cellData}`}>
                 {obj.cellData}
             </Link>
                 </div>
         )

    }

    headerRowRenderer = ({
        className,
        columns,
        style
    }) => {
        return(
        <div
            className={cx(className, styles.RVheader)}
            role='row'
            style={style}
        >
            {columns}
        </div>)

    };


// Render your table

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

        sortedList= list
                .sortBy(item => item.get(sortBy))
                .update(list =>
                    sortDirection === SortDirection.DESC
                        ? list.reverse()
                        : list
                );


            //: list;

        const rowGetter = ({index}) => this._getDatum(sortedList, index);


        const renderTable = ({height, width}) => {
            return (

                <Table
                    width={width}
                    height={height}
                    disableHeader={disableHeader}
                    headerClassName={styles.headerColumn}
                    headerHeight={headerHeight}
                    headerRowRenderer={this.headerRowRenderer}
                    rowHeight={ROW_HEIGTH}
                    noRowsRenderer={this._noRowsRenderer}
                    rowGetter={rowGetter}
                    //rowGetter={({index}) => data[index]}
                    rowCount={data.length}
                    sort={this._sort}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                >

                    {this.getColumns(width-40, list)}
                </Table>


            )
        };


        return (
            <div style={{width: '100%', height: '100%'}}>
                <div>
                    <div type="button" className={css.resetBtn} onClick={this.reset.bind(this)}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true" />
                    </div>
                    <FormControl type="text" className={css.searchField} placeholder="Search"
                                 value={this.state.searchValue}
                                 onChange={this.onSearch.bind(this)}
                    />
                </div>
                <div className="clearfix"/>

                { !this.props.form ? null :
                    <Feedback reference={this.props.form}/>
                }

                <div className={styles.AutoSizerContainer} style={{height: cssHeight + 'px', width: '100%'}}>
                    <AutoSizer>
                        {renderTable}
                    </AutoSizer>
                </div>
                 <div style={{height: (this.gridHeight-cssHeight) + 'px', width: '100%'}} ></div>

                 <DataLoadingIcon />


            </div>
        )


    }
}

CommonTable2.defaultProps = {
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
    return {
        getTableDataAsync: (table, storeKey, active, limit, offset, orderBy, orderDir) =>
            dispatch(getTableDataAsync(table, storeKey, active, limit, offset, orderBy, orderDir)),
    };
};

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(CommonTable2));

