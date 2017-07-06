"use strict";
import React from 'react';
import store from '../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, actions } from 'react-redux-form';

import { requestPipelineAnalysisTypes,
         requestRunsOutputFolders,
         requestMappingTools } from '../../actions/actionCreators/optionsActionCreators';
import { requestBasecallingsForRun } from '../../actions/actionCreators/secondaryOptionsActionCreators';

import * as forms from '../forms.js';
import fields from '../../constants/fields';
import formNames from '../../constants/formNames';
import alignmentsModel from './formModels/alignmentsModel';

import Feedback from '../../utils/Feedback';
import SubmitButton from '../SubmitButton';



export class AlignmentsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "alignments";
        this.form = formNames.ALIGNMENTS_INSERT_FORM;
        this.model = alignmentsModel;
        this.modelName = "facilityDataForms.alignments";
        this.state = {
            disabled: false,
        };
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, this.onUpdateLoadBasecallingsOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestPipelineAnalysisTypes();
        this.props.requestRunsOutputFolders();
        this.props.requestMappingTools();
    }

    /**
     * When the update *data* comes, trigger the action to get libraries options lists
     * corresponding to the received runId (see newOrUpdate in componentWillMount).
     */
    onUpdateLoadBasecallingsOptions(data) {
        let refModelName = this.modelName +'.'+ fields.RUN_ID;
        this.props.requestBasecallingsForRun(refModelName, data[fields.RUN_ID]);
    }

    onSubmit(values) {
        let insertData = forms.formatFormFieldsDefault(this.model, values);
        forms.submitForm(this.modelName, insertData, this.table, this.form);
    }

    activateForm() {
        this.setState({ disabled: false });
    }
    deactivateForm() {
        this.setState({ disabled: true });
    }

    /**
     * Change the basecallings options list when the run changes.
     **/
    onRunChange(model, value) {
        store.dispatch(actions.change(model, value));
        this.props.requestBasecallingsForRun(model, value);
    }
    
    render() {
        let changeActions = {[fields.RUN_ID]: this.onRunChange.bind(this)};
        let formFields = forms.makeFormFields(this.modelName, this.model, this.state.disabled, this.props.options, changeActions);

        return (

            <div>

                <Feedback reference={this.form} />

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {formFields}

                    <div className="clearfix"/>

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
    let options = forms.optionsFromModel(state, alignmentsModel);
    let formData = state.facilityDataForms.alignments;
    return {
        formData: formData,
        options: options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestPipelineAnalysisTypes,
        requestRunsOutputFolders,
        requestMappingTools,
        requestBasecallingsForRun,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(AlignmentsInsertForm);

