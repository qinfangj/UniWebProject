"use strict";
import React from 'react';
import store from '../../core/store';
import css from './forms.css';
import cx from 'classnames';
import _ from 'lodash';

import { insertAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { findByIdAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { dateNow, parseDateString } from '../../utils/time';
import { hashHistory } from 'react-router';
import { actions } from 'react-redux-form';

import * as feedback from '../../utils/feedback';
import RRFInput from './bootstrapWrappers/RRFInput.js';
import inputTypes from '../constants/inputTypes';
import { Col } from 'react-bootstrap/lib';

import { resetAllOptions } from '../actions/actionCreators/optionsActionCreators';



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
        return store.dispatch(actions.reset(modelName));
    } else if (updateId) {
        return store.dispatch(findByIdAsync(table, updateId))
            .done((data) => {
                console.log("Update with values:", data);
                store.dispatch(actions.merge(modelName, data));
                // Need to reset validaity manually because of a bug in RRF:
                // https://github.com/davidkpiano/react-redux-form/issues/836
                store.dispatch(actions.resetValidity(modelName));
                if (onUpdated) {
                    onUpdated(data);
                }
            });
    }
}

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
export function submitForm(modelName, insertData, table, onSuccess, isAttribute = false) {
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
                /* Signal that it worked */
                let itype = isUpdate ? "updated" : "inserted";
                feedback.success("Successfully "+itype+" <"+response+">", "submitForm");
                console.debug(200, itype+" ID <"+response+">");
                /* Clear the form data in store */
                store.dispatch(actions.reset(modelName));
                /* If admin form, clear cached options lists */
                if (isAttribute) {
                    store.dispatch(resetAllOptions());
                }
                /* Redirect to table by replacing '/new' by '/list' in the router state */
                let currentPath = window.location.pathname + window.location.hash.substr(2);
                hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                if (onSuccess) {
                    onSuccess(response);
                }
                return response;
            })
            .fail((error) => {
                console.warn("Form validation error: ", error);
                //feedback.error("", error, "submitForm");
                return error;
            });
    }
}

/**
 * Cast numeric values before we can submit. RRF apparently uses only strings and booleans.
 */
export function formatFormFieldsDefault(formModel, values) {
    let insertData = _.cloneDeep(values);  // because `values` is immutable
    formModel.fields.forEach((model) => {
        let itype = model.inputType;
        let field = model.name;
        let val = insertData[field];
        if (model.type === "number" || itype === inputTypes.NUMBER) {
            // If not defined, don't submit.
            if (val === "") {
                delete insertData[field];
            } else {
                insertData[field] = parseFloat(val);
            }
        } else if (itype === inputTypes.DROPDOWN || itype === inputTypes.SEC_DROPDOWN || itype === inputTypes.MULTIPLE_SELECT) {
            // If not defined, don't submit.
            if (val === "") {
                delete insertData[field];
            } else {
                insertData[field] = parseInt(val);
            }
        }
        else if (itype === inputTypes.CHECKBOX) {
            insertData[field] = val === true || val === "true";
        }
    });
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


/* FORMS CONSTRUCTION HELPERS */


/**
 * From a RRF form model, construct an array of input components,
 * grouped in Forms by groups of 12 Col widths.
 * @param formModelName: RRF form model name.
 * @param formModel: the RRF store state for the form values.
 * @param disabled: boolean, to force the form to be disabled.
 * @param options: object {field: [options]} that gives the list of options for a select input named *field*.
 * @param changeActions: object {field: fct} to override the onChange handler of an input named *field*.
 * @returns {Array}
 */
export function makeFormFields(formModelName, formModel, disabled = false, options = {}, changeActions = {}) {
    let formFields = formModel.fields.map((model) => {
        let modelName = model.name;
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
        return (
            <Col key={modelName} sm={model.width} className={cx(css.col)}>
                <RRFInput id={modelName} inputType={inputType} modelName={formModelName +'.'+ modelName} {...otherProps} />
            </Col>
        );
    });
    let formGroups = [];
    let sum = 0;  // sum of the Col widths
    let first = 0;  // index of the first Col to put in a group
    formModel.fields.forEach((model, i) => {
        let w = model.width;
        sum += w;
        if (sum % 12 === 0) {
            formGroups.push(<div className={css.formRow} key={'formrow'+i}>
                {formFields.slice(first, i+1)}
            </div>);
            formGroups.push(<div key={'cf'+i} className="clearfix"/>);
            first = i+1;
        }
    });
    return formGroups;
}

/**
 * Same as above but for Admin forms, which for historical reasons have a different model format.
 */
export function makeAdminFormFields(formModel, disabled = false, options = {}, changeActions = {}) {
    let formFields = formModel.fields.map((model) => {
        let {name, inputType, optionsKey, ...otherProps} = model;
        otherProps.key = name;
        otherProps.disabled = model.disabled || disabled;
        // otherProps.submissionError = formState[modelName].submitFailed && formState[modelName].validated && (! formState[modelName].valid);
        if (optionsKey) {
            otherProps.options = options[optionsKey] || [];
        }
        if (changeActions[name]) {
            otherProps.changeAction = changeActions[name];
        }
        // modelName is `"adminForms."+ formModel.model +"."+ name`, but we put only `"."+ name`
        return (
            <Col key={model.name} sm={model.width} className={cx(css.col)}>
                <RRFInput id={name} inputType={inputType} modelName={"."+ name} {...otherProps} />
            </Col>
        );
    });
    return formFields;
}
