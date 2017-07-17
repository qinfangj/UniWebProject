"use strict";
import React from 'react';
import css from '../forms.css';
import admincss from './adminForm.css';
import { withRouter } from 'react-router';
import store from '../../../core/store';
import tableNames from '../../tables/tableNames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAllProjects,
    requestAllPeople,
    requestLaboratories,
    requestReadLengths,
    requestRunTypes } from '../../actions/actionCreators/optionsActionCreators';

import * as forms from '../forms';
import * as users from './users';
import adminDataModels from './adminDataModels';

import Feedback from '../../utils/Feedback';
import { Form } from 'react-redux-form';
import { Button } from 'react-bootstrap/lib';
import SubmitButton from '../SubmitButton';


/*
 * - state.username is never changed unless form is submitted.
 * - username should be handled by state
 * - get initial isValidated from update data
 */



class CommonAdminForms extends React.Component {
    constructor(props) {
        super(props);

        this.table = this.props.table;
        this.model = adminDataModels;
        const modelName = "adminForms.";
        this.modelName = modelName.concat(adminDataModels[this.props.table].model);

        this.state = {
            isValidated: false,
            username: null,
            disabled: false,
        };
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentWillMount() {
        let onUpdate = null;
        if (this.table === tableNames.RUN_TYPES_LENGTHS) {
            store.dispatch(requestRunTypes());
            store.dispatch(requestReadLengths());
        } else if (this.table === tableNames.PROJECT_SHARINGS) {
            store.dispatch(requestAllProjects());
            store.dispatch(requestAllPeople());
        } else if (this.table === tableNames.USERS) {
            store.dispatch(requestLaboratories());
            onUpdate = this.onUserUpdate.bind(this);
        }
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, onUpdate);
        if (this.isUpdate()) {
            this.setState({ disabled: true });
        }
    }

    handleSubmit(values){
        let formData = forms.formatFormFieldsDefault(adminDataModels[this.props.table], values);
        /* Formatter: should be somewhere else */
        if (this.table === tableNames.USERS){
            formData = users.formatUsersData(formData);
            // change isValidated state to show button or not
            this.setState({ isValidated: formData.isvalidated });  // does it even do anything??
        }
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

    /************ USERS TABLE SPECIFIC ************/

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
        if (this.table === tableNames.USERS && this.isUpdate() && !this.state.isValidated) {
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
        if (this.table === tableNames.USERS && this.isUpdate()) {
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

    /********* END USERS TABLE SPECIFIC ***********/

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
        requestAllProjects,
        requestAllPeople,
        requestLaboratories,
        requestReadLengths,
        requestRunTypes
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonAdminForms));

