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
import adminDataModels from './adminDataModels';

import Feedback from '../../utils/Feedback';
import { Form } from 'react-redux-form';
import { Button } from 'react-bootstrap/lib';
import SubmitButton from '../SubmitButton';



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
        // submitForm(modelName, insertData, table, formName, onSuccess)
        forms.submitForm(this.modelName, formData, this.table, this.modelName, null);
        //submit.submit(this.modelName, formData, this.table, this.props.updateId);
    }

    userDelete(form, table, userId){

        //userDelete(this, this.table, this.props.updateId);

        if (confirm("Are you sure to delete this user?")) { // Click on OK
            if (userId) {

                let future = store.dispatch(deleteAsync(table, userId));
                future
                    .done((deleteId) => {
                        console.debug(200, "Delete <" + deleteId + "> records")
                        store.dispatch(feedbackSuccess(form, "Delete <" + deleteId + "> records"));
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        if (userId !== '' || userId !== undefined) {
                            this.props.router.push(currentPath.replace('/update/' + userId, '/list'));
                        }
                        //store.dispatch(actions.load())  // does nothing?
                        //hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                    })
                    .fail((err) => {
                        console.warn("Uncaught form validation error");
                        store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                    });
            }
        }
    }

    userValidate(form){
        if (confirm("Are you sure that you want to activate this user?")) { // Clic sur OK
            if (this.state.username) {
                let future = store.dispatch(validateUserAsync({username:this.state.username}));
                future
                    .done((validateId) => {
                        console.debug(200, "Validated ID <" + validateId + ">");
                        store.dispatch(feedbackSuccess(form, "Validated user <" + this.state.username + ">"));
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        if (this.props.updateId !== '' || this.props.updateId !== undefined) {
                            this.props.router.push(currentPath.replace('/update/' + this.props.updateId, '/list'));
                        }
                    })
                    .fail((err) => {
                        console.warn("Uncaught form validation error");
                        store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                    });
            }
        }
    }

    activateForm() {
        this.setState({ disabled: false });
    }
    deactivateForm() {
        this.setState({ disabled: true });
    }

    render() {
        let formModel = adminDataModels[this.props.table];
        let formFields = forms.makeAdminFormFields(formModel, this.state.disabled, this.props.options);
        let showUsersButtons = this.table === tableNames.USERS && this.state.isInsert && this.props.updateId && !this.state.isValidated;
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
                            onClick={this.userValidate.bind(this,this.modelName)}>
                        Validate
                    </Button>
                    : null}
                { showUsersButtons ?
                    <Button
                            bsStyle="primary" className={admincss.button} type = "button"
                            onClick={this.userDelete.bind(this,this.modelName, this.table, this.props.updateId)}>
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

