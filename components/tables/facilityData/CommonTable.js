"use strict";
import React from 'react';
import { connect } from 'react-redux';
import css from '../tables.css';
import cx from 'classnames';
import * as tables from '../tables.js';
import * as constants from '../constants';
import { getTableDataAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import _ from 'lodash';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';
import columns from '../columns';
import SubmissionFeedback from '../../forms/SubmissionFeedback';
import DataLoadingIcon from '../../../utils/DataLoadingIcon';


/**
 * The Ag-grid table used in most data display pages.
 */
class CommonTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.gridHeight = 400;
        this.nVisibleRows = (this.gridHeight / constants.ROW_HEIGTH) - 1;
        this.nrowsPerQuery = 40;
        if (this.nrowsPerQuery < this.nVisibleRows) {
            console.warn("Must query at least as many rows as we can display to enable scrolling",
                         `${this.nrowsPerQuery} < ${this.nVisibleRows}`);
        }
        this.state = {
            searchValue: "",
        };
    }

    static propTypes = {
        dataStoreKey: React.PropTypes.string.isRequired,  // store key for the table data (in "async")
        columnsKey: React.PropTypes.string.isRequired,  // key in the columns definition dict
        table: React.PropTypes.string.isRequired,  // database table name - to fetch the content
        activeOnly: React.PropTypes.bool,  // whether it should call ?active=true when fetching the content
        data: React.PropTypes.array,  // the table content (an array of row objects)
        showLoading: React.PropTypes.bool,  // loading spinner
        formatter: React.PropTypes.func,  // to reformat the data so that it fits the columns definition
        form: React.PropTypes.string,  // the name of the form it corresponds to, to show the feedback messages
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

    componentDidMount() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
        this.api && this.api.sizeColumnsToFit();  // recalculate columnsKey width to fill the space
        //this.columnApi && this.columnApi.autoSizeColumns(["ID"]);  // recalculate columnsKey width to fill the content
        // this.api.addRenderedRowListener('renderedRowRemoved', rowIndex, callback)
    }

    /**
     * Need to update columnsKey width here, just before rendering, and not in `onGridReady`
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
        //this.api.setDatasource(this._createDataSource());
    }

    onSearch(e) {
        let value = e.target.value;
        this.api.setQuickFilter(value);
        this.setState({searchValue: value});
    }

    // /* Because onScrollEnd only knows startPixel and endPixel, and refers to the first displayed row,
    //  it is not trival to recover the currend row index, even knowing the row height. So we record the
    //  row index in rowGetter and use it here. */
    // _onScrollEnd() {
    //     var nVariants = VariantStore.size();
    //     var rowIndex = this.rowIndex;
    //     if (!VariantStore.isLoadingNextRowBatch() && !VariantStore.noMoreVariantsToLoad()
    //         && nVariants > 0 && rowIndex+1 === nVariants) {
    //         VariantActions.loadNextRowBatch(Api.getDb(), nVariants, Api.variantUrlArgs());
    //     }
    // }

    // _createDataSource() {
    //     let _this = this;
    //     console.debug("init data source")
    //     return {
    //         rowCount: null, // behave as infinite scroll
    //         getRows: function (params) {
    //             console.log('asking for ' + params.startRow + ' to ' + params.endRow);
    //             _this.props.getTableDataAsync(_this.props.table, _this.props.dataStoreKey, _this.props.activeOnly,
    //                 params.endRow - params.startRow, params.startRow, null, null)
    //             .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."))
    //             .done((data) => {
    //                 // It will only continue fetching if lastRow == -1
    //                 let lastRow = -1;
    //                 if (data.length <= params.endRow) {
    //                     lastRow = data.length;
    //                 }
    //                 params.successCallback(data, lastRow);
    //             }, 500);
    //         }
    //     };
    // };

    onScroll(e) {
        let _this = this;
        let nodes = this.api.getRenderedNodes();
        let dataLength = this.props.data.length;
        let lastRowIndex = parseInt(nodes[nodes.length-1].id);
        let threshold = dataLength - 10;
        //console.debug(nodes.length, nodes[0].id, nodes[nodes.length-1].id, [threshold, lastRowIndex + 1], this.wait)
        if (!this.wait && lastRowIndex > threshold) {
            /* Lock until the current query is done */
            this.wait = true;
            console.info("Load more rows!", `${dataLength}-${dataLength + this.nrowsPerQuery}`)
            _this.props.getTableDataAsync(_this.props.table, _this.props.dataStoreKey, _this.props.activeOnly,
                dataLength + this.nrowsPerQuery, dataLength, null, null)
            .done(() => {
                /* Unlock, unless if no more data to load */
                this.wait = this.props.allLoaded;
            });
        }
    }


    render() {
        let data = this.props.formatter(this.props.data);
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        if (!columns[this.props.columnsKey]) {
            throw new ReferenceError("No columns definition found for table "+ this.props.table);
        }
        tables.checkData(data);

        //let cssHeight = (Math.max(constants.GRID_HEIGTH, (data.length + 1) * constants.ROW_HEIGTH)) + "px";

        return (
            <div style={{width: '100%', height: '100%'}}>
                <FormControl type="text" placeholder="Search" className={css.searchField}
                    value={this.state.searchValue}
                    onChange={this.onSearch.bind(this)}
                />
                <div className="clearfix"/>

                { !this.props.form ? null :
                    <SubmissionFeedback form={this.props.form}/>
                }

                {/* If no data, no table but fill the space */}
                { data.length > 0 ?
                    <div className={cx("ag-bootstrap", css.agTableContainer)} style={{height: this.gridHeight+'px', width: '100%'}}>
                        <AgGridReact
                            onGridReady={this.onGridReady.bind(this)}
                            rowData={data}
                            enableFilter={true}
                            enableSorting={true}
                            columnDefs={columns[this.props.columnsKey]}
                            rowHeight={constants.ROW_HEIGTH}
                            headerHeight={constants.ROW_HEIGTH}
                            overlayNoRowsTemplate='<span/>'
                            onBodyScroll={_.throttle(this.onScroll.bind(this), 100)}
                        >
                        </AgGridReact>
                    </div>
                :
                    <div style={{height: this.gridHeight+'px', width: '100%'}}/>
                }

                <DataLoadingIcon />

                {/* Show number of rows in result */}

                { data.length === 0 ? null :
                    <tables.Nrows data={data}/>
                }

            </div>
        );
    }
}


CommonTable.defaultProps = {
    activeOnly: false,
    data: [],
    showLoading: false,
    formatter: (data) => data,
};

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.facilityData[ownProps.dataStoreKey].data,
        allLoaded: state.facilityData[ownProps.dataStoreKey].allLoaded,
        showLoading: state.facilityData.showLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTableDataAsync: (table, storeKey, active, limit, offset, orderBy, orderDir) =>
            dispatch(getTableDataAsync(table, storeKey, active, limit, offset, orderBy, orderDir)),
    };
};

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(CommonTable));

