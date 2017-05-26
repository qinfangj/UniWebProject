"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from '../tables.css';
import cx from 'classnames';
import * as tables from '../tables.js';
import { getTableDataAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import _ from 'lodash';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';

import { defaultHeaderRenderer, ROW_HEIGTH, GRID_HEIGTH } from '../columns';
import Feedback from '../../utils/Feedback';
import DataLoadingIcon from '../../utils/DataLoadingIcon';



/**
 * The Ag-grid table used in most data display pages.
 */
class CommonTable extends React.PureComponent {
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
    }

    static propTypes = {
        dataStoreKey: PropTypes.string.isRequired,  // store key for the table data (in "async")
        columns: PropTypes.array.isRequired, // Ag-grid columsn definition
        table: PropTypes.string.isRequired,  // database table name - to fetch the content
        activeOnly: PropTypes.bool,  // whether it should call ?active=true when fetching the content
        data: PropTypes.array,  // the table content (an array of row objects)
        isLoading: PropTypes.bool,  // loading spinner
        formatter: PropTypes.func,  // to reformat the data so that it fits the columns definition
        form: PropTypes.string,  // the name of the form it corresponds to, to show the feedback messages
    };

    componentWillMount() {
        /* If data is already in store, use that one. Otherwise, call backend API. */
        let data = this.props.data;
        if (data && data.length > 0) {
            this.setState({ data });
        } else {
            this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly, this.nrowsPerQuery, 0, null, null)
            .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
        }
    }

    componentWillUnmount() {
        /* Clear additional data pages from infinite scrolling */
        // ...
    }

    componentDidMount() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
        this.api && this.api.sizeColumnsToFit();  // recalculate columnsKey width to fill the space
        //this.columnApi && this.columnApi.autoSizeColumns(["ID"]);  // recalculate columnsKey width to fill the content
        // this.api.addRenderedRowListener('renderedRowRemoved', rowIndex, callback)
    }

    /**
     * Need to update columns width here, just before rendering, and not in `onGridReady`
     * as the docs suggest, because `onGridReady` happens before data arrives
     * and container sizes change in unpredictable manner.
     */
    componentWillUpdate() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
    }

    componentDidUpdate() {
        this.api && this.api.sizeColumnsToFit();  // recalculate columnsKey width to fill the space
        //this.columnApi && this.columnApi.autoSizeColumns(["ID"]);  // recalculate columnsKey width to fill the content
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    onSearch(e) {
        let value = e.target.value;
        this.api.setQuickFilter(value);
        this.setState({searchValue: value});
    }

    reset(){
        this.api.setQuickFilter("");
        this.setState({searchValue: ""});
    }

    onScroll() {
        let nodes = this.api.getRenderedNodes();
        let dataLength = this.props.data.length;
        let lastRowIndex = parseInt(nodes[nodes.length-1].id);
        let threshold = dataLength - 10;
        //console.debug(nodes.length, nodes[0].id, nodes[nodes.length-1].id, [threshold, lastRowIndex + 1], this.wait)
        /* If past the threshold, query the next batch of rows. Lock until the current query is done. */
        if (!this.props.isLoading && !this.props.allLoaded && lastRowIndex > threshold) {
            console.info("Load more rows!", `${dataLength}-${dataLength + this.nrowsPerQuery}`);
            let limit = dataLength + this.nrowsPerQuery;
            let offset = dataLength;
            this.props.getTableDataAsync(this.props.table, this.props.dataStoreKey, this.props.activeOnly,
                limit, offset, null, null);
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

        //let cssHeight = (Math.max(GRID_HEIGTH, (data.length + 1) * ROW_HEIGTH)) + "px";

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

                <div className={cx("ag-bootstrap", css.agTableContainer)} style={{height: this.gridHeight+'px', width: '100%'}}>
                    <AgGridReact
                        onGridReady={this.onGridReady.bind(this)}
                        rowData={data}
                        enableFilter={true}
                        enableSorting={true}
                        columnDefs={columnDefs}
                        rowHeight={ROW_HEIGTH}
                        headerHeight={ROW_HEIGTH}
                        overlayNoRowsTemplate='<span/>'
                        onBodyScroll={_.debounce(this.onScroll.bind(this), 100)}
                        defaultColDef={{
                          headerCellRenderer: defaultHeaderRenderer,
                        }}
                    >
                    </AgGridReact>
                </div>

                <DataLoadingIcon />

            </div>
        );
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
    return {
        getTableDataAsync: (table, storeKey, active, limit, offset, orderBy, orderDir) =>
            dispatch(getTableDataAsync(table, storeKey, active, limit, offset, orderBy, orderDir)),
    };
};

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(CommonTable));

