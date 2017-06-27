"use strict";
import React from 'react';
import store from '../../core/store';
import _ from 'lodash';
import { insertAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../actions/actionCreators/feedbackActionCreators';
import { findByIdAsync } from '../actions/actionCreators/facilityDataActionCreators';
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
export function newOrUpdate(modelName, table, updateId, onUpdated){
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
 *
 /**
 * Send the `formData` for insert or update of db `table`.
 * Return a jQuery promise.
 *
 * @param modelName: RRF form model name.
 * @param insertData: data to insert.
 * @param table: db table name for insert.
 * @param formName: from constants.formNames, to identify the origin of feedbacks.
 * @param onSuccess: callback to execute if the insert succeeded.
 */
export function submitForm(modelName, insertData, table, formName, onSuccess) {
    if (confirm("Are you sure that you want to submit the data?")) {
        console.info("Values to submit: ", JSON.stringify(insertData, null, 2));
        // Created at: reformat so that it can be parsed as java.sql.Timestamp.
        // Updated at: if update, set to current timestamp.
        let isUpdate = insertData.id && insertData.id !== 0;
        if (isUpdate) {
            insertData.updatedAt = dateNow();
            if (insertData.createdAt) {
                insertData.createdAt = parseDateString(insertData.createdAt);
            }
        }
        return store.dispatch(insertAsync(table, insertData, null))
            .done((response) => {
                console.debug(200, "Inserted ID <"+ response +">");
                // Signal that it worked
                store.dispatch(feedbackSuccess(formName, "Successfully inserted <"+response+">"));
                // Clear the form data in store
                store.dispatch(actions.reset(modelName));
                // Redirect to table by replacing '/new' by '/list' in the router state
                let currentPath = window.location.pathname + window.location.hash.substr(2);
                hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                if (onSuccess) {
                    onSuccess(response);
                }
                return response;
            })
            .fail((error) => {
                console.warn("Uncaught form validation error: ", error);
                store.dispatch(feedbackError(formName, "", error));
                return error;
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


/* FORMS CONSTRUCTION */


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
