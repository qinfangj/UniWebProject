"use strict";
import actions from '../actionTypes';
import store from '../../../core/store';
let types = actions.login;
import RestService from '../../../utils/RestService';
import AuthService from '../../../utils/AuthService';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import { hashHistory } from 'react-router';
import formNames from '../../constants/formNames';
import { asyncAction } from './base';


export function resetFeedback() {
    return {
        type: types.RESET_FEEDBACK
    }
}

/* Login */

export function _loginRequest(creds) {
    return {
        type: types.LOGIN_REQUEST,
        creds: creds,
    }
}

export function _LoginSuccess(user) {
    return {
        type: types.LOGIN_SUCCESS,
        id_token: user.access_token,
    }
}

export function _loginError(message) {
    return {
        type: types.LOGIN_FAILURE,
        message: message,
    }
}

/* Signup */

export function _signupRequest(creds) {
    return {
        type: types.SIGNUP_REQUEST,
        creds: creds,
    }
}

export function _signupSuccess(user) {
    return {
        type: types.SIGNUP_SUCCESS,
        id_token: user.access_token,
    }
}

export function _signupError(message) {
    return {
        type: types.SIGNUP_FAILURE,
        message: message,
    }
}


// Calls the API to get a token and dispatches actions along the way
export function loginUser(creds) {
    return dispatch => {
        dispatch(_loginRequest(creds));  // "Fetching..."
        return RestService.login(creds)
            // Format the response
            .then(response => {
                // Error
                if (!response.ok) {
                    dispatch(_loginError(response.statusText));
                    return Promise.reject(response);
                // Successful login
                } else {
                    response.json().then(user => {
                        dispatch(_LoginSuccess(user));
                        AuthService._doAuthentication(user);
                    }).catch(err => {console.log("Error retreiving id_token: ", JSON.stringify(err, null, 2))});
                }
            }).catch(err => {
                let msg = "Error logging in: " + err.message;
                store.dispatch(feedbackError("REST", msg, {}));
            });
    }
}

export function signupUser(creds) {
    return dispatch => {
        dispatch(_signupRequest(creds));  // "Fetching..."
        return RestService.signup(creds)
            // Format the response
            .then(response => {
                // Error
                if (!response.ok) {
                    dispatch(_signupError(response.statusText));
                    return Promise.reject(response);
                // Successful signup
                } else {
                    response.json().then(user => {
                        dispatch(feedbackSuccess(formNames.SIGN_UP_FORM, "Congratulation! You have signed up successfully!"));
                        dispatch(_signupSuccess(user));
                        // We do not want the user to be signed up right away!
                        //AuthService._doAuthentication(user);
                        hashHistory.replace('/home');
                    }).catch(err => console.log("Error retreiving id_token: ", JSON.stringify(err, null, 2)));
                }
            }).catch(err => {
                dispatch(feedbackWarning(formNames.SIGN_UP_FORM, "Signup Error", err));
                console.log("Error signing up: ", JSON.stringify(err, null, 2))
            });
    }
}


/* Logout */

export function logout() {
    return {
        type: types.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}


/* Reset password */

export function requestResetPassword(email) {
    return dispatch => {
        dispatch(() => {return {type: types.RESET_PASSWORD_REQUEST}});
        return RestService.requestResetPassword(email)
            .then(response => {
                if (response.ok) {
                    dispatch(() => {return {type: types.RESET_PASSWORD_SUCCESS}});
                } else {
                    dispatch(() => {return {type: types.RESET_PASSWORD_FAILURE}});
                    return Promise.reject(response);
                }
            }).catch(err => console.log('Error asking for password reset: ' + JSON.stringify(err, null, 2)));
        }
}


export function changePassword(code, email, newPassword) {
    return dispatch => {
        dispatch(() => {return {type: types.CHANGE_PASSWORD_REQUEST}});
        return RestService.changePassword(code, email, newPassword)
            .then(response => {
                if (response.ok) {
                    dispatch(feedbackSuccess(formNames.CHANGE_PASSWORD_FORM, "You have changed your password successfully!"));
                    dispatch(() => {return {type: types.CHANGE_PASSWORD_SUCCESS}});
                    hashHistory.replace('/home');
                } else {
                    dispatch(() => {return {type: types.CHANGE_PASSWORD_FAILURE}});
                    return Promise.reject(response);
                }
            }).catch(err =>{
                dispatch(feedbackWarning(formNames.CHANGE_PASSWORD_FORM, "Change Password Error", err));
                console.log('Error changing password: ' + JSON.stringify(err, null, 2))
            });
    }
}

export function getLoginDetails() {
    let args = {storeKey:'accountProfile'};
    return asyncAction(types.GET_ACCOUNT_PROFILE, RestService.getLoginDetails.bind(null), args);
}






