"use strict";
import React from 'react';
import store from '../../../core/store';

import { deleteAsync, validateUserAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import { hashHistory } from 'react-router';


/**
 * Validate a user: change its "isValidated" property to 1, and gives him a "customer" role.
 * @param formName
 */
export function userValidate(updateId, username, isUpdate, feedbackRef) {
    if (confirm("Are you sure that you want to activate this user?")) { // Clic sur OK
        if (username) {
            store.dispatch(validateUserAsync({ username }))
                .done((validateId) => {
                    console.debug(200, "Validated ID <" + validateId + ">");
                    store.dispatch(feedbackSuccess(feedbackRef, "Validated user <" + username + ">"));
                    if (isUpdate) {
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        hashHistory.push(currentPath.replace('/update/' + updateId, '/list'));
                    }
                })
                .fail((err) => {
                    console.warn("Uncaught form validation error");
                    store.dispatch(feedbackError(feedbackRef, "Uncaught form validation error", err));
                });
        }
    }
}


/**
 * Delete a user, with confirmation.
 * @param formName: for feedback.
 * @param table
 * @param userId
 */
export function userDelete(userId, feedbackRef){
    if (confirm("Are you sure to delete this user?")) {
        store.dispatch(deleteAsync("users", userId))
            .done((deleteId) => {
                console.debug(200, "Delete <" + deleteId + "> records")
                store.dispatch(feedbackSuccess(feedbackRef, "Delete <" + deleteId + "> records"));
                let currentPath = window.location.pathname + window.location.hash.substr(2);
                hashHistory.push(currentPath.replace('/update/' + userId, '/list'));
                //store.dispatch(actions.load())  // does nothing?
                //hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
            })
            .fail((err) => {
                console.warn("Uncaught form validation error");
                store.dispatch(feedbackError(feedbackRef, "Uncaught form validation error", err));
            });
    }
}

