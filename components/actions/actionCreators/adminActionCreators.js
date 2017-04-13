"use strict";
import actions from '../actionTypes';
let types = actions.admin;
import RestService from '../../../utils/RestService';


export function deleteUnvalidatedUsers() {
    return dispatch => {
        dispatch({type: types.DELETE_UNVALIDATED_REQUEST});

        return RestService.deleteUnvalidatedUsers()
            .then(response => {
                if (response >= 0 ) {
                    console.log(("response ok"))
                    dispatch(
                         {type: types.DELETE_UNVALIDATED_SUCCESS}
                    );
                } else {
                    dispatch( {type: types.DELETE_UNVALIDATED_FAILURE});
                    return Promise.reject(response);
                }
            }).catch(err => console.log('Error changing password: ' + JSON.stringify(err, null, 2)));
    };
    //return asyncAction(types.DELETE_UNVALIDATED_USER, RestService.deleteUnvalidatedUsers.bind(null), {});
}
