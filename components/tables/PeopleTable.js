import React from 'react';
import css from './tables.css';
import store from '../../core/store';
import * as tables from './tables.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as actions from '../actions/actionCreators/asyncActionCreators';



class PeopleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
        this.storeKey = "peopleList";
    }

    static propTypes = {
        activeOnly: React.PropTypes.bool,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ list: store.getState().async[this.storeKey] });
        });
        store.dispatch(actions.getPeopleListAsync(this.props.activeOnly));
    }
    componentWillUnmount() {
        this.unsubscribe();
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
                        PI name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="address" {...colProps}>
                        Address
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="email" {...colProps}>
                        PI email
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default PeopleTable;
