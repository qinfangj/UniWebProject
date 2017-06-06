"use strict";
import React from 'react';
import store from '../../core/store';
import { batchInsertAsync } from '../actions/actionCreators/userDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../actions/actionCreators/feedbackActionCreators';
import { dateNow, parseDateString } from '../../utils/time';
import { hashHistory } from 'react-router';
import { actions } from 'react-redux-form';


/**
 *
 * @param modelName: RRF form model name.
 * @param insertData: data to insert.
 * @param table: db table name for insert.
 * @param formName: from constants.formNames, to identify the origin of feedbacks.
 */
export function submit(modelName, insertData, table, formName) {
    if (confirm("Are you sure that you want to submit the data?")) {
        console.info("Values to submit: ", insertData);
        /*
        // Created at: reformat so that it can be parsed as java.sql.Timestamp.
        // Updated at: if update, set to current timestamp.
        if (insertData.id && insertData.id !== 0) {
            insertData.updatedAt = dateNow();
            if (insertData.createdAt) {
                insertData.createdAt = parseDateString(insertData.createdAt);
            }
        }
        */
        store.dispatch(batchInsertAsync(table, insertData, null))
            .done((response) => {
                console.debug(200, "Inserted IDs <"+ response.join(",") +">");
                // Signal that it worked
                store.dispatch(feedbackSuccess(formName, "Successfully inserted <"+response.join(",")+">"));
                // Clear the form data in store
                store.dispatch(actions.reset(modelName));
                // let currentPath = window.location.pathname + window.location.hash.substr(2);
                hashHistory.push("/data/"+ table);
            })
            .fail((error) => {
                console.warn("Uncaught form validation error: ", error);
                store.dispatch(feedbackError(formName, "", error));
            });
    }
}


export default submit;


