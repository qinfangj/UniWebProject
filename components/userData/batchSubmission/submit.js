"use strict";
import React from 'react';
import store from '../../../core/store';
import { batchInsertAsync } from '../../actions/actionCreators/userDataActionCreators';
import { dateNow, parseDateString } from '../../../utils/time';
import { hashHistory } from 'react-router';
import { actions } from 'react-redux-form';
import * as feedback from '../../../utils/feedback';


/**
 * Batch submission from User Data section.
 *
 * @param modelName: RRF form model name.
 * @param insertData: data to insert.
 * @param table: db table name for insert.
 * @param formName: from constants.formNames, to identify the origin of feedbacks.
 */
export function submit(modelName, insertData, table, formName) {
    if (confirm("Are you sure that you want to submit the data?")) {
        console.info("Values to submit: ", insertData);
        insertData.createdAt = dateNow();
        store.dispatch(batchInsertAsync(table, insertData, null))
            .done((response) => {
                console.debug(200, "Inserted IDs <"+ response.join(",") +">");
                // Signal that it worked
                feedback.success("Successfully inserted <"+response.join(",")+">", "???::submit");
                // Clear the form data in store
                store.dispatch(actions.reset(modelName));
                // let currentPath = window.location.pathname + window.location.hash.substr(2);
                hashHistory.push("/facility/"+ table);
            })
            .fail((error) => {
                console.warn("Form validation error: ", error);
                //feedback.error("", error, "???::submit");
            });
    }
}


export default submit;


