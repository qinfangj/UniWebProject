"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';

import { requestInstruments,
         requestFlowcellTypes,
         requestRunsTypesLengths,
         requestSequencingKitVersions } from '../../../actions/actionCreators/optionsActionCreators';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import { feedbackWarning } from '../../../actions/actionCreators/feedbackActionCreators';

import * as forms from '../../forms.js';
import LanesSubForm from './LanesSubForm';
import formNames from '../../../constants/formNames';
import runsModel from '../formModels/runsModel';
import Feedback from '../../../utils/Feedback';
import SubmitButton from '../../SubmitButton';


export class RunsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "runs";  // db table for insert
        this.form = formNames.RUNS_INSERT_FORM;  // for the feedback
        this.modelName = "facilityDataForms.runs";  // to track form data
        this.model = runsModel;
        this.state = {
            disabled: false,
        };
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, this.onUpdateLoadLibsOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestInstruments();
        this.props.requestSequencingKitVersions();
        this.props.requestRunsTypesLengths();
        this.props.requestFlowcellTypes();
    }

    /**
     * When the update *data* comes, trigger the action to get libraries options lists
     * corresponding to the received projectIds (see newOrUpdate in componentWillMount).
     */
    onUpdateLoadLibsOptions(data) {
        for (let laneNb of Object.keys(data.lanes)) {
            let libs = this.props.formData.lanes[laneNb].libs;
            for (let k=0; k < libs.length; k++) {
                let projectModelName = `${this.modelName}.lanes[${laneNb}].libs[${k}].projectId`;
                this.props.requestLibrariesForProject(projectModelName, libs[k].projectId);
            }
        }
    }

    /**
     * Cast numeric values before we can submit. RRF apparently uses only strings and booleans.
     */
    formatInsertData(values) {
        let insertData = forms.formatFormFieldsDefault(runsModel, values);
        insertData.gaRunNb = parseInt(insertData.gaRunNb);
        for (let laneNb of Object.keys(insertData.lanes)) {
            insertData.lanes[laneNb].laneNb = parseInt(laneNb);
            for (let k in insertData.lanes[laneNb].libs) {
                let lib = insertData.lanes[laneNb].libs[k];
                lib.projectId = parseInt(lib.projectId);
                lib.libraryId = parseInt(lib.libraryId);
                lib.quantityLoaded = parseFloat(lib.quantityLoaded);
                lib.qualityId = parseInt(lib.qualityId);
                lib.isQCLib = lib.isQCLib || false;
            }
        }
        return insertData;
    }

    /**
     * Check the form before submission.
     * Lanes cannot be empty because their fields are 'required'. But there could be no lanes.
     * @param insertData: the data to be submitted.
     * @returns {{isValid: boolean, message: string}}
     */
    validate(insertData) {
        return {
            isValid: Object.keys(insertData.lanes).length !== 0,
            message: "At least one non-empty lane is required",
        }
    }

    /**
     * Submit the form for insert/update.
     *
     * Ideally, use RRF system to mark the form as submitted:
     * ```store.dispatch(actions.submit(this.modelName, this.submit(insertData)));```
     * - If `this.submit(values)` fails, sets `.submitFailed` and `.errors` on the model.
     * - If it succeeds, set `.submitted` and `.validity` on the model.
     *  Ex: http://codepen.io/davidkpiano/pen/c683e0cf7ee54736b49b2ce30aba956f?editors=0010
     * But I can't understand it, so let's do it simpler for now.
     **/
    onSubmit(values) {
        let insertData = this.formatInsertData(values);
        let validation = this.validate(insertData);
        if (validation.isValid) {
            forms.submitForm(this.modelName, insertData, this.table, this.form);
        } else {
            this.props.feedbackWarning(this.form, validation.message);
        }
    }

    activateForm() {
        this.setState({ disabled: false });
    }
    deactivateForm() {
        this.setState({ disabled: true });
    }

    render() {
        let formFields = forms.makeFormFields(this.modelName, this.model, this.state.disabled, this.props.options);

        return (
            <div>

                <Feedback reference={this.form} />

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {formFields}

                    {/* Sub-form */}

                    <div className="clearfix"/>

                    <LanesSubForm disabled={this.state.disabled} />

                    <SubmitButton
                        disabled={this.state.disabled}
                        activateForm={this.activateForm}
                        deactivateForm={this.deactivateForm}
                    />

                </Form>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    let options = forms.optionsFromModel(state, runsModel);
    let formData = state.facilityDataForms.runs;
    let formModel = state.facilityDataForms.forms.runs;
    return {
        formData: formData,
        formModel: formModel,
        options: options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestInstruments,
        requestFlowcellTypes,
        requestRunsTypesLengths,
        requestSequencingKitVersions,
        requestLibrariesForProject,
        feedbackWarning,
        }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RunsInsertForm);

