"use strict";
import React from 'react';
import formsCss from '../forms.css';
import css from './queryProjects.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { searchSamplesByTerm, resetSelection } from '../../actions/actionCreators/queryProjectsActionCreators';

import formNames from '../../constants/formNames';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import inputTypes from '../inputTypes';

import RRFInput from '../bootstrapWrappers/RRFInput';
import { Form, actions } from 'react-redux-form';
import { Button, Collapse, FormControl } from 'react-bootstrap/lib';
import Icon from 'react-fontawesome';


/**
 * Holds together the projects and samples multiple selectors,
 * and allows to filter their options by term.
 */
class QueryProjectsForm extends React.Component {
    constructor() {
        super();
        this.form = formNames.QUERY_RUNS_FORM;
        this.modelName = "queryProjectsForms.queryRuns";
        this.state = {
            visible: true,
        };
    }

    componentWillMount() {
        // Initialize with all samples - filtering with empty term
        //this.props.searchSamplesByTerm("");
    }

    /**
     * Not a simple filter: we keep options from both projects and samples lists,
     *  where the project either contains the term or has a sample containing it,
     *  and where the sample either contains the term of its project contains it.
     */
    onSearch(e) {
        let term = e.target.value;
        // Clear the current projects/samples selection
        this.props.resetSelection();
        //this.props.searchSamplesByTerm(term);
    }

    onReset() {
        this.props.resetSelection();
        //this.props.searchSamplesByTerm("");
    }

    toggleVisible() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        return (
            <div id="QueryProjectsForm">
                <div className={css.topLineWithSearch}>

                {/* Search bar */}

                    <FormControl className={css.searchField}
                        type="text"
                        placeholder="Search"
                        value={this.props.searchTerm}
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

                {/* Multiple select */}

                <div className="clearfix" />

                <Collapse in={this.state.visible}>
                    <Form model={this.modelName}>
                        <RRFInput
                            inputType={inputTypes.MULTIPLE_SELECT}
                            label="Runs"
                            modelName=".runs"
                            options={[["1", "A"],["2", "B"],["3", "C"]]}
                        />
                    </Form>
                </Collapse>
            </div>
        );
    }
}


QueryProjectsForm.defaultProps = {
    // projectIds: {},
    // sampleIds: {},
    searchTerm: "",
};


const mapStateToProps = (state, ownProps) => {
    let searched = state.queryProjects[optionsStoreKeys.PROJECTS_AND_SAMPLES_SEARCHED_BY_TERM];  // {projectIds(set), sampleIds(set)}
    let searchTerm = state.queryProjects.searchTerm;
    let projectIds = searched.projectIds || new Set();
    let sampleIds = searched.sampleIds || new Set();
    return {
        projectIds,
        sampleIds,
        searchTerm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchSamplesByTerm: (term) => dispatch(searchSamplesByTerm(term, optionsStoreKeys.PROJECTS_AND_SAMPLES_SEARCHED_BY_TERM)),
        resetSelection: () => dispatch(resetSelection()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryProjectsForm);
