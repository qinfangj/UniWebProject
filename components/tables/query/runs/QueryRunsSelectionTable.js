"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import tablesCss from '../../tables.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tables from '../../tables.js';

import { getTableDataAsync } from '../../../actions/actionCreators/facilityDataActionCreators';
import { queryRunsAsync, resetSelection, changeRunsSelection } from '../../../actions/actionCreators/queryRunsActionCreators';

import selectionColumns from './selectionColumns';
import { Column } from 'react-virtualized';
import { Checkbox } from 'react-bootstrap/lib';
import SimpleRVTable from '../../_SimpleRVTable';


/**
 * Table that displays the *result* of the Runs query.
 * It uses React-Virtualized so that only what is visible is rendered.
 */
class QueryRunsSelectionTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.tableHeight = 400;
        this.state = {
            sortBy: "id",
            sortDirection: "DESC",
        };
    }

    static propTypes = {
        queryType: PropTypes.string.isRequired,
    };

    /**
     * Select all runs from backend.
     * There are very many and they will be stored in the browser,
     * but thanks to react-virtualized, they will not all get rendered so performance is safe.
     */
    componentWillMount() {
        this.props.getTableDataAsync("runs", "runs", false, null, null, null, null, null)
        .fail((err) => console.error("QueryProjectsForm.getTableDataAsync() failed to load data."));
    }

    /**
     * Format the raw data we get from backend, for example to merge first and last name.
     */
    formatData = (data) => {
        let L = data.length;
        for (let i=0; i < L; i++) {
            let d = data[i];
            d.read_type = (d.run_type || "") +" "+ (d.read_length || "");
        }
        return data;
    };

    /**
     * When a row is clicked, add the corresponding run to the list of selected runs,
     * and query Runs accordingly.
     */
    selectRun = ({e, index, rowData}) => {
        let runId = rowData.get("id");
        let selectedRuns = this.props.selectedRuns;
        if (selectedRuns[runId]) {
            delete selectedRuns[runId];
        } else {
            selectedRuns[runId] = true;
        }
        this.props.changeRunsSelection(selectedRuns);
        this.props.queryRunsAsync(selectedRuns, this.props.queryType);
    };

    /**
     * Construct an array of <Column>s from the columns definition.
     */
    makeColumns = (width, columnDefs) => {
        return columnDefs.map( s => {
            let cellRenderer = s.cellRenderer;

            /* Use columns without a "width" definition to share equally all the empty space. */
            const nWithoutWidth = columnDefs.filter(col => !col.width).length;
            const sumWithWidth = columnDefs.reduce((sum, col) => sum + (col.width || 0), 0);
            const remainColumnWidth = (width - sumWithWidth) / nWithoutWidth;

            /* Special case of cell renderer for the checkbox cell */
            if (s.field === "id") {
                cellRenderer = ({ cellData }) => {
                    return <Checkbox
                        id={cellData}
                        className={tablesCss.checkbox}
                        checked={!!this.props.selectedRuns[cellData]}
                        value={cellData}
                        readOnly
                    />
                }
            }

            return (
                <Column key={s}
                    label={s.headerName}
                    dataKey={s.field}
                    width={s.width || remainColumnWidth}
                    cellRenderer={cellRenderer}
                    headerRenderer={s.field === "id" ? () => "" : tables._headerRenderer}
                />
            );
        });
    };

    /**
     * Override the default `tables.headerRowRenderer` to remove the ugly yellow stuff.
     */
    headerRowRenderer({ className, columns, style }) {
        return (
            <div role="row" style={style} className={className} >
                {columns}
            </div>
        );
    }

    render() {
        let data = this.formatData(this.props.runs);
        return (
            <SimpleRVTable
                columnDefs={selectionColumns}
                tableData={data}
                autosize={true}
                getColumns={this.makeColumns}
                onRowClick={this.selectRun}
                headerRowRenderer={this.headerRowRenderer}
                searchTerm={this.props.searchTerm}
            />
        );
    }

}



QueryRunsSelectionTable.defaultProps = {
    runs: [],
};


const mapStateToProps = (state) => {
    let runs = state.facilityData["runs"].data;
    let selectedRuns = state.queryRuns.selectedRuns;
    let searchTerm = state.queryRuns.searchTerm;
    return {
        runs,
        selectedRuns,
        searchTerm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableDataAsync,
        queryRunsAsync,
        changeRunsSelection,
        resetSelection,
    }, dispatch);};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsSelectionTable);
