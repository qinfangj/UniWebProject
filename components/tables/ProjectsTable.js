

import React from 'react';
import css from './tables.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {AgGridReact} from 'ag-grid-react';


class ProjectsTable extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    getProjects() {
        return [
            {
                "id": 1,
                "name": "Project1",
                "codeName": "P1_JD",
                "description": "cool one",
                "author": "Me Myself"
            },
            {
                "id": 2,
                "name": "Project2",
                "codeName": "P2_JD",
                "description": "cool one too",
                "author": "Me Myself"
            },
            {
                "id": 3,
                "name": "Project3",
                "codeName": "P3_JD",
                "description": "cool one as well",
                "author": "Me Myself"
            },
        ];
    }

    render() {
        let rowData = this.getProjects();
        return (
            <div>
                <div className="ag-bootstrap" style={{height: '400px'}}>
                    <AgGridReact
                        rowData={rowData}
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

                <hr/>

                <BootstrapTable data={this.getProjects()}
                                striped={true} hover={true} pagination={true} search={true}
                                tableHeaderClass={css.tableHeader}
                                tableContainerClass={css.tableContainer}
                                headerStyle={{width: "auto", minWidth: "auto"}}
                >
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true}>
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="codeName" dataSort={true}>
                    Code
                </TableHeaderColumn>
                <TableHeaderColumn dataField="description" dataSort={true}>
                    Description
                </TableHeaderColumn>
                <TableHeaderColumn dataField="author" dataSort={true}>
                    Author
                </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default ProjectsTable;
