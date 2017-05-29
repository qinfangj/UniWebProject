"use strict";
import React from 'react';
import css from './styles.css';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';
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
import inputTypes from '../forms/inputTypes';



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
     * Build a list of <option>s based on an array representing the different options for a select input.
     * @param options: array [[id, label], ...] to become <option value={id}>{label}</option>.
     * @returns {Array}
     */
    makeOptions(options) {
        return options ? options.map((v,i) => <option value={v[0]} key={i}>{v[1]}</option>) : [];
    }

    /**
     * Make an array of inputs of the correct type, based on the form model.
     * @param k: the row index, to link an input to its row.
     * @returns {Array}
     */
    makeInputs(k) {
        let inputs = [];
        for (let field of Object.keys(batchSubmissionModel)) {
            let model = batchSubmissionModel[field];
            let modelName = `${this.model}[${k}].${field}`;
            let input;
            let props = {
                updateOn: "change",
            };
            switch(model.inputType) {
                case inputTypes.TEXT:
                    input = <Control.text model={modelName} {...props} />; break;
                case inputTypes.NUMBER:
                    input = <Control.input model={modelName} type="number" {...props} />; break;
                case inputTypes.DATE:
                    input = <Control.input model={modelName} type="date" {...props} />; break;
                case inputTypes.CHECKBOX:
                    input = <Control.checkbox model={modelName} />; break;
                case inputTypes.DROPDOWN:
                    input = (
                        <Control.select model={modelName} {...props}>
                            {this.makeOptions(this.props.options[model.optionsKey])}
                        </Control.select>
                    ); break;
                default:
                    break;
            }
            inputs.push(input);
        }
        return inputs;
    }

    /**
     * Build one of the rows, given an array of <input>s.
     * @param inputs: an array of inputs.
     * @param k: The row index, to have a unique key for React.
     */
    makeRow(inputs, k) {
        let cells = inputs.map((input,i) =>
            <td className={css.cell} key={i}>{input}</td>
        );
        return <tr key={k}>{cells}</tr>;
    }

    /**
     * Build an array of rows, one for each sample from the store.
     * @returns {Array}
     */
    makeRows() {
        let rows = this.props.formData.map((sample, k) => {
            let inputs = this.makeInputs(k);
            let row = this.makeRow(inputs, k);
            return row;
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

