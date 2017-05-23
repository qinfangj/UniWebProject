"use strict";
import React from 'react';
import formsCss from '../forms.css';
import css from './queryProjects.css';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTableDataAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import { queryRunsAsync, resetSelection, changeRunsSelection } from '../../actions/actionCreators/queryRunsActionCreators';
import formNames from '../../constants/formNames';
import { Button, Collapse, Checkbox } from 'react-bootstrap/lib';
import Icon from 'react-fontawesome';
import { randomString } from '../../../utils/common';
import QueryRunsSearch from './QueryRunsSearch';


/**
 * Holds together the projects and samples multiple selectors,
 * and allows to filter their options by term.
 */
class QueryRunsForm extends React.PureComponent {
    constructor() {
        super();
        this.form = formNames.QUERY_RUNS_FORM;
        this.modelName = "queryProjectsForms.queryRuns";
        this.state = {
            visible: true,
        };
    }

    static propTypes = {
        queryType: PropTypes.string.isRequired,
    };

    componentWillMount() {
        this.props.getTableDataAsync("runs", "runs", false, null, null, null, null)
            .fail((err) => console.error("QueryProjectsForm.getTableDataAsync() failed to load data."));
    }

    onReset() {
        this.props.resetSelection();
    }

    toggleVisible() {
        this.setState({ visible: !this.state.visible });
    }

    selectRun(runId, e) {
        let selected = this.props.selectedRuns;
        if (selected[runId]) {
            delete selected[runId];
        } else {
            selected[runId] = true;
        }
        this.props.changeRunsSelection(selected);
        this.props.queryRunsAsync(selected, this.props.queryType);
    }

    makeRunsRow(run) {
        return (
            <tr key={run.id+randomString(6)} onClick={this.selectRun.bind(this, run.id)}>
                <td className={css.checkboxCell}>
                    <Checkbox
                        id={run.id} className={css.checkbox}
                        checked={!!this.props.selectedRuns[run.id]}
                        value={!!this.props.selectedRuns[run.id]}
                        onChange={this.selectRun.bind(this, run.id)}
                    />
                </td>
                <td className={css.instrumentCell}>{run.instrument}</td>
                <td className={css.runNbCell}>{run.run_nb}</td>
                <td className={css.runDateCell}>{run.run_date}</td>
                <td className={css.readLengthCell}>{run.cycle_nb}</td>
                <td className={css.runTypeCell}>{run.run_type}</td>
                <td className={css.runFolderCell}>{run.run_folder}</td>
                <td className={css.statusCell}>{run.status}</td>
            </tr>
        );
    }

    render() {

        console.log("RENDER")

        let runs = this.props.runs.map(run => this.makeRunsRow(run));

        return (
            <div id="QueryProjectsForm">
                <div>

                {/* Search bar */}

                    <QueryRunsSearch />

                {/* Toggle visibility button */}

                    <div className={css.toggleVisible}>
                        <Button className={css.toggleVisibleButton} onClick={this.toggleVisible.bind(this)}>
                            <Icon name={this.state.visible ? "angle-double-up" : "angle-double-down"} />
                        </Button>
                    </div>

                {/* Reset button */}

                    <div className={css.reset}>
                        <Button bsStyle="primary" className={css.resetButton} onClick={this.onReset.bind(this)}>
                            Reset
                        </Button>
                    </div>

                </div>

                {/* Runs selection */}

                <div className="clearfix" />

                <Collapse in={this.state.visible}>
                    <table className={css.runsSelection}>
                        <tbody>
                            {runs}
                        </tbody>
                    </table>
                </Collapse>

            </div>
        );
    }
}


function filterRuns(runs, term) {
    term = term.toLowerCase();
    return runs.filter(run =>
        ~run.instrument.toLowerCase().indexOf(term) ||
        ~run.run_nb.toString().indexOf(term) ||
        ~run.run_date.indexOf(term) ||
        ~run.cycle_nb.toString().indexOf(term) ||
        ~run.run_type.indexOf(term) ||
        ~run.run_folder.toLowerCase().indexOf(term) ||
        ~run.status.toLowerCase().indexOf(term)
    );
}


const mapStateToProps = (state, ownProps) => {
    let runs = state.facilityData["runs"].data;
    let queryType = state.queryRuns.queryType;
    let selectedRuns = state.queryRuns.selectedRuns;
    let searchTerm = state.queryRuns.searchTerm;
    if (searchTerm !== "") {
        runs = filterRuns(runs, searchTerm);
    }
    return {
        runs: runs,
        queryType: queryType,
        selectedRuns: selectedRuns,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableDataAsync,
        queryRunsAsync,
        changeRunsSelection,
        resetSelection,
        }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsForm);
