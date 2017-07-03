"use strict";
import React from 'react';
import store from '../../../core/store';
import css from '../styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import { actions } from 'react-redux-form';


import {
    requestAllProjects,
    requestTaxonomies,
    requestSampleTypes,
    requestQuantifMethods,
    requestRunsTypesLengths,
    requestRecentMultiplexIndexes,
    requestLibProtocols,
    requestLibAdapters,
} from '../../actions/actionCreators/optionsActionCreators';
import { batchInsertAsync } from '../../actions/actionCreators/userDataActionCreators';

import libraryModel from '../formModels/libraryModel';
import librariesProjectModel from '../formModels/librariesProjectModel';
import submit from '../submit';
import { formatFormFieldsDefault } from '../../forms/forms';
import formNames from '../../constants/formNames';

import { Form } from 'react-redux-form';
import LibraryRow from './LibraryRow';
import LibraryHeaderRow from './LibraryHeaderRow';
import LibrariesProjectRow from './LibrariesProjectRow';
import CommonProjectHeaderRow from '../CommonProjectHeaderRow';
import { Button } from 'react-bootstrap/lib';



/**
 * The table that contains the form to submit a sample.
 * Each row is a sample insert form, and can be duplicated n tines or removed.
 * This component pre-loads all the necessary options lists
 * and generates as many rows as there are samples in the store state.
 */
class LibrariesBatchSubmission extends React.PureComponent {

    constructor(props) {
        super(props);
        this.table = "libraries";
        this.formModelName = "userDataForms.libraries";
        this.model = libraryModel;
    }

    componentWillMount() {
        // Fix the resetValidity bug in RRF by doing it manually when all options lists are loaded.
        $.when(
            this.props.requestAllProjects(),
            this.props.requestTaxonomies(),
            this.props.requestSampleTypes(),
            this.props.requestQuantifMethods(),
            this.props.requestRunsTypesLengths(),
            this.props.requestRecentMultiplexIndexes(),
            this.props.requestLibProtocols(),
            this.props.requestLibAdapters()
        ).done(() => store.dispatch(actions.resetValidity(this.formModelName)));
    }

    handleSubmit(values) {
        console.log("Batch insert of libraries, init: ", values);
        let project = formatFormFieldsDefault(librariesProjectModel, values.project);
        let requests = [];
        for (let i=0; i < values.requests.length; i++) {
            requests.push(formatFormFieldsDefault(libraryModel, values.requests[i]));
        }
        let insertData = {project, requests};
        submit(this.formModelName, insertData, this.table, formNames.LIBRARIES_INSERT_FORM);
    }

    /**
     * Build an array of rows, one for each sample from the store.
     * @returns {Array}
     */
    makeRows() {
        let rows = [];
        let nlibs = this.props.nlibs;
        for (let k=0; k < nlibs; k++) {
            let row = <LibraryRow
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
            <Form model={this.formModelName} onSubmit={this.handleSubmit.bind(this)}>

                <div className={css.triangleRight} />
                <div className={css.projectDefinition}>
                    <div className={css.title}>
                        Project definition:
                    </div>
                    <table className={css.batchInsertTable}>
                        <thead>
                            <CommonProjectHeaderRow model={librariesProjectModel}/>
                        </thead>
                        <tbody>
                            <LibrariesProjectRow options={this.props.options} />
                        </tbody>
                    </table>
                </div>

                <br/>

                <div className={css.triangleRight} />
                <div className={css.samplesDefinition}>
                    <div className={css.title}>
                        Libraries definition:
                    </div>
                    <table className={css.batchInsertTable}>
                        <thead>
                            <LibraryHeaderRow/>
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
    let nlibs = state.userDataForms.libraries.requests.length;
    return {
        nlibs: nlibs,
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
        batchInsertAsync,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LibrariesBatchSubmission);

