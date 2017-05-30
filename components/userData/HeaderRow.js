"use strict";
import React from 'react';
import css from './styles.css';
import cx from 'classnames';
import PropTypes from 'prop-types';

import store from '../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import batchSubmissionModel from './model';
import * as helpers from './helpers';
import { Form, actions } from 'react-redux-form';
import Icon from 'react-fontawesome';



/**
 * A <tr> with 3 buttons in the first cell, and sample creation inputs in the others.
 */
class HeaderRow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.formModelName = "userData.samples";
        this.addNewRow = this.addNewRow.bind(this);
        this.clear = this.clear.bind(this);
    }

    /**
     * Reset to initial single row.
     */
    clear() {
        store.dispatch(actions.change(this.formModelName, [helpers.newEmptyRow()]));
    }

    /**
     * Add a new empty row at the end.
     */
    addNewRow() {
        let newRows = [...this.props.formData, helpers.newEmptyRow()];
        store.dispatch(actions.change(this.formModelName, newRows));
    }

    render() {
        let labels = [];
        for (let field of Object.keys(batchSubmissionModel)) {
            let label = batchSubmissionModel[field].label || "";
            labels.push(label);
        }
        let cells = labels.map((label,i) =>
            <th className={css.headerCell} key={i}>{label}</th>
        );
        // The first cell is for the buttons
        cells.unshift(
            <th key={"buttons"}>
                <Icon className={css.addNewRowButton} name="plus" onClick={this.addNewRow} />
                <Icon className={css.clearButton} name="eraser" onClick={this.clear} />
            </th>
        );
        return <tr className={css.headerButtons}>{cells}</tr>;
    }

}


function mapStateToProps(state) {
    let formData = state.userData.samples;
    return {
        formData: formData,
    };
}


export default connect(mapStateToProps)(HeaderRow);


