import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import tablesCss from '../tables.css';
import css from './queryProjectsTable.css';
import cx from 'classnames';
import store from '../../../core/store';
import * as tables from '../tables.js';
import { queryProjectsAsync } from '../../actions/actionCreators/queryProjectsActionCreators';
import * as constants from '../constants';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import columns from './columns';

import * as forms from '../../forms/forms';
import formStoreKeys from '../../constants/formStoreKeys';
import dataStoreKeys from '../../constants/dataStoreKeys';



class QueryProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            renderme: false,
            tableData: this.getTableDataFromStore(),
            columnsKey: this.getQueryTypeFromStore(),
        };
        this.selectedSampleIds = this.getSelectedSampleIdsFromStore();
        this.queryType = this.getQueryTypeFromStore();
        this.dataStoreKey = this.queryType;
    }

    /**
     * Return an array of the sample ids that will be put into the table.
     * If projects are selected, it fits what is displayed in the sample selection window.
     * If not, it reflects the searched terms.
     * If no filter is applied, returns an empty array.
     */
    getSelectedSampleIdsFromStore() {
        let samples = store.getState().async[dataStoreKeys.SAMPLES_FOR_PROJECTS] || [];
        let searchedSamples = store.getState().async[dataStoreKeys.SAMPLES_BY_TERM];
        if (searchedSamples) {
            console.debug(2, samples, searchedSamples)
            samples = samples.filter(v => searchedSamples.sampleIds.has(v.id));
        }
        console.debug(3, samples)



        let formKey = formStoreKeys.QUERY_PROJECTS_FORM;
        let samplesKey = formKey + formStoreKeys.suffixes.SAMPLES;
        let projectsKey = formKey + formStoreKeys.suffixes.PROJECTS;
        let selectedProjectIds = forms.getFormValue(formKey, projectsKey);
        let selectedSampleIds = forms.getFormValue(formKey, samplesKey);
        console.debug(1, selectedProjectIds, selectedSampleIds)
        // if (!selectedProjectIds || selectedProjectIds.length === 0 || (-1 in selectedProjectIds)) {
        //     selectedSampleIds = {};
        // }
        // If no sample selected, load all samples for the selected projects
        if (!selectedSampleIds || selectedSampleIds.length === 0) {
            selectedSampleIds = this.getListedSamplesFromStore();
        }
        selectedSampleIds = Object.keys(selectedSampleIds);
        console.debug(1, selectedProjectIds, selectedSampleIds)
        return selectedSampleIds;
    }

    /**
     * Return the array of sample options that appear in the list
     *  (corresponding to the selected projects).
     * Format the result in the same way as for `selectedSampleIds` ([{id: true}, ...]).
     */
    getListedSamplesFromStore() {
        let list;
        let formatted = {};
        let forProjects = store.getState().async[dataStoreKeys.SAMPLES_FOR_PROJECTS];
        let searched = store.getState().async[dataStoreKeys.SAMPLES_BY_TERM];
        // Searched by term
        if (searched && searched.sampleIds) {
            // A project is selected
            if (forProjects) {
                list = forProjects.filter(v => searched.sampleIds.has(v.id));
                for (let option of list) {
                    formatted[option.id] = true;
                }
            // No project selected, take all
            } else {
                list = [... searched.sampleIds];
                for (let option of list) {
                    formatted[option] = true;
                }
            }
        // No search
        } else {
            list = forProjects || [];
            for (let option of list) {
                formatted[option.id] = true;
            }
        }
        return formatted;
    }

    getTableDataFromStore() {
        return store.getState().async[this.dataStoreKey] || [];
    }

    getQueryTypeFromStore() {
        return store.getState().common.queryProjectsType;
    }

    isUpdated(queryType, selectedSampleIds) {
    console.debug(selectedSampleIds, this.selectedSampleIds)
        if (! queryType) {
            return false;
        } else if (queryType !== this.queryType) {
            return true;
        } else if (selectedSampleIds.join(",") !== this.selectedSampleIds.join(",")) {
            return true;
        } else {
            return false;
        }
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let tableData = this.getTableDataFromStore();
            let selectedSampleIds = this.getSelectedSampleIdsFromStore();
            let queryType = this.getQueryTypeFromStore();
            /* Shortcut */
            if (! selectedSampleIds || selectedSampleIds.length === 0) {
                this.setState({ tabledata: [], columnsKey: queryType });
            }
            /* If selected ids have changed, query new data */
            else if (this.isUpdated(queryType, selectedSampleIds)) {
                this.selectedSampleIds = selectedSampleIds;
                this.queryType = queryType;
                store.dispatch(queryProjectsAsync(selectedSampleIds, queryType, this.dataStoreKey))
                .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
            }
            /* Otherwise, load the table data from store */
            else {
                this.setState({ tableData, columnsKey: queryType });
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
        this.api && this.api.sizeColumnsToFit();  // recalculate columnsKey width to fill the space
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    formatData(data, queryType) {
        let L = data.length;
        for (let i=0; i < L; i++) {
            let d = data[i];
            d.submitter = (d.submitter_first_name + d.submitter_last_name) || "";
        }
        return data;
    }

    render() {
        let data = this.state.tableData;
        //console.debug(data)
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        if (!columns[this.state.columnsKey]) {
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
                        columnDefs={columns[this.state.columnsKey]}
                        rowHeight={constants.ROW_HEIGTH}
                    >
                    </AgGridReact>
                </div>

                {/* Show number of rows in result */}

                {/* data.length === 0 ? null :
                    <tables.Nrows data={data} />
                */}

            </div>
        );
    }

}


export default Dimensions()(QueryProjectsTable);