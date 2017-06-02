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

import libraryModel from './formModels/libraryModel';
import { Form } from 'react-redux-form';
import LibraryRow from './LibraryRow';
import HeaderRow from './HeaderRow';



/**
 * The table that contains the form to submit a sample.
 * Each row is a sample insert form, and can be duplicated n tines or removed.
 * This component pre-loads all the necessary options lists
 * and generates as many rows as there are samples in the store state.
 */
class LibrariesBatchSubmission extends React.PureComponent {

    constructor(props) {
        super(props);
        this.model = libraryModel;
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
        let rows = [];
        let nsamples = this.props.nsamples;
        for (let k=0; k < nsamples; k++) {
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
            <Form model="userData.libraries">
                <table className={css.batchInsertTable}>
                    <thead>
                        <HeaderRow/>
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
    let nsamples = state.userData.libraries.length;
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
        requestRecentMultiplexIndexes,
        requestLibProtocols,
        requestLibAdapters,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LibrariesBatchSubmission);

