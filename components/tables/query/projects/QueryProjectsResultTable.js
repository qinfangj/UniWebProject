"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import tablesCss from '../../tables.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { queryProjectsAsync } from '../../../actions/actionCreators/queryProjectsActionCreators';

import * as tables from '../../tables.js';
import { ROW_HEIGTH } from '../../tables';

import columnDefs from '../columns';
import { Column, Table, SortIndicator, SortDirection} from 'react-virtualized';
import Immutable from 'immutable'


/**
 * Table that displays the *result* of the Projects/samples query.
 */
class QueryProjectsTable extends React.Component {
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
            this.props.queryProjectsAsync(this.props.selectedSamples, queryType)
                .fail(() => console.error("queryProjectsAsync() failed to load data."));
        }
    }

    /**
     * Format the raw data we get from backend, for example to merge first and last name.
     */
    formatData(data) {
        let L = data.length;
        for (let i=0; i < L; i++) {
            let d = data[i];
            d.submitter = (d.submitter_first_name + d.submitter_last_name) || "";
        }
        return data;
    }

    _sort = ({ sortBy, sortDirection }) => {
        this.setState({ sortBy, sortDirection });
    };

    render() {
        // Format data from props
        let data = this.props.tableData;
        tables.checkData(data);
        data = this.formatData(data);
        let rowCount = data.length;

        // Format for RV with Immutable.js
        data = Immutable.fromJS(data);
        data = tables.sortImmutable(data, this.state.sortBy, this.state.sortDirection);
        const rowGetter = ({index}) => tables._getRow(data, index);

        // Build the columns
        let columns = tables.makeColumns(columnDefs[this.props.queryType]);
        // Calculate the table width based on individual column widths
        let tableWidth = columnDefs[this.props.queryType].reduce((sum, col) => sum + col.width, 0);

        return (
            <div className={tablesCss.tableContainer} style={{width: '100%', marginTop: '15px'}}>

                <Table
                    width={tableWidth}
                    height={this.tableHeight}
                    headerClassName={tablesCss.headerColumn}
                    headerHeight={ROW_HEIGTH}
                    headerRowRenderer={tables.headerRowRenderer}
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



QueryProjectsTable.defaultProps = {
    tableData: [],
    searchTerm: "",
    selectedSamples: [],
};


const mapStateToProps = (state, ownProps) => {
    return {
        tableData: state.queryProjects.tableData,
        searchTerm: state.queryProjects.searchTerm,
        selectedSamples: state.queryProjects.selectedSamples,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ queryProjectsAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryProjectsTable);
