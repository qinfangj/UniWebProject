"use strict";
import React from 'react';
import formsCss from '../forms.css';
import css from './queryProjects.css';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTableDataAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import { queryRunsAsync, resetSelection } from '../../actions/actionCreators/queryProjectsActionCreators';

import formNames from '../../constants/formNames';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import inputTypes from '../inputTypes';

import RRFInput from '../bootstrapWrappers/RRFInput';
import { Form, actions } from 'react-redux-form';
import { Button, Collapse, FormControl, Checkbox } from 'react-bootstrap/lib';
import Icon from 'react-fontawesome';


/**
 * Holds together the projects and samples multiple selectors,
 * and allows to filter their options by term.
 */
class QueryRunsForm extends React.Component {
    constructor() {
        super();
        this.form = formNames.QUERY_RUNS_FORM;
        this.modelName = "queryProjectsForms.queryRuns";
        this.state = {
            visible: true,
            searchTerm: "",
            selected: {},
        };
    }

    static propTypes = {
        queryType: PropTypes.string.isRequired,
    };

    componentWillMount() {
        this.props.getTableDataAsync("runs", "runs", false, null, null, null, null)
            .fail((err) => console.error("QueryProjectsForm.getTableDataAsync() failed to load data."));
    }

    /**
     * Not a simple filter: we keep options from both projects and samples lists,
     *  where the project either contains the term or has a sample containing it,
     *  and where the sample either contains the term of its project contains it.
     */
    onSearch(e) {
        let term = e.target.value;
        this.props.resetSelection();
    }

    onReset() {
        this.props.resetSelection();
    }

    toggleVisible() {
        this.setState({ visible: !this.state.visible });
    }

    selectRun(runId, e) {
        let selected = this.state.selected;
        if (selected[runId]) {
            delete selected[runId];
        } else {
            selected[runId] = true;
        }
        this.setState({ selected });
        this.props.queryRunsAsync(Object.keys(selected), this.props.queryType)
    }

    makeRunsRow(run) {
        return (
            <tr key={run.id} onClick={this.selectRun.bind(this, run.id)}>
                <td className={css.checkboxCell}>
                    <Checkbox
                        id={run.id} className={css.checkbox}
                        checked={!!this.state.selected[run.id]}
                        value={!!this.state.selected[run.id]}
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
        let runs = this.props.runs
            .filter((run) => run)
            .map((run) => this.makeRunsRow(run));

        return (
            <div id="QueryProjectsForm">
                <div>

                {/* Search bar */}

                    <FormControl className={css.searchField}
                        type="text"
                        placeholder="Search"
                        value={this.state.searchTerm}
                        onChange={this.onSearch.bind(this)}
                    />

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


const mapStateToProps = (state, ownProps) => {
    let runs = state.facilityData["runs"].data;
    return {
        runs: runs,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableDataAsync,
        queryRunsAsync,
        resetSelection
        }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsForm);
