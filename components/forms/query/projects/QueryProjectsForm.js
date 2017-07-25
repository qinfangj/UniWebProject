"use strict";
import React from 'react';
import css from '../query.css';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { resetSelection, search } from '../../../actions/actionCreators/queryProjectsActionCreators';

import ProjectsMultipleSelect from './ProjectsMultipleSelect';
import SamplesSecondaryMultipleSelect from './SamplesSecondaryMultipleSelect';

import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Icon from 'react-fontawesome';


/**
 * Holds together the projects and samples multiple selectors,
 * and allows to filter their options by term.
 */
class QueryProjectsForm extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: true,
        };
    }

    componentWillMount() {
        // Initialize with all samples - filtering with empty term
        this.props.search("");
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
        this.props.search(term);
    }

    onReset() {
        this.props.resetSelection();
        this.props.search("");
    }

    toggleVisible() {
        this.setState({ visible: ! this.state.visible });
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

                {/* Multiple selects */}

                <div className="clearfix" />
                <Collapse in={this.state.visible}>
                    <Form>
                        <Col sm={6} className={css.col6}>
                            <ProjectsMultipleSelect />
                        </Col>
                        <Col sm={6} className={css.col6}>
                            <SamplesSecondaryMultipleSelect />
                        </Col>
                    </Form>
                </Collapse>
            </div>
        );
    }
}


QueryProjectsForm.defaultProps = {
    searchTerm: "",
};


const mapStateToProps = (state, ownProps) => {
    let searchTerm = state.queryProjects.searchTerm;
    return {
        searchTerm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetSelection,
        search,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryProjectsForm);
