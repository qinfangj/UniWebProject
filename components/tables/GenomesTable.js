import React from 'react';
import css from './tables.css';
import store from '../../core/store';
import * as tables from './tables.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as actions from '../actions/actionCreators/asyncActionCreators';



class GenomesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.storeKey = "genomesList";
    }

    static propTypes = {
        activeOnly: React.PropTypes.bool,
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let data = store.getState().async[this.storeKey];
            this.setState({ data });
        });
        store.dispatch(actions.getGenomesListAsync(this.props.activeOnly));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let data = this.state.data;
        let colProps = tables.tableHeaderProps;
        tables.checkData(data);
        return (
            <div>
                <tables.Nrows data={data} />
                <BootstrapTable data={data} {...tables.bootstrapTableProps}>
                    <TableHeaderColumn dataField="id" width="40" isKey={true} dataAlign="center" {...colProps}>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="organism" {...colProps}>
                        Organism
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="assembly" {...colProps}>
                        Assembly
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="isMasked" {...colProps}>
                        Masked
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="downloaded_date" {...colProps}>
                        Downloaded date
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="genome_folder" {...colProps}>
                        Folder
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}


export default GenomesTable;
