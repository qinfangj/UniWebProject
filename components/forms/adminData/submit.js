"use strict";
import { actions } from 'react-redux-form';
import { insertAsync, deleteAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import store from '../../../core/store';
import adminData from './adminDataModels';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import { timeNow, parseDateString } from '../../../utils/time';
import inputTypes from '../inputTypes';


//Format adminFormData as the adminFormConstants defined before submission
export function formatFormData(formData, table) {
    let fieldsNames = adminData[table].fields.map(s=> {return s.name});

    Object.keys(formData).forEach(function (key, index) {

        if (fieldsNames.indexOf(key) > -1) {
            let ind = fieldsNames.indexOf(key);

            if (adminData[table].fields[ind].type === inputTypes.DROPDOWN) {
                formData[key] = parseInt(formData[key]);
            } else if (adminData[table].fields[ind].type === inputTypes.CHECKBOX) {
                formData[key] = !!parseInt(formData[key]);
            }
        }
    });

    if (formData.id && formData.id !== 0) {
        formData.updatedAt = timeNow();
        if (formData.createdAt) {
            formData.createdAt = parseDateString(formData.createdAt);
        }
    }

    console.log(formData);
    return formData
}

export function submit(component, form, values, table, updateId, isInsert) {

    let state = {serverError: {}};
    let submissionFuture = null;

    let data = Object.assign({}, values);

    console.info(JSON.stringify(data, null, 2));

    if (!isInsert) {
        component.setState({isInsert:true});
    } else {
        if (confirm("Are you sure that you want to submit the data?")) {
            let formData = formatFormData(data, table);
            let submissionFuture = store.dispatch(insertAsync(table, formData));
            //state = Object.assign(state, {submissionError: false, submissionFuture: future});
            submissionFuture
                .done((insertId) => {
                    console.debug(200, "Inserted ID <" + insertId + ">");
                    // Clear the form data in store
                    store.dispatch(feedbackSuccess(form, "Inserted ID <" + insertId + ">"));
                    store.dispatch(actions.reset(form));
                    let currentPath = window.location.pathname + window.location.hash.substr(2);
                    if (updateId === '' || updateId === undefined) {
                        component.props.router.push(currentPath.replace('/new', '/list'));

                    } else {
                        component.props.router.push(currentPath.replace('/update/' + updateId, '/list'));

                    }
                })
                .fail(() => {
                    console.warn("Uncaught form validation error");
                    store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                });
        }
    }

}
