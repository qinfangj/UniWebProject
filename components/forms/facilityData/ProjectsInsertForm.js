"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';

import { requestLaboratories, requestProjectStates } from '../../actions/actionCreators/optionsActionCreators';

import * as forms from '../forms.js';
import * as feedback from '../../../utils/feedback';
import projectsModel from './formModels/projectsModel';
import SubmitButton from '../SubmitButton';




export class ProjectsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "projects";
        this.modelName = "facilityDataForms.projects";
        this.model = projectsModel;
        this.state = {
            disabled: false,
        };
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, null);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestLaboratories();
        this.props.requestProjectStates();
    }

    onSubmit(values) {
        let insertData = forms.formatFormFieldsDefault(this.model, values);
        let validation = forms.validateFormDefault(insertData);
        if (validation.isValid) {
            forms.submitForm(this.modelName, insertData, this.table);
        } else {
            feedback.warning(validation.message, "ProjectsInsertForm::onSubmit");
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
    let formData = state.facilityDataForms.projects;
    let formModel = state.facilityDataForms.forms.projects;
    return {
        options: state.options,
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestLaboratories,
        requestProjectStates,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsInsertForm);

