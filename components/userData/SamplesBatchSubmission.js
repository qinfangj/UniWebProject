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
import { optionsFromModel } from '../forms/forms.js';
import SampleRow from './SampleRow';
import HeaderRow from './HeaderRow';



class SamplesBatchSubmission extends React.PureComponent {

    constructor(props) {
        super(props);
        // this.modelName = "userData.samples";
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
            return <SampleRow
                key={k}
                formData={this.props.formData}
                options={this.props.options}
                rowIndex={k}
            />;
        });
        return rows;
    }

    render() {
        console.log("RENDER")
        return (
            <Form model="userData.samples">
                <table className={css.batchInsertTable}>
                    <thead>
                        <HeaderRow formData={this.props.formData}/>
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
    let options = optionsFromModel(state, batchSubmissionModel);
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

