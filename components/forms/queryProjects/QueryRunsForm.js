"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from './queryProjects.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTableDataAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import { queryRunsAsync, resetSelection, changeRunsSelection } from '../../actions/actionCreators/queryRunsActionCreators';
import formNames from '../../constants/formNames';

import Icon from 'react-fontawesome';
import QueryRunsSearch from './QueryRunsSearch';
import QueryRunsRow from './QueryRunsRow';
import { Button, Collapse } from 'react-bootstrap/lib';


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


    render() {

        console.log("nruns:", this.props.runs.length)
        let runs = this.props.runs.map(run =>
            <QueryRunsRow run={run} queryType={this.props.queryType} key={run.id}/>
        );

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

                {/* Runs selection - a table with checkboxes to select runs */}

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
    let searchTerm = state.queryRuns.searchTerm;
    if (searchTerm !== "") {
        runs = filterRuns(runs, searchTerm);
    }
    return {
        runs: runs,
        queryType: queryType,
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
