"use strict";
import React from 'react';
import tablesCss from '../tables.css';
import css from './queryProjectsTable.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import * as tables from '../tables.js';
import * as constants from '../constants';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import queryProjectsStoreKeys from '../../constants/queryProjectsStoreKeys';
import { queryProjectsAsync } from '../../actions/actionCreators/queryProjectsActionCreators';
import { assertIsArray } from '../../../utils/common';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import columns from './columns';



class QueryRunsTable extends React.Component {
    constructor(props) {
        super(props);
        this.selectedSampleIds = "";
        this.queryType = "";
    }

    static propTypes = {
        queryType: React.PropTypes.string.isRequired,  // from router, see parent (route) component
    };

    componentWillUpdate() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
    }
    componentDidUpdate() {
        this.api && this.api.sizeColumnsToFit();  // recalculate columns width to fill the space
    }

    /* If selected ids or query type have changed, query new data */
    componentWillReceiveProps(newProps) {
        // let queryType = newProps.queryType;
        // let selectedSampleIds = this.getSelectedSampleIdsFromStore(newProps);
        // selectedSampleIds = selectedSampleIds.join(",");
        // if (this.isUpdated(selectedSampleIds, queryType)) {
        //     this.selectedSampleIds = selectedSampleIds;
        //     this.queryType = queryType;
        //     if (selectedSampleIds.length > 0) {
        //         this.props.queryProjectsAsync(selectedSampleIds, queryType)
        //         .fail(() => console.error("queryProjectsAsync() failed to load data."));
        //     }
        // }
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
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
        console.log(this.props.queryType)
        console.log(this.props.tableData)

        let data = this.props.tableData;
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        if (!columns[this.props.queryType]) {
            throw new ReferenceError("No columns definition found");
        }
        tables.checkData(data);
        //data = this.formatData(data);
        let cssHeight = ((data.length + 1) * constants.ROW_HEIGTH) + "px";
        return (
            <div style={{width: '100%', height: '100%'}}>
                {/* If no data, no table but fill the space */}

                <div className={cx("ag-bootstrap", css.agTableContainer)} style={{height: cssHeight, width: '100%'}}>
                    <AgGridReact
                        onGridReady={this.onGridReady.bind(this)}
                        rowData={data}
                        enableFilter={true}
                        enableSorting={true}
                        columnDefs={columns[this.props.queryType]}
                        rowHeight={constants.ROW_HEIGTH}
                        headerHeight={constants.ROW_HEIGTH}
                        overlayNoRowsTemplate='<span/>'
                    >
                    </AgGridReact>
                </div>

            </div>
        );
    }

}



QueryRunsTable.defaultProps = {
    tableData: [],
};


const mapStateToProps = (state) => {
    return {
        tableData: state.queryProjects[queryProjectsStoreKeys.QP_RUNS_TABLE_DATA],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        queryProjectsAsync: (selectedSampleIds, queryType) =>
            dispatch(queryProjectsAsync(selectedSampleIds, queryType, queryType)),
    };
};


export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(QueryRunsTable));
