"use strict";
import React from 'react';
import css from './styles.css';
import cx from 'classnames';
import store from '../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    requestAllProjects,
    requestTaxonomies,
    requestSampleTypes,
    requestQuantifMethods,
    requestRunsTypesLengths,
    requestRecentMultiplexIndexes,
    requestLibProtocols,
    requestLibAdapters,
    } from '../actions/actionCreators/optionsActionCreators';

import batchSubmissionModel from './model';
import * as helpers from './helpers';
import { Form, actions } from 'react-redux-form';
import Icon from 'react-fontawesome';
import MultiCopyDropdown from './MultiCopyDropdown';



class SamplesBatchSubmission extends React.PureComponent {

    constructor(props) {
        super(props);
        this.modelName = "userData.samples";
        this.model = batchSubmissionModel;
    }

    componentWillMount() {
        this.props.requestAllProjects();
        this.props.requestTaxonomies();
        this.props.requestSampleTypes();
        this.props.requestQuantifMethods();
        this.props.requestRunsTypesLengths();
        this.props.requestRecentMultiplexIndexes();
        this.props.requestLibProtocols();
        this.props.requestLibAdapters();
    }

    handleSubmit() {

    }

    /**
     * Build the buttons for one row - to duplicate it or remove it.
     * @param k: the row index.
     */
    makeRowButtons(k) {
        return (
            <div className={css.rowButtons}>
                <Icon className={css.copyOnceButton} name="clone" onClick={this.copyRowOnce.bind(this, k)} />
                <MultiCopyDropdown copyRowNtimes={this.copyRowNtimes.bind(this)} rowIndex={k} />
                <Icon className={css.removeButton} name="trash" onClick={this.deleteRow.bind(this, k)} />
            </div>
        );
    }

    /**
     * Build an array of rows, one for each sample from the store.
     * @returns {Array}
     */
    makeRows() {
        let rows = this.props.formData.map((sample, k) => {
            let inputs = helpers.makeInputs(this.model, this.props.options, this.modelName, k);
            let cells = inputs.map((input,i) =>
                <td className={css.cell} key={i}>{input}</td>
            );
            // The first one is for the buttons
            cells.unshift(
                <td key={"buttons"+k}>
                    {this.makeRowButtons(k)}
                </td>
            );
            return <tr key={k}>{cells}</tr>;
        });
        return rows;
    }

    /**
     * Build a <tr> of headers based on the form model.
     */
    makeHeader() {
        let labels = [];
        for (let field of Object.keys(batchSubmissionModel)) {
            let label = batchSubmissionModel[field].label || "";
            labels.push(label);
        }
        let cells = labels.map((label,i) =>
            <th className={css.headerCell} key={i}>{label}</th>
        );
        // The first one is for the buttons
        cells.unshift(
            <th key={"buttons"}>
                <Icon className={css.addNewRowButton} name="plus" onClick={this.addNewRow.bind(this)} />
                <Icon className={css.clearButton} name="eraser" onClick={this.clear.bind(this)} />
            </th>
        );
        return <tr className={css.headerButtons}>{cells}</tr>;
    }

    /**
     * Reset to initial single row.
     */
    clear() {
        store.dispatch(actions.change(this.modelName, [helpers.newEmptyRow()]));
    }

    deleteRow(k) {
        let rows = this.props.formData;
        let newRows = [...rows.slice(0, k), ...rows.slice(k+1, rows.length)];
        store.dispatch(actions.change(this.modelName, newRows));
    }

    /**
     * Add a new empty row at the end.
     */
    addNewRow() {
        let newRows = [...this.props.formData, helpers.newEmptyRow()];
        store.dispatch(actions.change(this.modelName, newRows));
    }

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
        store.dispatch(actions.change(this.modelName, newRows));
    }

    /**
     * Add a single copy of the chosen row just below itself.
     * @param k: row index.
     */
    copyRowOnce(k) {
        this.copyRowNtimes(k, 1);
    }

//Starting material description (e.g.: 'Crosslinked ChIP DNA from NIH-3T3 cells')

    render() {
        return (
            <Form model="userData.samples">
                <table className={css.batchInsertTable}>
                    <thead>
                        {this.makeHeader()}
                    </thead>
                    <tbody>
                        {this.makeRows()}
                    </tbody>
                </table>
            </Form>
        );
    }
}


function mapStateToProps(state) {
    let options = {};
    for (let field of Object.keys(batchSubmissionModel)) {
        let model = batchSubmissionModel[field];
        if (model.optionsKey) {
            options[model.optionsKey] = state.options[model.optionsKey] || [];
        }
    }
    let formData = state.userData.samples;
    return {
        formData: formData || [],
        options: options || {},
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestAllProjects,
        requestTaxonomies,
        requestSampleTypes,
        requestQuantifMethods,
        requestRunsTypesLengths,
        requestRecentMultiplexIndexes,
        requestLibProtocols,
        requestLibAdapters,
        }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SamplesBatchSubmission);

