"use strict";
import React from 'react';
import tablesCss from '../tables.css';
import css from './queryProjectsTable.css';
import cx from 'classnames';
import store from '../../../core/store';
import * as tables from '../tables.js';
import * as constants from '../constants';
import dataStoreKeys from '../../constants/dataStoreKeys';
import { queryProjectsAsync } from '../../actions/actionCreators/queryProjectsActionCreators';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import columns from './columns';



class QueryProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.selectedSampleIds = this.getSelectedSampleIdsFromStore();
        this.state = {
            renderme: false,
            tableData: this.getTableDataFromStore(),
        };
    }

    static propTypes = {
        queryType: React.PropTypes.string.isRequired,  // from router, see parent (route) component
    };

    /**
     * Return an array of the sample ids that will be put into the table.
     * If projects are selected, it fits what is displayed in the sample selection window.
     * If not, it reflects the searched terms.
     * If no filter is applied, returns an empty array.
     */
    getSelectedSampleIdsFromStore() {
        let selectedSampleIds = store.getState().queryProjects.sampleIds;  // object {id: true, ...}

        /* If there is a samples selection, display these. */
        if (selectedSampleIds && Object.keys(selectedSampleIds).length !== 0) {
            return Object.keys(selectedSampleIds);
        }
        /* If there is no samples selection, there may be projects selected.
         * Use the secondaryOptionsList for this projects selection to have the same list of ids
         * as in the samples selection input. */
        else {
            let selectedProjectIds = store.getState().queryProjects.projectIds;  // object {id: true, ...}
            if (selectedProjectIds && Object.keys(selectedProjectIds).length !== 0) {
                let samples = store.getState().forms[dataStoreKeys.SAMPLES_FOR_PROJECTS];  // options list, array of samples [{id, name}, ..]
                if (samples) {
                    selectedSampleIds = samples.map(v => v.id);
                }
            }
        }
        /* Check if there is a search by term */
        let searched = store.getState().queryProjects[dataStoreKeys.PROJECTS_AND_SAMPLES_SEARCHED_BY_TERM];  // {projectIds(set), sampleIds(set)}
        if (searched && searched.projectIds) {
            let searchedSamples = searched.sampleIds;
            /* If there was something in the projects/samples selection above, filter the result by term */
            if (selectedSampleIds && Object.keys(selectedSampleIds).length !== 0) {
                selectedSampleIds = selectedSampleIds.filter(v => searchedSamples.has(v));
            }
            /* Otherwise, use the result of the search by term directly */
            else {
                selectedSampleIds = [...searchedSamples];
            }
        }
        /* If not yet available, wait for it (shortcut), because it this is the initial value */
        else {
            selectedSampleIds = [];
        }
        return selectedSampleIds || [];
    }

    getTableDataFromStore() {
        return store.getState().queryProjects[this.props.queryType] || [];
    }

    isUpdated(selectedSampleIds) {
        let samplesChanged = selectedSampleIds.join(",") !== this.selectedSampleIds.join(",");
        let queryTypeChanged = this.queryType !== this.props.queryType;
        return samplesChanged || queryTypeChanged;
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let tableData = this.getTableDataFromStore();
            let selectedSampleIds = this.getSelectedSampleIdsFromStore();
            /* Shortcut */
            if (! selectedSampleIds || selectedSampleIds.length === 0) {
                this.setState({ tabledata: [] });
            }
            /* If selected ids have changed, query new data */
            else if (this.isUpdated(selectedSampleIds)) {
                this.selectedSampleIds = selectedSampleIds;
                this.queryType = this.props.queryType;
                store.dispatch(queryProjectsAsync(selectedSampleIds, this.props.queryType, this.props.queryType))
                    .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
            }
            /* Otherwise, load the table data from store */
            else {
                this.setState({ tableData });
            }
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    componentWillUpdate() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
    }
    componentDidUpdate() {
        this.api && this.api.sizeColumnsToFit();  // recalculate columns width to fill the space
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
        console.debug(this.props.queryType)
        let data = this.state.tableData;
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        if (!columns[this.props.queryType]) {
            throw new ReferenceError("No columns definition found");
        }
        tables.checkData(data);
        data = this.formatData(data);
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


export default Dimensions()(QueryProjectsTable);