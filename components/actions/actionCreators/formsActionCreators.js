"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { assertStoreKey, asyncAction } from './base';
import formNames from '../../constants/formNames';
import dataStoreKeys from '../../constants/dataStoreKeys';
import tableNames from '../../tables/tableNames';
import fields from '../../forms/fields';



export function changeFormValue(form, field, value, valid) {
    return (dispatch) => {

        // Samples secondary select in User requests form
        if (form === formNames.USER_REQUESTS_INSERT_FORM && field === fields.PROJECT_ID) {
            let dataStoreKey = form +'_'+ dataStoreKeys.SAMPLES_FOR_PROJECT;
            dispatch(getSecondaryOptionsListAsync(tableNames.SAMPLES, value, dataStoreKey));

        // Basecallings (output folder) select in Alignments form
        } else if (form === formNames.ALIGNMENTS_INSERT_FORM && field === fields.RUN_ID) {
            let dataStoreKey = form +'_'+ dataStoreKeys.BASECALLINGS_OUTPUT_FOLDERS_FOR_RUN;
            dispatch(getSecondaryOptionsListAsync(tableNames.BASECALLINGS, value, dataStoreKey));

        /* For the next two, the field is not enough: there are several in one form.
            So rather check that the field contains "projectId", then append the field name to the
            store key so that it is unique to the reference field.
            "secondarySelects" are programmed to read from these keys with appended field name
            when passed the field name as "refFieldName".
         */

        // Library pools select in Runs form
        } else if (form === formNames.RUNS_INSERT_FORM && field.indexOf(fields.PROJECT_ID) >= 0) {
            let dataStoreKey = form +'_'+ dataStoreKeys.POOLS_FOR_PROJECT +'_'+ field;
            dispatch(getSecondaryOptionsListAsync(tableNames.USER_REQUESTS, value, dataStoreKey));

        // Libraries select in Runs and Bioanalysers *sub* forms
        } else if ((form === formNames.RUNS_INSERT_FORM || form === formNames.BIOANALYSERS_INSERT_FORM)
                    && field.indexOf(fields.PROJECT_ID) >= 0) {
            let dataStoreKey = form +'_'+ dataStoreKeys.LIBRAIRIES_FOR_PROJECT +'_'+ field;
            dispatch(getSecondaryOptionsListAsync(tableNames.LIBRARIES, value, dataStoreKey));
        }

        return dispatch({
            type: types.forms.CHANGE_FORM_VALUE,
            form: form,
            field: field,
            value: value,
            valid: valid,
        });
    };
}

export function resetForm(form) {
    return {
        type: types.forms.RESET_FORM,
        form: form,
    }
}

/* Select options. */

export function getOptionsListAsync(tableName, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getOptionsList.bind(null, tableName), args)
}

export function getConditionalOptionsListAsync(tableName, suffix, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}

export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.forms.GET_SECONDARY_OPTIONS_LIST, RestService.getSecondaryOptionsList.bind(null, tableName, id), args)
}

/* Feedback */

export function resetFeedback(form) {
    return {
        type: types.forms.FORM_FEEDBACK_RESET,
        form: form,
    }
}

export function formSubmissionSuccess(form, msg) {
    return {
        type: types.forms.FORM_SUBMISSION_SUCCESS,
        form: form,
        msg: msg,
    };
}

export function formServerError(form, error, msg) {
    return {
        type: types.forms.FORM_SERVER_ERROR,
        form: form,
        error: error,
        msg: msg,
    };
}

export function formSubmissionError(form, error, msg) {
    return {
        type: types.forms.FORM_SUBMISSION_ERROR,
        form: form,
        error: error,
        msg: msg,
    };
}

