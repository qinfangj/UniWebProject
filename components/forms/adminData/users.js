"use strict";
import React from 'react';
import store from '../../../core/store';

import { deleteAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import { validateUserAsync } from '../../actions/actionCreators/adminActionCreators';
import { hashHistory } from 'react-router';
import * as feedback from '../../../utils/feedback';


/*
 * Methods specific to Users insert form; to delete, validate, insert or update a user.
 */


/**
 * Validate a user: change its "isValidated" property to 1, and gives him a "customer" role.
 * @param formName
 */
export function userValidate(updateId, username, isUpdate, feedbackRef) {
    if (confirm("Are you sure that you want to activate this user?")) { // Clic sur OK
        store.dispatch(validateUserAsync({ username }))
            .done((validateId) => {
                console.debug(200, "Validated ID <" + validateId + ">");
                feedback.success("Validated user <" + username + ">", "users.userValidate");
                if (isUpdate) {
                    let currentPath = window.location.pathname + window.location.hash.substr(2);
                    hashHistory.push(currentPath.replace('/update/' + updateId, '/list'));
                }
            })
            .fail((err) => {
                console.warn("Uncaught form validation error");
                feedback.error("Uncaught form validation error", err, "users.userValidate");
            });
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
                console.debug(200, "Delete <" + deleteId + "> records");
                feedback.success("Deleted <" + deleteId + "> records", "users.userDelete");
                let currentPath = window.location.pathname + window.location.hash.substr(2);
                hashHistory.push(currentPath.replace('/update/' + userId, '/list'));
                //store.dispatch(actions.load())  // does nothing?
                //hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
            })
            .fail((err) => {
                console.warn("Uncaught form validation error");
                store.dispatch(feedbackError(feedbackRef, "Uncaught form validation error", err));
                feedback.error("Uncaught form validation error", err, "users.userDelete");
            });
    }
}


export function formatUsersData(formData) {
    //change key name: 'login' -> 'username'
    formData.username = formData.login;
    delete formData.login;
    return formData;
}
