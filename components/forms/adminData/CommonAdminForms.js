"use strict";
import React from 'react';
import css from '../forms.css';
import admincss from './adminForm.css';
import store from '../../../core/store';
import tableNames from '../../constants/tableNames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAllProjects,
    requestAllPeople,
    requestReadLengths,
    requestRunTypes,
    requestUHTSApplications
} from '../../actions/actionCreators/optionsActionCreators';

import * as forms from '../forms';
import adminDataModels from './adminDataModels';

import { Form } from 'react-redux-form';
import SubmitButton from '../SubmitButton';

import { deleteAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import { hashHistory } from 'react-router';
import * as feedback from '../../../utils/feedback';
import { Button } from 'react-bootstrap/lib';



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
        this.deleteProjectSharing = this.deleteProjectSharing.bind(this);
    }

    componentWillMount() {
        let onUpdate = null;
        if (this.table === tableNames.RUN_TYPES_LENGTHS) {
            store.dispatch(requestRunTypes());
            store.dispatch(requestReadLengths());
        } else if (this.table === tableNames.PROJECT_SHARINGS) {
            store.dispatch(requestAllProjects());
            store.dispatch(requestAllPeople());
        } else if (this.table === tableNames.LIB_PROTOCOLS) {
            store.dispatch(requestUHTSApplications())
        }
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, onUpdate);
        if (this.isUpdate()) {
            this.setState({ disabled: true });
        }
    }

    handleSubmit(values){
        let formData = forms.formatFormFieldsDefault(adminDataModels[this.props.table], values);
        /* Signature: submitForm(modelName, insertData, table, formName, onSuccess) */
        forms.submitForm(this.modelName, formData, this.table, null, true);
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

    deleteProjectSharing() {
        if (confirm("Are you sure to delete this project sharing data?")) {
            store.dispatch(deleteAsync(this.table, this.props.updateId))
                .done((deleteId) => {
                    console.debug(200, "Delete <" + deleteId + "> records");
                    feedback.success("Deleted <" + deleteId + "> records", "projectSharing.projectSharingDelete");
                    let currentPath = window.location.pathname + window.location.hash.substr(2);
                    hashHistory.push(currentPath.replace('/update/' + this.props.updateId, '/list'));
                    //store.dispatch(actions.load())  // does nothing?
                    //hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                })
                .fail((err) => {
                    console.warn("Uncaught form delete error");
                    //store.dispatch(feedbackError(this.modelName, "Uncaught form delete error", err));
                    feedback.error("Uncaught form delete error", err, "projectSharing.projectSharingDelete");
                });
        }
    }

    makeDeleteButton() {
       console.log(this.state.disabled);
       if (this.isUpdate() && !this.state.disabled) {
            return (
                <Button
                    bsStyle="primary" className={admincss.button}
                    onClick={this.deleteProjectSharing}>
                    Delete
                </Button>
            );
        } else {
            return null;
        }
    }

    render() {
        let formModel = adminDataModels[this.props.table];
        let formFields = forms.makeAdminFormFields(formModel, this.state.disabled, this.props.options);

        return (
            <Form model={this.modelName} className={css.form} onSubmit={(v) => {this.handleSubmit(v)}}>

                { formFields }

                <div className="clearfix"/>

                <SubmitButton
                    disabled={this.state.disabled}
                    activateForm={this.activateForm}
                    deactivateForm={this.deactivateForm}
                />

                { this.props.table === "project_sharings"? this.makeDeleteButton():null }
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
        requestRunTypes,
        requestUHTSApplications,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(CommonAdminForms);

