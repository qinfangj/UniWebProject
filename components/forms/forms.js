"use strict";
import React from 'react';
import store from '../../core/store';
import _ from 'lodash';
import { insertAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { changeFormValue } from '../actions/actionCreators/formsActionCreators';


export const defaultFormState = {
    serverError: {},
    submissionError: false,
    submissionSuccess: false,
    submissionId: undefined,
};

export function initForm(form) {
    if (! store.getState().forms[form]) {
        store.getState().forms[form] = {};
        store.getState().forms[form]._isValid = {};
    }
}
export function initFormField(form, field, value=null, valid) {
    if (! store.getState().forms[form][field]) {
        store.getState().forms[form][field] = value;
        store.getState().forms[form]._isValid[field] = valid;
    }
}

/**
 * Get the value of that input from the store.
 */
export function getFormValue(form, field) {
    let storeData = store.getState().forms[form];
    if (storeData) {
        return storeData[field];
    }
}
export function changeValue(form, field, value, valid) {
    if (form !== undefined) {
        store.dispatch(changeFormValue(form, field, value, valid));
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
    let state = {serverError: {}};
    let formData = getFormData(form);
    let fields = Object.keys(formData);
    // Check if some fields have value are invalid
    let invalidFields = fields.filter(k => formData._isValid[k] === false);
    console.info(JSON.stringify(formData, null, 2));
    delete formData._isValid;
    // Invalid form: don't submit, return an error
    if (invalidFields.length !== 0) {
        let invalid = _.zipObject(invalidFields, new Array(invalidFields.length).fill(true));
        state = Object.assign(state, {invalid, submissionError: true});
    // Valid form: send
    } else {
        if (formatFormData) {
            formData = formatFormData(formData);
        }
        console.info(JSON.stringify(formData, null, 2));
        let future = store.dispatch(insertAsync(table, formData));
        state = Object.assign(state, {submissionError: false, submissionFuture: future});
        future
            .done((insertId) => console.debug(200, "Inserted ID <"+insertId+">"))
            .fail(() => console.warn("Uncaught form validation error"));
    }
    return state;
}

