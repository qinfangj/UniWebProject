import React from 'react';
import css from './tables.css';
import store from '../../core/store';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getProjectsListAsync } from '../actions/actionCreators/asyncActionCreators';


class ProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ projects: store.getState().async.projectsList });
        });
        store.dispatch(getProjectsListAsync(this.props.active));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getFakeProjects() {
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
        console.debug("Render ProjectsTable")

        return (
            <div>
                <div style={{position: "absolute", top: 100, left: 40}}>
                    {this.state.projects ? this.state.projects.length + " rows" : null}
                </div>
                <BootstrapTable data={this.state.projects}
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
