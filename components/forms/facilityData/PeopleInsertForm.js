"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';
import { feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import * as forms from '../forms.js';
import formNames from '../../constants/formNames';
import peopleModel from './formModels/peopleModel';

import Feedback from '../../utils/Feedback';
import SubmitButton from '../SubmitButton';



export class ProjectInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "people";
        this.form = formNames.PEOPLE_INSERT_FORM;
        this.modelName = "facilityDataForms.people";
        this.model = peopleModel;
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
    }

    formatInsertData(values) {
        let insertData = forms.formatFormFieldsDefault(this.model, values);
        insertData.islaboratory = true;  // add
        return insertData;
    }

    onSubmit(values) {
        let insertData = this.formatInsertData(values);
        let validation = forms.validateFormDefault(insertData);
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
        let formFields = forms.makeFormFields(this.modelName, this.model, this.state.disabled, {});

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
    let formData = state.facilityDataForms.people;
    let formModel = state.facilityDataForms.forms.people;
    return {
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        feedbackWarning,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectInsertForm);

