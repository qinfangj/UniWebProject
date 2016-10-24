import React from 'react';
import css from './tables.css';
import store from '../../core/store';
import * as tables from './tables.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as actions from '../actions/actionCreators/asyncActionCreators';



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

    getFakeData() {
        let data = require("./fakeProjects.json");
        this.setState({ data });
    }

    render() {
        let data = this.state.data;
        let colProps = tables.tableHeaderProps;
        tables.checkData(data);
        return (
            <div>
                <tables.Nrows data={data} />
                <BootstrapTable data={data} {...tables.bootstrapTableProps}>
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
