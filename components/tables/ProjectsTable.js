import React from 'react';
import css from './tables.css';
import store from '../../core/store';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getProjectsListAsync } from '../actions/actionCreators/asyncActionCreators';
import { Icon } from 'react-fa';



class ProjectsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    static propTypes = {
        activeOnly: React.PropTypes.bool,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ projects: store.getState().async.projectsList });
        });
        store.dispatch(getProjectsListAsync(this.props.activeOnly));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getFakeProjects() {
        let data = require('./fakeProjects.json');
        this.setState({ projects: data });
    }

    renderCaret(direction) {
        if (direction === 'asc') {
            return <Icon name='caret-down' className={css.sortDown}/>;
        }
        else if (direction === 'desc') {
            return <Icon name='caret-up' className={css.sortUp}/>;
        }
        return null; //<Icon name='sort' className={css.sort}/>;
    }

    render() {
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
                                options={{sortOrder: "asc"}}
                >
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true} caretRender={this.renderCaret}>
                    ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort={true} caretRender={this.renderCaret}>
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="codeName" dataSort={true} caretRender={this.renderCaret}>
                    Code
                </TableHeaderColumn>
                <TableHeaderColumn dataField="description" dataSort={true} caretRender={this.renderCaret}>
                    Description
                </TableHeaderColumn>
                <TableHeaderColumn dataField="author" dataSort={true} caretRender={this.renderCaret}>
                    Author
                </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default ProjectsTable;
