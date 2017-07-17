"use strict";
import React from 'react';
import css from '../forms.css';
import admincss from './adminForm.css';
import store from '../../../core/store';
import tableNames from '../../constants/tableNames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAllPeople,
    requestLaboratories } from '../../actions/actionCreators/optionsActionCreators';

import * as forms from '../forms';
import * as users from './users';
import adminDataModels from './adminDataModels';

import Feedback from '../../utils/Feedback';
import { Form } from 'react-redux-form';
import { Button } from 'react-bootstrap/lib';
import SubmitButton from '../SubmitButton';


class UsersAdminForm extends React.Component {
    constructor(props) {
        super(props);

        this.table = tableNames.USERS;
        this.model = adminDataModels;
        const modelName = "adminForms.";
        this.modelName = modelName + adminDataModels[this.table].model;

        this.state = {
            isValidated: false,
            username: null,
            disabled: false,
        };
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.onUserUpdate = this.onUserUpdate.bind(this);
    }

    componentWillMount() {
        store.dispatch(requestLaboratories());
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, this.onUserUpdate);
        if (this.isUpdate()) {
            this.setState({ disabled: true });
        }
    }

    handleSubmit(values){
        let formData = forms.formatFormFieldsDefault(adminDataModels[this.table], values);
        formData = users.formatUsersData(formData);
        // change isValidated state to show button or not
        this.setState({ isValidated: formData.isvalidated });  // does it even do anything??
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

    onUserUpdate(data) {
        this.setState({
            username: data.login,
            isValidated: data.isvalidated,
        })
    }

    validateUser() {
        let updateId = this.props.updateId;
        let username = this.state.username;
        users.userValidate(updateId, username, this.isUpdate(), this.modelName);
    }

    deleteUser() {
        users.userDelete(this.props.updateId, this.modelName);
    }

    makeValidateUserButton() {
        if (this.isUpdate() && !this.state.isValidated) {
            return (
                <Button
                    bsStyle="primary" className={admincss.button}
                    onClick={this.validateUser}>
                    Validate
                </Button>
            );
        } else {
            return null;
        }
    }

    makeDeleteUserButton() {
        if (this.isUpdate()) {
            return (
                <Button
                    bsStyle="primary" className={admincss.button}
                    onClick={this.deleteUser}>
                    Delete
                </Button>
            );
        } else {
            return null;
        }
    }

    render() {
        let formModel = adminDataModels[this.table];
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

                { this.makeValidateUserButton() }
                { this.makeDeleteUserButton() }
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
        requestAllPeople,
        requestLaboratories,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(UsersAdminForm);

