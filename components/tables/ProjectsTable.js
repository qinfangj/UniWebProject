import React from 'react';
import css from './tables.css';
import store from '../../core/store';
import * as tables from './tables.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as actions from '../actions/actionCreators/asyncActionCreators';



class ProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
        this.storeKey = "projectsList";
    }

    static propTypes = {
        activeOnly: React.PropTypes.bool,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ list: store.getState().async[this.storeKey] });
        });
        store.dispatch(actions.getProjectsListAsync(this.props.activeOnly));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    getFakeData() {
        let data = require("./fakeProjects.json");
        this.setState({ list: data });
    }

    render() {
        let colProps = tables.tableHeaderProps;
        return (
            <div>
                <tables.Nrows data={this.state.list} />
                <BootstrapTable data={this.state.list} {...tables.bootstrapTableProps}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" {...colProps}>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="name" {...colProps}>
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="codeName" {...colProps}>
                        Code
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="description" {...colProps}>
                        Description
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="author" {...colProps}>
                        Author
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default ProjectsTable;
