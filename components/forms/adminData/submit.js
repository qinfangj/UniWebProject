"use strict";
import { actions } from 'react-redux-form';
import { insertAsync, deleteAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import store from '../../../core/store';
import adminData from './adminDataModels';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import { resetAllOptions } from '../../actions/actionCreators/optionsActionCreators';
import { timeNow, parseDateString } from '../../../utils/time';
import inputTypes from '../inputTypes';
import { hashHistory } from 'react-router';
import * as forms from '../forms';


//Format adminFormData as the adminFormConstants defined before submission
export function formatFormData(formData, table) {
    let fieldsNames = adminData[table].fields.map(s => {return s.name});

    Object.keys(formData).forEach(function (key, index) {

        if (fieldsNames.indexOf(key) > -1) {
            let ind = fieldsNames.indexOf(key);
            let itype = adminData[table].fields[ind].inputType;

            if (itype === inputTypes.DROPDOWN) {
                try {
                    formData[key] = parseInt(formData[key]);
                } catch (e) {
                    console.error("Could not parse "+ formData[key] +" as Int")
                }
            } else if (itype === inputTypes.CHECKBOX) {
                formData[key] = !!formData[key];
            }
        }
    });

    if (formData.id && formData.id !== 0) {
        formData.updatedAt = timeNow();
        if (formData.createdAt) {
            formData.createdAt = parseDateString(formData.createdAt);
        }
    }
    return formData
}

export function submit(formName, values, table, updateId) {

    let data = Object.assign({}, values);

    console.info(JSON.stringify(data, null, 2));

    if (confirm("Are you sure that you want to submit the data?")) {
        let formData = formatFormData(data, table);
        let submissionFuture = store.dispatch(insertAsync(table, formData));
        //state = Object.assign(state, {submissionError: false, submissionFuture: future});
        return submissionFuture
            .done((insertId) => {
                console.debug(200, "Inserted ID <" + insertId + ">");
                // Clear the form data in store
                store.dispatch(feedbackSuccess(formName, "Inserted ID <" + insertId + ">"));
                store.dispatch(actions.reset(formName));
                // Reset all options. Specific to admin forms!!
                store.dispatch(resetAllOptions());
                let currentPath = window.location.pathname + window.location.hash.substr(2);
                if (updateId === '' || updateId === undefined) {
                    hashHistory.push(currentPath.replace('/new', '/list'));
                } else {
                    hashHistory.push(currentPath.replace('/update/' + updateId, '/list'));
                }
            })
            .fail((err) => {
                console.warn("Uncaught form validation error");
                store.dispatch(feedbackError(formName, "Uncaught form validation error", err));
            });
    }

}
