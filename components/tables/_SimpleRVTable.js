"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import tablesCss from './tables.css';

import Immutable from 'immutable'
import * as tables from './tables.js';
import { Table, AutoSizer } from 'react-virtualized';


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
        columnDefs: PropTypes.array.isRequired,  // columns definition object
        tableData: PropTypes.array.isRequired,  // the data to display
        searchTerm: PropTypes.string,  // to filter results by that term in all columns
        autosize: PropTypes.bool,  // whether it should respond to screen width
        getColumns: PropTypes.func,   // custom way to generate the <Columns> from the columnDefs
        headerRowRenderer: PropTypes.func,  // to override the default `tables.headerRowRenderer` with the ugly yellow stuff
        onRowClick: PropTypes.func, // callback to fire when a row is clicked
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
        data = tables.localSearch(data, this.props.searchTerm, this.props.columnDefs);
        const rowGetter = ({index}) => tables._getRow(data, index);

        // Build the columns
        let columnDefs = this.props.columnDefs;
        let columns;
        let tableWidth = 1;
        if (this.props.getColumns) {
            columns = this.props.getColumns;
        } else if (this.props.autosize) {
            columns = (width) => tables.makeAutosizerColumns(width, columnDefs);
        } else {
            // Calculate the table width based on individual column widths
            let allHaveWidth = columnDefs.reduce((haveWidth, col) => haveWidth && !!col.width, true);
            if (!allHaveWidth) throw("If not autosized, all columns must have a specified width");
            tableWidth = columnDefs.reduce((sum, col) => sum + col.width, 0);
            columns = (_) => tables.makeFixedTableColumns(tableWidth, columnDefs);
        }

        return (
            <div className={tablesCss.tableContainer} style={{width: '100%', marginTop: '15px'}}>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            width={this.props.autosize ? width : tableWidth}
                            height={this.tableHeight}
                            headerClassName={tablesCss.headerColumn}
                            headerHeight={tables.ROW_HEIGTH}
                            headerRowRenderer={this.props.headerRowRenderer}
                            noRowsRenderer={() => (rowCount === 0) && <div className={tablesCss.noData}>{"No data"}</div>}
                            rowCount={rowCount}
                            rowGetter={rowGetter}
                            rowHeight={tables.ROW_HEIGTH}
                            sort={this._sort}
                            sortBy={this.state.sortBy}
                            sortDirection={this.state.sortDirection}
                            onRowClick={this.props.onRowClick}
                        >
                            { columns(this.props.autosize ? width : tableWidth, columnDefs) }
                        </Table>
                    )}
                </AutoSizer>
            </div>

        );
    }
}

SimpleRVTable.defaultProps = {
    tableData: [],
    searchTerm: "",
    autosize: false,
    headerRowRenderer: tables.headerRowRenderer,
};


export default SimpleRVTable;

