"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import tablesCss from '../../tables.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tables from '../../tables.js';
import { ROW_HEIGTH } from '../../tables';
import { queryRunsAsync } from '../../../actions/actionCreators/queryRunsActionCreators';

import columnDefs from '../columns';
import { Column, Table, SortIndicator, SortDirection} from 'react-virtualized';
import Immutable from 'immutable'


/**
 * Table that displays the *result* of the Runs query.
 */
class QueryRunsTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.tableHeight = 400;
        this.queryType = "";
        this.state = {
            sortBy: "id",
            sortDirection: "DESC",
        };
    }

    static propTypes = {
        queryType: PropTypes.string.isRequired,  // from router, see parent (route) component
        searchTerm: PropTypes.string,
    };

    /* If query type has changed (route change), query new data */
    componentWillReceiveProps(newProps) {
        let queryType = newProps.queryType;
        if (queryType !== this.queryType) {
            this.queryType = queryType;
            this.props.queryRunsAsync(this.props.selectedRuns, queryType)
                .fail(() => console.error("queryRunsAsync() failed to load data."));
        }
    }

    /**
     * Format the raw data we get from backend, for example to merge first and last name.
     */
    formatData(data) {
        let L = data.length;
        for (let i=0; i < L; i++) {
            let d = data[i];
            d.submitter = (d.submitter_first_name || "") +" "+ (d.submitter_last_name || "");
        }
        return data;
    }

    /**
     * Construct an array of <Column>s from the columns definition.
     */
    makeColumns(){
        let colDefs = columnDefs[this.props.queryType];
        return colDefs.map( s => {
            return (
                <Column key={s}
                    label={s.headerName}
                    dataKey={s.field}
                    headerRenderer={this._headerRenderer}
                    width={s.width}
                />
            );
        });
    }

    /**
     * RV: Return row[*index*] from *list*.
     */
    _getRow (data, index) {
        return data.size !== 0 ? data.get(index % data.size) : {};
    }

    /**
     * RV: Format the header of a Column so that it has the arrow indicating the direction of search.
     */
    _headerRenderer ({ columnData, dataKey, disableSort, label, sortBy, sortDirection }) {
        return (
            <div>
                {label}
                {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
            </div>
        );
    }

    /**
     * RV: Format the whole header row, given the array of Columns.
     */
    headerRowRenderer = ({ className, columns, style }) => {
        return (
            <div role="row" style={style} className={cx(className, tablesCss.RVheader)} >
                {columns}
            </div>
        );
    };

    /**
     * When a column header is clicked.
     */
    _sort = ({ sortBy, sortDirection }) => {
        this.setState({ sortBy, sortDirection });
    };


    /////////////////////////////////////


    render() {
        // Format data from props
        let data = this.props.tableData;
        if (!data) {
            throw new TypeError("Data cannot be null or undefined");
        }
        tables.checkData(data);
        data = this.formatData(data);
        let rowCount = data.length;

        // Format for RV with Immutable.js
        data = Immutable.fromJS(data);
        data = tables.sortImmutable(data, this.state.sortBy, this.state.sortDirection);
        const rowGetter = ({index}) => this._getRow(data, index);

        // Build the columns
        if (!columnDefs[this.props.queryType]) {
            throw new ReferenceError("No columns definition found");
        }
        let columns = this.makeColumns();
        // Calculate the table width based on individual column widths
        let tableWidth = columnDefs[this.props.queryType].reduce((sum, col) => sum + col.width, 0);

        return (
            <div className={tablesCss.tableContainer} style={{width: '100%', marginTop: '15px'}}>

                <Table
                    width={tableWidth}
                    height={this.tableHeight}
                    headerClassName={tablesCss.headerColumn}
                    headerHeight={ROW_HEIGTH}
                    headerRowRenderer={this.headerRowRenderer}
                    noRowsRenderer={() => (rowCount === 0) && <div className={tablesCss.noData}>{"No data"}</div>}
                    rowCount={rowCount}
                    rowGetter={rowGetter}
                    rowHeight={ROW_HEIGTH}
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



QueryRunsTable.defaultProps = {
    tableData: [],
};


const mapStateToProps = (state) => {
    return {
        tableData: state.queryRuns.tableData,
        selectedRuns: state.queryRuns.selectedRuns,
        searchTerm: state.queryRuns.searchTerm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ queryRunsAsync }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsTable);
