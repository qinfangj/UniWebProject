"use strict";
import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import tableNames from '../../constants/tableNames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAllProjects,
    requestAllPeople,
    requestReadLengths,
    requestRunTypes } from '../../actions/actionCreators/optionsActionCreators';

import * as forms from '../forms';
import adminDataModels from './adminDataModels';

import Feedback from '../../utils/Feedback';
import { Form } from 'react-redux-form';
import SubmitButton from '../SubmitButton';



class CommonAdminForms extends React.Component {
    constructor(props) {
        super(props);

        this.table = this.props.table;
        this.model = adminDataModels;
        const modelName = "adminForms.";
        this.modelName = modelName + adminDataModels[this.props.table].model;

        this.state = {
            disabled: false,
        };
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
    }

    componentWillMount() {
        let onUpdate = null;
        if (this.table === tableNames.RUN_TYPES_LENGTHS) {
            store.dispatch(requestRunTypes());
            store.dispatch(requestReadLengths());
        } else if (this.table === tableNames.PROJECT_SHARINGS) {
            store.dispatch(requestAllProjects());
            store.dispatch(requestAllPeople());
        }
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, onUpdate);
        if (this.isUpdate()) {
            this.setState({ disabled: true });
        }
    }

    handleSubmit(values){
        let formData = forms.formatFormFieldsDefault(adminDataModels[this.props.table], values);
        /* Signature: submitForm(modelName, insertData, table, formName, onSuccess) */
        forms.submitForm(this.modelName, formData, this.table, this.modelName, null, true);
    }

    activateForm() {
        this.setState({ disabled: false });
    }
    deactivateForm() {
        this.setState({ disabled: true });
    }

    isUpdate() {
        let updateId = this.props.updateId;
        return updateId !== '' && updateId !== undefined;
    }

    render() {
        let formModel = adminDataModels[this.props.table];
        let formFields = forms.makeAdminFormFields(formModel, this.state.disabled, this.props.options);

        return (
            <Form model={this.modelName} className={css.form} onSubmit={(v) => {this.handleSubmit(v)}}>

                <Feedback reference={this.modelName} />

                { formFields }

                <div className="clearfix"/>

                <SubmitButton
                    disabled={this.state.disabled}
                    activateForm={this.activateForm}
                    deactivateForm={this.deactivateForm}
                />
            </Form>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        options: state.options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestAllProjects,
        requestAllPeople,
        requestReadLengths,
        requestRunTypes
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(CommonAdminForms);

