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

import { deleteAsync, validateUserAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';

import * as forms from '../forms';
import * as users from './users';
import adminDataModels from './adminDataModels';
import { hashHistory } from 'react-router';

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
            isValidated: undefined,
            username: "",
            disabled: false,
        };
        this.state.isInsert = this.props.updateId === '' || this.props.updateId === undefined;
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
    }

    componentWillMount() {
        if (this.table === tableNames.RUN_TYPES_LENGTHS) {
            store.dispatch(requestRunTypes());
            store.dispatch(requestReadLengths());
        } else if (this.table === tableNames.PROJECT_SHARINGS) {
            store.dispatch(requestAllProjects());
            store.dispatch(requestAllPeople());
        } else if (this.table === tableNames.USERS) {
            store.dispatch(requestLaboratories());
        }
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
    }

    handleSubmit(values){
        let formData = forms.formatFormFieldsDefault(adminDataModels[this.props.table], values);
        /* Formatter: should be somewhere else */
        if (this.table === tableNames.USERS){
            //change key name: 'login' -> 'username'
            formData.username = formData.login;
            delete formData.login;
            let isValidated = formData.isvalidated;
            this.setState({ isValidated });  // does it even do anything??
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

    render() {
        let updateId = this.props.updateId;
        let isUpdate = updateId !== '' && updateId !== undefined;
        let username = this.state.username;

        let formModel = adminDataModels[this.props.table];
        let formFields = forms.makeAdminFormFields(formModel, this.state.disabled, this.props.options);
        let showUsersButtons = isUpdate && this.table === tableNames.USERS && !this.state.isValidated;
        console.log(showUsersButtons, this.state.isInsert, updateId, this.state.isValidated)

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

                { showUsersButtons ?
                    <Button
                            bsStyle="primary" className={admincss.button} type = "button"
                            onClick={users.userValidate.bind(updateId, username, isUpdate, this.modelName)}>
                        Validate
                    </Button>
                    : null}
                { showUsersButtons ?
                    <Button
                            bsStyle="primary" className={admincss.button} type = "button"
                            onClick={users.userDelete.bind(updateId, this.modelName)}>
                        Delete
                    </Button>
                    : null}
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

