import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import tablesCss from '../tables.css';
import css from './queryProjectsTable.css';
import cx from 'classnames';
import store from '../../../core/store';
import * as tables from '../tables.js';
import * as actions from '../../actions/actionCreators/asyncActionCreators';
import * as constants from '../constants';
import _ from 'lodash';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';
import columns from './columns';

import formStoreKeys from '../../constants/formStoreKeys';
import dataStoreKeys from '../../constants/dataStoreKeys';
import * as forms from '../../forms/forms';



class QueryProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            renderme: false,
            tableData: this.getTableDataFromStore(),
        };
        this.selectedSampleIds = this.getSelectedSampleIds();  // not in store, because
        this.dataStoreKey = dataStoreKeys.STARTING_MATERIAL_INFO;
        this.columnsKey = "queryProjects";
    }

    /**
     * Return an array of the selected sample ids;
     */
    getSelectedSampleIds() {
        let selectedSampleIds;
        let formKey = formStoreKeys.QUERY_PROJECTS_FORM;
        let samplesKey = formKey + formStoreKeys.suffixes.SAMPLES;
        selectedSampleIds = forms.getFormValue(formKey, samplesKey);
        selectedSampleIds = selectedSampleIds ? Object.keys(selectedSampleIds) : [];
        return selectedSampleIds;
    }

    getTableDataFromStore() {
        return store.getState().async[this.dataStoreKey] || [];
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let tableData = this.getTableDataFromStore();
            let selectedSampleIds = this.getSelectedSampleIds();
            /* If selected ids have changed, query new data */
            if (! _.isEqual(selectedSampleIds, this.selectedSampleIds)) {
                this.selectedSampleIds = selectedSampleIds;
                store.dispatch(actions.queryProjectsAsync(selectedSampleIds, this.dataStoreKey))
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
        this.api && this.api.sizeColumnsToFit();  // recalculate columnsKey width to fill the space
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
        let data = this.state.tableData;
        //console.debug(data)
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        if (!columns[this.columnsKey]) {
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
                        columnDefs={columns[this.columnsKey]}
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