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
import MultiCopyDropdown from './MultiCopyDropdown';
import { optionsFromModel } from '../forms/forms.js';



/**
 * A <tr> with 3 buttons in the first cell, and sample creation inputs in the others.
 */
class SampleRow extends React.PureComponent {

    constructor(props) {
        super(props);
        let k = props.rowIndex;
        this.formModelName = "userData.samples";
        this.modelName = `${this.formModelName}.[${k}]`;
        this.model = batchSubmissionModel;
        // Callbacks
        this.copyRowOnce = this.copyRowOnce.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.copyRowNtimes = this.copyRowNtimes.bind(this);
    }

    static propTypes = {
        options: PropTypes.object.isRequired,
        rowIndex: PropTypes.number.isRequired,
    };

    /**
     * Add copies of the chosen row just below itself.
     * @param k: row index.
     * @param ntimes: the number of copies.
     */
    copyRowNtimes(k, ntimes) {
        let rows = this.props.formData;
        let thisrow = rows[k];
        let repRows = [];
        for (let i=0; i<ntimes; i++) {
            repRows.push({...thisrow});
        }
        let newRows = [...rows.slice(0,k+1), ...repRows, ...rows.slice(k+1, rows.length)];
        store.dispatch(actions.change(this.formModelName, newRows));
    }

    /**
     * Add a single copy of the chosen row just below itself.
     * @param k: row index.
     */
    copyRowOnce() {
        let k = this.props.rowIndex;
        this.copyRowNtimes(k, 1);
    }

    deleteRow() {
        let k = this.props.rowIndex;
        let rows = this.props.formData;
        let newRows = [...rows.slice(0, k), ...rows.slice(k+1, rows.length)];
        store.dispatch(actions.change(this.formModelName, newRows));
    }

    /**
     * Build the buttons for one row - to duplicate it or remove it.
     * @param k: the row index.
     */
    makeRowButtons() {
        return (
            <div className={css.rowButtons}>
                <Icon className={css.copyOnceButton} name="clone" onClick={this.copyRowOnce} />
                <MultiCopyDropdown copyRowNtimes={this.copyRowNtimes} rowIndex={this.props.rowIndex} />
                <Icon className={css.removeButton} name="trash" onClick={this.deleteRow} />
            </div>
        );
    }

    render() {
        let k = this.props.rowIndex;
        let buttons = this.makeRowButtons(k);
        let inputs = helpers.makeInputs(this.model, this.props.options, this.modelName);
        let cells = inputs.map((input,i) =>
            <td className={css.cell} key={i}>{input}</td>
        );
        // The first one is for the buttons
        cells.unshift(
            <td key={"buttons"+k}>
                {buttons}
            </td>
        );

        return (
            <tr key={k}>{cells}</tr>
        );
    }

}


function mapStateToProps(state) {
    let formData = state.userData.samples;
    let options = optionsFromModel(state, batchSubmissionModel);
    return {
        formData: formData,
        options: options,
    };
}


export default connect(mapStateToProps)(SampleRow);


