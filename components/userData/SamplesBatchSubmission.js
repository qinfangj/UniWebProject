"use strict";
import React from 'react';
import css from './styles.css';
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
import { Form } from 'react-redux-form';



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
     * Build an array of rows, one for each sample from the store.
     * @returns {Array}
     */
    makeRows() {
        let rows = this.props.formData.map((sample, k) => {
            let inputs = helpers.makeInputs(this.model, this.props.options, this.modelName, k);
            let cells = inputs.map((input,i) =>
                <td className={css.cell} key={i}>{input}</td>
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
        return <tr>{cells}</tr>;
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

