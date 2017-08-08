"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction } from './base';


export function deleteUnvalidatedUsers() {
    return dispatch => {
        dispatch({type: types.admin.DELETE_UNVALIDATED_REQUEST});

        return RestService.deleteUnvalidatedUsers()
            .then(response => {
                if (response >= 0 ) {
                    console.log(("response ok"))
                    dispatch(
                         {type: types.admin.DELETE_UNVALIDATED_SUCCESS}
                    );
                    return response;

                } else {
                    dispatch( {type: types.admin.DELETE_UNVALIDATED_FAILURE});
                    return Promise.reject(response);
                }
            }).catch(err => console.log('Error delete unvalidated users: ' + JSON.stringify(err, null, 2)));
    };
    //return asyncAction(types.DELETE_UNVALIDATED_USER, RestService.deleteUnvalidatedUsers.bind(null), {});
}


/* Validate User*/
export function validateUserAsync(user) {
    let args = user;
    return asyncAction(types.admin.VALIDATE_USER, RestService.validateUser.bind(null, user), args);
}
