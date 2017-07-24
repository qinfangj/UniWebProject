"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import tablesCss from '../../tables.css';
import css from '../queryProjectsTable.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tables from '../../tables.js';
import { ROW_HEIGTH } from '../../columns';

import { getTableDataAsync } from '../../../actions/actionCreators/facilityDataActionCreators';
import { queryRunsAsync, resetSelection, changeRunsSelection } from '../../../actions/actionCreators/queryRunsActionCreators';

import columnDefs from './selectionColumns';
import { Column, Table, SortIndicator, SortDirection} from 'react-virtualized';
import Immutable from 'immutable'
import { Checkbox } from 'react-bootstrap/lib';



/**
 * Table that displays the *result* of the Runs query.
 * It uses React-Virtualized so that only what is visible is rendered.
 */
class QueryRunsSelectionTable extends React.PureComponent {
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
        queryType: PropTypes.string.isRequired,
    };

    /**
     * Select all runs from backend.
     */
    componentWillMount() {
        this.props.getTableDataAsync("runs", "runs", false, null, null, null, null, null)
        .fail((err) => console.error("QueryProjectsForm.getTableDataAsync() failed to load data."));
    }

    /**
     * Format the raw data we get from backend, for example to merge first and last name.
     */
    formatData(data) {
        let L = data.length;
        for (let i=0; i < L; i++) {
            let d = data[i];
            d.read_type = (d.run_type || "") +" "+ (d.read_length || "");
        }
        return data;
    }

    /**
     * When a row is clicked, add the corresponding sample to the list of selected samples,
     * and query Runs accordingly.
     */
    selectRun = ({e, index, rowData}) => {
        let sampleId = rowData.get("id");
        let selectedSamples = this.props.selectedSamples;
        if (selectedSamples[sampleId]) {
            delete selectedSamples[sampleId];
        } else {
            selectedSamples[sampleId] = true;
        }
        this.props.changeRunsSelection(selectedSamples);
        this.props.queryRunsAsync(selectedSamples, this.props.queryType);
    };

    /**
     * Construct an array of <Column>s from the columns definition.
     */
    makeColumns(){
        return columnDefs.map( s => {
            let cellRenderer = s.cellRenderer;

            /* Special case of cell renderer for the checkbox cell */
            if (s.field === "id") {
                cellRenderer = ({ cellData }) => {
                    return <Checkbox
                        id={cellData}
                        className={css.checkbox}
                        checked={!!this.props.selectedSamples[cellData]}
                        value={cellData}
                        readOnly
                    />
                }
            }

            return (
                <Column key={s}
                    label={s.headerName}
                    dataKey={s.field}
                    width={s.width}
                    cellRenderer={cellRenderer}
                    headerRenderer={s.field === "id" ? () => "" : this._headerRenderer}
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
     * When a column header is clicked.
     */
    _sort = ({ sortBy, sortDirection }) => {
        this.setState({ sortBy, sortDirection });
    };


    /////////////////////////////////////


    render() {
        // Format data from props
        let data = this.props.runs;
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
        if (!columnDefs) {
            throw new ReferenceError("No columns definition found");
        }
        let columns = this.makeColumns();
        // Calculate the table width based on individual column widths
        let tableWidth = columnDefs.reduce((sum, col) => sum + col.width, 0);

        return (
            <div className={tablesCss.tableContainer} style={{width: '100%', marginTop: '15px'}}>

                <Table
                    width={tableWidth}
                    height={this.tableHeight}
                    headerClassName={tablesCss.headerColumn}
                    headerHeight={ROW_HEIGTH}
                    noRowsRenderer={() => (rowCount === 0) && <div className={tablesCss.noData}>{"No data"}</div>}
                    onRowClick={this.selectRun}
                    rowCount={rowCount}
                    rowGetter={rowGetter}
                    rowHeight={ROW_HEIGTH}
                    rowStyle={{cursor: "pointer"}}
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



QueryRunsSelectionTable.defaultProps = {
    runs: [],
};

/**
 * Filter runs by search term before the data enters the component.
 */
function filterRuns(runs, term) {
    term = term.toLowerCase();
    return runs.filter(run =>
        ~run.instrument.toLowerCase().indexOf(term) ||
        ~run.ga_run_date.indexOf(term) ||
        ~run.read_length.toString().indexOf(term) ||
        ~run.run_folder.toLowerCase().indexOf(term) ||
        ~run.run_nb.toString().indexOf(term) ||
        ~run.run_type.indexOf(term) ||
        ~run.status.toLowerCase().indexOf(term)
    );
}

const mapStateToProps = (state) => {
    let runs = state.facilityData["runs"].data;
    let queryType = state.queryRuns.queryType;
    let selectedSamples = state.queryRuns.selectedRuns;
    let searchTerm = state.queryRuns.searchTerm;
    if (searchTerm !== "") {
        runs = filterRuns(runs, searchTerm);
    }
    return {
        runs,
        queryType,
        selectedSamples,
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
