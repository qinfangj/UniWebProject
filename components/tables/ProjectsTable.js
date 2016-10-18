

import React from 'react';
import css from './tables.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class ProjectsTable extends React.Component {
    constructor() {
        super();
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
        return (
            <div>
                <div className={css.title}>
                    Projects
                </div>
                <BootstrapTable data={this.getProjects()} striped={true} hover={true}>
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="codeName">Code</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default ProjectsTable;