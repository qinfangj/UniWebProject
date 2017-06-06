"use strict";
import React from 'react';
import store from '../../core/store';
import _ from 'lodash';
import { insertAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../actions/actionCreators/feedbackActionCreators';
import { findForUpdateAsync, findByIdAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { resetForm } from '../actions/actionCreators/formsActionCreators';
import { dateNow, parseDateString } from '../../utils/time';
import { hashHistory } from 'react-router';
import { actions } from 'react-redux-form';

import css from './forms.css';
import cx from 'classnames';
import RRFInput from './bootstrapWrappers/RRFInput.js';
import inputTypes from './inputTypes';
import { Col } from 'react-bootstrap/lib';



/**
 * If there is an *updateId*, fetch data relative to this object in the given *table* from backend.
 * Otherwise, reset the form.
 * @param modelName: RRF model name that we want to merge the update data with.
 * @param table: db table name.
 * @param updateId: the id of the element to get data for.
 * @param onUpdated((data) => ...): callback function that will execute after the update data is received.
 */
export function newOrUpdate2(modelName, table, updateId, onUpdated){
    let currentPath = window.location.pathname + window.location.hash.substr(2);
    if (currentPath.endsWith('/new')) {
        store.dispatch(actions.reset(modelName));
    } else if (updateId) {
        store.dispatch(findByIdAsync(table, updateId))
        .done((data) => {
            console.log("Update with values:", data);
            store.dispatch(actions.merge(modelName, data));
            if (onUpdated) {
                onUpdated(data);
            }
        });
    }
}


/**
 * Get all field values for one form from the store, as an object {field: value}.
 * `value` is null if the field is not valid.
 */
export function getFormData(form) {
    let storedForm = store.getState().forms[form];
    let storedValid = store.getState().forms[form]._isValid;
    let formData = {};
    for (let key of Object.keys(storedForm)) {
        let valid = storedValid[key];
        if (valid === false) {
            formData[key] = null;
            formData._isValid[key] = false;
        } else {
            let value = storedForm[key];
            // Don't double escape multiline strings
            if (typeof value === "string") {
                value = value.replace("\\n", "\n");
            }
            formData[key] = value;
        }
        /* DON'T DO THIS:
             formData[key] = valid ? storedForm[key] : null;
           because if the value is null the key is added to the object (unlike undefined).
           and we don't want to submit everything we get from a backend row, or things like '_valid'.
        */
    }
    return formData;
}

/**
 * Send the `formData` for insert or update of db `table`.
 * A custom formatter `formatFormData` can be given to transform the data before submission.
 * Return an object `{invalid: (bool), submissionError: (bool), submissionFuture: (Promise)}`.
 */
export function submit(form, table, formatFormData=null) {
    let formData = getFormData(form);
    let fields = Object.keys(formData);
    let submissionFuture = null;
    // Check if some fields have an invalid value
    let invalidFields = fields.filter(k => formData._isValid[k] === false);
    // Print it with _isValid status, before formatting, and with invalid values set to null
    console.info(JSON.stringify(formData, null, 2));
    delete formData._isValid;
    // Invalid form: don't submit, return an error
    if (invalidFields.length !== 0) {
        store.dispatch(feedbackWarning(form, "Some required fields are missing or ill-formatted. Please review the form and submit again."));
// Valid form: format and send
    } else {
        //before submission show the dialoge for confirm
        if (confirm("Are you sure that you want to submit the data?")) {
            if (formatFormData) {
                formData = formatFormData(formData);
            }
            // CreatedAt: reformat so that it can be parsed as java.sql.Timestamp.
            // Updated at: if update, set to current timestamp.
            if (formData.id && formData.id !== 0) {
                formData.updatedAt = dateNow();
                if (formData.createdAt) {
                    formData.createdAt = parseDateString(formData.createdAt);
                }
            }
            console.info(JSON.stringify(formData, null, 2));
            submissionFuture = store.dispatch(insertAsync(table, formData));
            submissionFuture
                .done((insertId) => {
                    // Signal that it was a success
                    console.debug(200, "Inserted ID <" + insertId + ">");
                    // Clear the form data in store
                    store.dispatch(feedbackSuccess(form, "Inserted ID <" + insertId + ">"));
                    store.dispatch(resetForm(form));
                    // Redirect to table by replacing '/new' by '/list' in the router state
                    let currentPath = window.location.pathname + window.location.hash.substr(2);
                    hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                })
                .fail((err) => {
                    console.warn("Uncaught form validation error");
                    store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                });
        }
    }
}

/**
 *
 * @param modelName: RRF form model name.
 * @param insertData: data to insert.
 * @param table: db table name for insert.
 * @param formName: from constants.formNames, to identify the origin of feedbacks.
 */
export function submitForm(modelName, insertData, table, formName) {
    if (confirm("Are you sure that you want to submit the data?")) {
        console.info("Values to submit: ", JSON.stringify(insertData, null, 2));
        // Created at: reformat so that it can be parsed as java.sql.Timestamp.
        // Updated at: if update, set to current timestamp.
        if (insertData.id && insertData.id !== 0) {
            insertData.updatedAt = dateNow();
            if (insertData.createdAt) {
                insertData.createdAt = parseDateString(insertData.createdAt);
            }
        }
        store.dispatch(insertAsync(table, insertData, null))
            .done((response) => {
                console.debug(200, "Inserted ID <"+ response +">");
                // Signal that it worked
                store.dispatch(feedbackSuccess(formName, "Successfully inserted <"+response+">"));
                // Clear the form data in store
                store.dispatch(actions.reset(modelName));
                // Redirect to table by replacing '/new' by '/list' in the router state
                let currentPath = window.location.pathname + window.location.hash.substr(2);
                hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
            })
            .fail((error) => {
                console.warn("Uncaught form validation error: ", error);
                store.dispatch(feedbackError(formName, "", error));
            });
    }
}

/**
 * Cast numeric values before we can submit. RRF apparently uses only strings and booleans.
 */
export function formatFormFieldsDefault(formModel, values) {
    let insertData = _.cloneDeep(values);  // because `values` is immutable
    for (let field of Object.keys(formModel)) {
        let model = formModel[field];
        let itype = model.inputType;
        let val = insertData[field];
        console.log(field, val, itype)
        if (model.type === "number" || itype === inputTypes.NUMBER || itype === inputTypes.DROPDOWN || itype === inputTypes.SEC_DROPDOWN || itype === inputTypes.MULTIPLE_SELECT) {
            // If not defined, don't submit.
            if (val === "") {
                delete insertData[field];
            } else {
                insertData[field] = parseInt(val)
            }
        }
        else if (itype === inputTypes.CHECKBOX) {
            insertData[field] = val === true || val === "true";
        }
    }
    return insertData;
}
/**
 * Default form validator.
 * @param values: Form data submitted for insert/update.
 * @returns {{isValid: boolean, message: string}}
 */
export function validateFormDefault(values) {
    return {
        isValid: true,
        message: "",
    };
}


/* CONSTRUCTION */


/**
 * From a RRF form model, construct an array of input components.
 * @param formModelName: RRF form model name.
 * @param formModel: the RRF store state for the form values.
 * @param disabled: boolean, to force the form to be disabled.
 * @param options: object {field: [options]} that gives the list of options for a select input named *field*.
 * @param changeActions: object {field: fct} to override the onChange handler of an input named *field*.
 * @returns {Array}
 */
export function makeFormFields(formModelName, formModel, disabled = false, options = {}, changeActions = {}) {
    let formFields = [];
    for (let modelName of Object.keys(formModel)) {
        let model = formModel[modelName];
        let {inputType, optionsKey, ...otherProps} = model;
        otherProps.key = modelName;
        otherProps.disabled = model.disabled || disabled;
        // otherProps.submissionError = formState[modelName].submitFailed && formState[modelName].validated && (! formState[modelName].valid);
        if (optionsKey) {
            otherProps.options = options[optionsKey] || [];
        }
        if (changeActions[modelName]) {
            otherProps.changeAction = changeActions[modelName];
        }
        formFields.push(
            <Col key={modelName} sm={model.width} className={cx(css.col)}>
                <RRFInput inputType={inputType} modelName={formModelName +'.'+ modelName} {...otherProps} />
            </Col>
        );
    }
    return formFields;
}

/**
 * In `mapStateToProps`, create an object *options* which keys are options store keys and values are
 * the options lists for select inputs.
 * @param formModel: the description of the form fields, as in /formModels.
 */
export function optionsFromModel(state, formModel) {
    let options = {};
    for (let field of Object.keys(formModel)) {
        let model = formModel[field];
        if (model.optionsKey) {
            options[model.optionsKey] = state.options[model.optionsKey] || [];
        }
    }
    return options;
}
