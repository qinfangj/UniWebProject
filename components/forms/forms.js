"use strict";
import React from 'react';
import store from '../../core/store';
import { insertAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../actions/actionCreators/feedbackActionCreators';
import { findForUpdateAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { resetForm } from '../actions/actionCreators/formsActionCreators';
import { dateNow, parseDateString } from '../../utils/time';
import { hashHistory } from 'react-router';


/**
 * All tables should either load update data if update ID is found in props,
 * or empty all form data if it is not.
 * This should be called both on mount and and receive props.
 */
export function newOrUpdate(form, table, updateId) {
    if (updateId) {
        store.dispatch(findForUpdateAsync(table, updateId, form));
    } else {
        store.dispatch(resetForm(form));
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

