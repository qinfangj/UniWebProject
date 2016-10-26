import React from 'react';
import css from './tables.css';
import store from '../../core/store';
import * as tables from './tables.js';
import * as actions from '../actions/actionCreators/asyncActionCreators';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {AgGridReact} from 'ag-grid-react';




class ProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
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
    componentDidUpdate() {
        console.debug(this.state.data.length)
        console.debug("GRID UPDATE")
        this.api.sizeColumnsToFit();
    }

    componentDidMount() {
        this.api.sizeColumnsToFit();
    }

    getFakeData() {
        let data = require("./fakeProjects.json");
        this.setState({ data });
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.sizeColumnsToFit();
    }

    render() {
        console.debug("RENDER")
        let data = this.state.data;
        tables.checkData(data);
        return (
            <div style={{width: '100%'}}>
                <div className="ag-bootstrap" style={{height: '400px', width: '100%'}}>
                    <AgGridReact
                        onGridReady={this.onGridReady.bind(this)}
                        rowData={data}
                        columnDefs={
                            [{
                                headerName: "ID",
                                field: "id",
                                width: 200,
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

                {/*<tables.Nrows data={data} />*/}
            </div>
        );
    }
}


export default ProjectsTable;
