"use strict";
import React from 'react';
import css from '../styles.css';
import cx from 'classnames';
import store from '../../../core/store';
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
} from '../../actions/actionCreators/optionsActionCreators';

import libraryModel from '../formModels/libraryModel';
import { Form } from 'react-redux-form';
import LibraryRow from './LibraryRow';
import LibrariesProjectRow from './LirbariesProjectRow';
import LibrariesProjectHeaderRow from './LibrariesProjectHeaderRow';
import LibraryHeaderRow from './LibraryHeaderRow';



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

                <div className={css.triangleRight} />
                <div className={css.projectDefinition}>
                    <div className={css.title}>
                        Project definition:
                    </div>
                    <table className={css.batchInsertTable}>
                        <thead>
                            <LibrariesProjectHeaderRow/>
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

