"use strict";
import React from 'react';
import store from '../../core/store';
import { connect } from 'react-redux';
import { Form, Control, actions } from 'react-redux-form';
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

    makeOptions(options) {
        return options ? options.map((v,i) => <option value={v[0]} key={i}>{v[1]}</option>) : [];
    }

    makeInputs() {
        let inputs = [];
        for (let field of Object.keys(batchSubmissionModel)) {
            let model = batchSubmissionModel[field];
            let modelName = '.'+field;
            let input;
            switch(model.inputType) {
                case inputTypes.TEXT:
                    input = <Control.text model={modelName}/>; break;
                case inputTypes.NUMBER:
                    input = <Control.input model={modelName} type="number"/>; break;
                case inputTypes.DATE:
                    input = <Control.input model={modelName} type="date"/>; break;
                case inputTypes.CHECKBOX:
                    input = <Control.checkbox model={modelName}/>; break;
                case inputTypes.DROPDOWN:
                    input = (
                        <Control.select model={modelName}>
                            {this.makeOptions(this.props.options[field])}
                        </Control.select>
                    ); break;
                default:
                    break;
            }
            inputs.push(input);
        }
        return inputs;
    }

    makeRow(inputs) {
        let cells = inputs.map((input,i) => <td key={i}>{input}</td>);
        return <tr key={1}>{cells}</tr>;
    }

    makeHeader() {
        let labels = [];
        for (let field of Object.keys(batchSubmissionModel)) {
            let label = batchSubmissionModel[field].label || "";
            labels.push(label);
        }
        let cells = labels.map((label,i) => <th key={i}>{label}</th>);
        return <tr>{cells}</tr>;
    }

//Starting material description (e.g.: 'Crosslinked ChIP DNA from NIH-3T3 cells')

    render() {
        return (
            <Form model="userData.samples">
                <table>
                    <thead>
                        {this.makeHeader()}
                    </thead>
                    <tbody>
                        {this.makeRow(this.makeInputs())}
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
            options[field] = state.options[model.optionsKey] || [];
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

