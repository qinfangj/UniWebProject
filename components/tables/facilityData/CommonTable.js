"use strict";
import React from 'react';
import css from '../tables.css';
import cx from 'classnames';
import store from '../../../core/store';
import * as tables from '../tables.js';
import * as actions from '../../actions/actionCreators/facilityDataActionCreators';
import * as constants from '../constants';

import { AgGridReact } from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';
import columns from './columns';
import { ID_COLUMN } from '../constants';


class CommonTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchValue: "",
            renderme: false,
        };
        console.log("dataStoreKey="+this.props.dataStoreKey)
        console.log("columnsKey="+ this.props.columnsKey)
        console.log("table=" +this.props.table)
    }

    static propTypes = {
        dataStoreKey: React.PropTypes.string.isRequired,  // store key for the table data (in "async")
        columnsKey: React.PropTypes.string.isRequired,  // key in the columns definition dict
        table: React.PropTypes.string.isRequired,  // database table name
        activeOnly: React.PropTypes.bool,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let data = store.getState().facilityData[this.props.dataStoreKey];
            this.setState({ data });
        });
        /* If data is already in store, use that one. Otherwise, call backend API. */
        let data = store.getState().facilityData[this.props.dataStoreKey];
        if (data && data.length > 0) {
            this.setState({ data });
        } else {
            store.dispatch(actions.getTableDataAsync(this.props.table, this.props.activeOnly, this.props.dataStoreKey))
            .fail(() => console.error("CommonTable.getTableDataAsync() failed to load data."));
        }
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    componentDidMount() {
        this.api && this.api.doLayout();  // recalculate layout to fill the container div
        this.api && this.api.sizeColumnsToFit();  // recalculate columnsKey width to fill the space
        //this.columnApi && this.columnApi.autoSizeColumns(["ID"]);  // recalculate columnsKey width to fill the content
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
    }

    onSearch(e) {
        let value = e.target.value;
        this.api.setQuickFilter(value);
        this.setState({searchValue: value});
    }

    render() {
        let data = this.state.data;
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        if (!columns[this.props.columnsKey]) {
            throw new ReferenceError("No columns definition found for table "+ this.props.table);
        }
        tables.checkData(data);
        //let cssHeight = (Math.max(1200, (data.length + 1) * constants.ROW_HEIGTH)) + "px";
        return (
            <div style={{width: '100%', height: '100%'}}>
                <FormControl type="text" placeholder="Search" className={css.searchField}
                    value={this.state.searchValue}
                    onChange={this.onSearch.bind(this)}
                />
                <div className="clearfix"/>

                {/* If no data, no table but fill the space */}

                { data.length > 0 ?
                    <div className={cx("ag-bootstrap", css.agTableContainer)} style={{height: '1200px', width: '100%'}}>
                        <AgGridReact
                            onGridReady={this.onGridReady.bind(this)}
                            rowData={data}
                            enableFilter={true}
                            enableSorting={true}
                            columnDefs={columns[this.props.columnsKey]}
                            rowHeight={constants.ROW_HEIGTH}
                            headerHeight={constants.ROW_HEIGTH}
                            overlayNoRowsTemplate='<span/>'
                        >
                        </AgGridReact>
                    </div>
                :
                    <div style={{height: '1200px', width: '100%'}}/>
                }

                {/* Show number of rows in result */}

                { data.length === 0 ? null :
                    <tables.Nrows data={data} />
                }

            </div>
        );
    }
}

CommonTable.defaultProps = {
    activeOnly: false,
};


export default Dimensions()(CommonTable);
