import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import tablesCss from '../tables.css';
import css from './queryProjectsTable.css';
import cx from 'classnames';
import store from '../../../core/store';
import * as tables from '../tables.js';
import * as actions from '../../actions/actionCreators/asyncActionCreators';
import * as constants from '../constants';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';
import columns from './columns';


class QueryProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            renderme: false,
        };
        this.dataStoreKey = "queryProjects";
        this.columnsKey = "queryProjects";
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let data = store.getState().async[this.dataStoreKey];
            this.setState({ data });
        });
        /* If data is already in store, use that one. Otherwise, call backend API. */
        let data = store.getState().async[this.dataStoreKey];
        if (data && data.length > 0) {
            this.setState({ data });
        } else {
            store.dispatch(actions.queryProjectsAsync([1,2,3,4], this.dataStoreKey))
            .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
        }
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
        let data = this.state.data;
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