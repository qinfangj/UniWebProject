"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import tablesCss from '../../tables.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tables from '../../tables.js';
import { ROW_HEIGTH } from '../../columns';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import { queryProjectsAsync } from '../../../actions/actionCreators/queryProjectsActionCreators';
import { assertIsArray } from '../../../../utils/common';

import { AgGridReact } from 'ag-grid-react';
import columns from '../columns';



class QueryProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.selectedSampleIds = "";
        this.queryType = "";
    }

    static propTypes = {
        queryType: PropTypes.string.isRequired,  // from router, see parent (route) component
        selectedSampleIds: PropTypes.object.isRequired,
        selectedProjectIds: PropTypes.object.isRequired,
        searchTerm: PropTypes.string,
        searched: PropTypes.object,
        samplesList: PropTypes.array,
    };

    /**
     * Return an array of the sample ids that will be put into the table.
     * If projects are selected, it fits what is displayed in the sample selection window.
     * If not, it reflects the searched terms.
     * If no filter is applied, returns an empty array.
     */
    getSelectedSampleIdsFromStore(props) {
        let sampleIds = props.selectedSampleIds;
        let projectIds = props.selectedProjectIds;
        let isSamplesSelected = sampleIds && (Object.keys(sampleIds).length !== 0);
        let isProjectsSelected = projectIds && (Object.keys(projectIds).length !== 0);
        let selectedSampleIds = [];
        /* If there is a samples selection, display these. */
        if (isSamplesSelected) {
            return Object.keys(sampleIds);
        }
        /* If there is no samples selection, there may be projects selected.
         * Use the secondaryOptionsList for this projects selection to have the same list of ids
         * as in the samples selection input. */
        else {
            if (isProjectsSelected) {
                let samples = props.samplesList;  // options list, array of samples [{id, name}, ..]
                if (samples) {
                    assertIsArray(samples, "getSelectedSampleIdsFromStore::samples");
                    selectedSampleIds = samples.map(v => v.id);
                }
            }
        }
        /* Check if there is a search by term */
        let term = props.searchTerm;
        let searched = props.searched;  // {projectIds(set), sampleIds(set)}
        if (term && term.length > 0 && searched && searched.projectIds) {
            let searchedSamples = searched.sampleIds;
            /* If there was something in the projects/samples selection above, filter the result by term */
            if (isSamplesSelected) {
                selectedSampleIds = sampleIds.filter(v => searchedSamples.has(v));
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
        return selectedSampleIds;
    }

    isUpdated(selectedSampleIds, queryType) {
        let samplesChanged = selectedSampleIds !== this.selectedSampleIds;
        let queryTypeChanged = queryType !== this.queryType;
        return samplesChanged || queryTypeChanged;
    }

    componentWillUpdate() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
    }
    componentDidUpdate() {
        this.api && this.api.sizeColumnsToFit();  // recalculate columns width to fill the space
    }

    /* If selected ids or query type have changed, query new data */
    componentWillReceiveProps(newProps) {
        let queryType = newProps.queryType;
        let selectedSampleIds = this.getSelectedSampleIdsFromStore(newProps);
        selectedSampleIds = selectedSampleIds.join(",");
        if (this.isUpdated(selectedSampleIds, queryType)) {
            this.selectedSampleIds = selectedSampleIds;
            this.queryType = queryType;
            if (selectedSampleIds.length > 0) {
                this.props.queryProjectsAsync(selectedSampleIds, queryType, queryType)
                .fail(() => console.error("queryProjectsAsync() failed to load data."));
            }
        }
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
        let data = this.props.tableData;
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        if (!columns[this.props.queryType]) {
            throw new ReferenceError("No columns definition found");
        }
        tables.checkData(data);
        data = this.formatData(data);
        let cssHeight = ((data.length + 1) * ROW_HEIGTH) + "px";
        return (
            <div style={{width: '100%', height: '100%'}}>
                {/* If no data, no table but fill the space */}

                <div className={cx("ag-bootstrap", tablesCss.agTableContainer)} style={{height: cssHeight, width: '100%'}}>
                    <AgGridReact
                        onGridReady={this.onGridReady.bind(this)}
                        rowData={data}
                        enableFilter={true}
                        enableSorting={true}
                        columnDefs={columns[this.props.queryType]}
                        rowHeight={ROW_HEIGTH}
                        headerHeight={ROW_HEIGTH}
                        overlayNoRowsTemplate='<span/>'
                    >
                    </AgGridReact>
                </div>

            </div>
        );
    }

}



QueryProjectsTable.defaultProps = {
    tableData: [],
    selectedSampleIds: {},
    selectedProjectIds: {},
    searchTerm: "",
    searched: {},
    samplesList: [],
};


const mapStateToProps = (state, ownProps) => {
    return {
        tableData: state.queryProjects.tableData,
        selectedSampleIds: state.queryProjects.sampleIds,  // object {id: true, ...}
        selectedProjectIds: state.queryProjects.projectIds,  // object {id: true, ...}
        searchTerm: state.queryProjects.searchTerm,
        searched: state.queryProjects[optionsStoreKeys.PROJECTS_AND_SAMPLES_SEARCHED_BY_TERM],  // {projectIds(set), sampleIds(set)}
        samplesList: state.queryProjects[optionsStoreKeys.SAMPLES_FOR_PROJECTS],  // options list, array of samples [{id, name}, ..]
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ queryProjectsAsync }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryProjectsTable);
