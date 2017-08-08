"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from '../query.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetSelection } from '../../../actions/actionCreators/queryRunsActionCreators';
import formNames from '../../../constants/formNames';

import Icon from 'react-fontawesome';
import QueryRunsSearch from './QueryRunsSearch';
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

    onReset = () => {
        this.props.resetSelection();
    };

    toggleVisible = () => {
        this.setState({ visible: !this.state.visible });
    };

    render() {
        return (
            <div id="QueryProjectsForm">
                <div>

                {/* Search bar */}

                    <QueryRunsSearch />

                {/* Toggle visibility button */}

                    <div className={css.toggleVisible}>
                        <Button className={css.toggleVisibleButton} onClick={this.toggleVisible}>
                            <Icon name={this.state.visible ? "angle-double-up" : "angle-double-down"} />
                        </Button>
                    </div>

                {/* Reset button */}

                    <div className={css.reset}>
                        <Button bsStyle="primary" className={css.resetButton} onClick={this.onReset}>
                            Reset
                        </Button>
                    </div>

                </div>

                {/* Runs selection - a table with checkboxes to select runs */}

                <div className="clearfix" />

                <Collapse in={this.state.visible}>
                    <div id="qr-samples-list">
                        {this.props.children}
                    </div>
                </Collapse>

            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        resetSelection,
        }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(QueryRunsForm);
