"use strict";
import React from 'react';
import css from '../styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    requestAllProjects,
    requestTaxonomies,
    requestSampleTypes,
    requestQuantifMethods,
    requestRunsTypesLengths,
    requestLibProtocols,
} from '../../actions/actionCreators/optionsActionCreators';

import sampleModel from '../formModels/sampleModel';
import samplesProjectModel from '../formModels/samplesProjectModel';
import { Form } from 'react-redux-form';
import SampleRow from './SampleRow';
import SamplesHeaderRow from './SamplesHeaderRow';
import SamplesProjectRow from './SamplesProjectRow';
import CommonProjectHeaderRow from '../CommonProjectHeaderRow';
import { Button } from 'react-bootstrap/lib';



/**
 * The table that contains the form to submit a sample.
 * Each row is a sample insert form, and can be duplicated n tines or removed.
 * This component pre-loads all the necessary options lists
 * and generates as many rows as there are samples in the store state.
 */
class SamplesBatchSubmission extends React.PureComponent {

    constructor(props) {
        super(props);
        this.model = sampleModel;
    }

    componentWillMount() {
        this.props.requestAllProjects();
        this.props.requestTaxonomies();
        this.props.requestSampleTypes();
        this.props.requestQuantifMethods();
        this.props.requestRunsTypesLengths();
        this.props.requestLibProtocols();
    }

    handleSubmit(values) {
        console.log("Batch insert of samples: ", values);
    }

    /**
     * Build an array of rows, one for each sample from the store.
     * @returns {Array}
     */
    makeRows() {
        let rows = [];
        let nsamples = this.props.nsamples;
        for (let k=0; k < nsamples; k++) {
            let row = <SampleRow
                    key={k}
                    options={this.props.options}
                    rowIndex={k}
                />;
            rows.push(row);
        }
        return rows;
    }

    render() {
        return (
            <Form model="userData.libraries" onSubmit={this.handleSubmit.bind(this)}>

                <div className={css.triangleRight} />
                <div className={css.projectDefinition}>
                    <div className={css.title}>
                        Project definition:
                    </div>
                    <table className={css.batchInsertTable}>
                        <thead>
                            <CommonProjectHeaderRow model={samplesProjectModel}/>
                        </thead>
                        <tbody>
                            <SamplesProjectRow options={this.props.options} />
                        </tbody>
                    </table>
                </div>

                <br/>

                <div className={css.triangleRight} />
                <div className={css.samplesDefinition}>
                    <div className={css.title}>
                        Samples definition:
                    </div>
                    <table className={css.batchInsertTable}>
                        <thead>
                            <SamplesHeaderRow/>
                        </thead>
                        <tbody>
                            {this.makeRows()}
                        </tbody>
                    </table>
                </div>

                <Button className={css.submitButton} bsStyle="primary" type="submit">Submit</Button>

            </Form>
        );
    }
}


function mapStateToProps(state) {
    let nsamples = state.userData.samples.length;
    return {
        nsamples: nsamples,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestAllProjects,
        requestTaxonomies,
        requestSampleTypes,
        requestQuantifMethods,
        requestRunsTypesLengths,
        requestLibProtocols,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SamplesBatchSubmission);
