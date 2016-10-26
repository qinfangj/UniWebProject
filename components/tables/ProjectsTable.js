import React from 'react';
import css from './tables.css';
import cx from 'classnames';
import store from '../../core/store';
import * as tables from './tables.js';
import * as actions from '../actions/actionCreators/asyncActionCreators';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {AgGridReact} from 'ag-grid-react';
import Dimensions from 'react-dimensions';
import FormControl from 'react-bootstrap/lib/FormControl';



class ProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchValue: "",
            renderme: false,
        };
        this.storeKey = "projectsList";
    }

    static propTypes = {
        activeOnly: React.PropTypes.bool,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let data = store.getState().async[this.storeKey];
            this.setState({ data });
        });
        store.dispatch(actions.getProjectsListAsync(this.props.activeOnly));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    /**
     * Need to update columns width here, just before rendering, and not in `onGridReady`
     * as the docs suggest, because `onGridReady` happens before data arrives
     * and container sizes change in unpredictable manner.
     */
    componentWillUpdate() {
        this.api.doLayout();  // recalculate layout to fill the container div
        this.api.sizeColumnsToFit();  // recalculate columns width to fill the space
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    onSearch(e) {
        let value = e.target.value;
        console.debug("Search for value", value);
        this.api.setQuickFilter(value);
        this.setState({searchValue: value});
    }

    getFakeData() {
        let data = require("./fakeProjects.json");
        this.setState({ data });
    }

    render() {
        let data = this.state.data;
        if (!data) return null;
        tables.checkData(data);
        return (
            <div style={{width: '100%'}}>
                <FormControl type="text" placeholder="Search" className={css.searchField}
                    value={this.state.searchValue}
                    onChange={this.onSearch.bind(this)}
                />
                <div className="clearfix"/>
                <div className="ag-bootstrap" style={{height: '400px', width: '100%'}}>
                    <AgGridReact
                        onGridReady={this.onGridReady.bind(this)}
                        rowData={data}
                        enableFilter={true}
                        enableSorting={true}
                        columnDefs={
                            [{
                                headerName: "ID",
                                field: "id",
                                width: 60,
                            },{
                                headerName: "Name",
                                field: "name",
                                width: 200,
                            },{
                                headerName: "Code",
                                field: "codeName",
                                width: 200,
                            },{
                                headerName: "Description",
                                field: "description",
                                width: 200,
                            },{
                                headerName: "Author",
                                field: "author",
                                width: 200,
                            },
                            ]
                        }
                    >
                    </AgGridReact>
                </div>

                <tables.Nrows data={data} />

            </div>
        );
    }
}


export default Dimensions()(ProjectsTable);
