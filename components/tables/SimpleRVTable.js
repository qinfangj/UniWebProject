"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import tablesCss from './tables.css';

import Immutable from 'immutable'
import * as tables from './tables.js';
import { Column, Table, SortIndicator, SortDirection} from 'react-virtualized';


/**
 * Table that displays the *result* of the Projects/samples query.
 */
class SimpleRVTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableHeight = tables.GRID_HEIGTH;
        this.state = {
            sortBy: "id",
            sortDirection: "DESC",
        };
    }

    static propTypes = {
        getDataAsync: PropTypes.func.isRequired,
        columnDefs: PropTypes.array.isRequired,  // columns definition object
        tableData: PropTypes.array.isRequired,
        //searchTerm: PropTypes.string,
    };

    _sort = ({ sortBy, sortDirection }) => {
        this.setState({ sortBy, sortDirection });
    };

    render() {
        // Format data from props
        let data = this.props.tableData;
        tables.checkData(data);
        let rowCount = data.length;

        // Format for RV with Immutable.js
        data = Immutable.fromJS(data);
        data = tables.sortImmutable(data, this.state.sortBy, this.state.sortDirection);
        const rowGetter = ({index}) => tables._getRow(data, index);

        // Build the columns
        let columnDefs = this.props.columnDefs;
        let columns = tables.makeColumns(columnDefs);
        // Calculate the table width based on individual column widths
        let tableWidth = columnDefs.reduce((sum, col) => sum + col.width, 0);

        return (
            <div className={tablesCss.tableContainer} style={{width: '100%', marginTop: '15px'}}>
                <Table
                    width={tableWidth}
                    height={this.tableHeight}
                    headerClassName={tablesCss.headerColumn}
                    headerHeight={tables.ROW_HEIGTH}
                    headerRowRenderer={tables.headerRowRenderer}
                    noRowsRenderer={() => (rowCount === 0) && <div className={tablesCss.noData}>{"No data"}</div>}
                    rowCount={rowCount}
                    rowGetter={rowGetter}
                    rowHeight={tables.ROW_HEIGTH}
                    sort={this._sort}
                    sortBy={this.state.sortBy}
                    sortDirection={this.state.sortDirection}
                >
                    {columns}
                </Table>
            </div>

        );
    }
}

SimpleRVTable.defaultProps = {
    tableData: [],
    //searchTerm: "",
};


export default SimpleRVTable;

