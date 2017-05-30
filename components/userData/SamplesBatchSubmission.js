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
import SampleRow from './SampleRow';



class SamplesBatchSubmission extends React.PureComponent {

    constructor(props) {
        super(props);
        this.modelName = "userData.samples";
        this.model = batchSubmissionModel;
        this.addNewRow = this.addNewRow.bind(this);
        this.clear = this.clear.bind(this);
        this.copyRowOnce = this.copyRowOnce.bind(this);
        this.copyRowNtimes = this.copyRowNtimes.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
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
     * Build an array of rows, one for each sample from the store.
     * @returns {Array}
     */
    makeRows() {
        let rows = this.props.formData.map((sample, k) => {
            return (
                <SampleRow
                    key={k}
                    options={this.props.options}
                    rowIndex={k}
                    copyRowOnce={this.copyRowOnce}
                    copyRowNtimes={this.copyRowNtimes}
                    deleteRow={this.deleteRow}
                />
            );
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
                <Icon className={css.addNewRowButton} name="plus" onClick={this.addNewRow} />
                <Icon className={css.clearButton} name="eraser" onClick={this.clear} />
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
        console.log("RENDER!!")
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
        formData: formData,
        options: options,
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

