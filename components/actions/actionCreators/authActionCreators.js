"use strict";
import actions from '../actionTypes';
import RestService from '../../../utils/RestService';
import AuthService from '../../../utils/AuthService';

import { hashHistory } from 'react-router';
import { asyncAction } from './base';
import * as feedback from '../../../utils/feedback';



/* Login */

export function _loginRequest(creds) {
    return {
        type: actions.login.LOGIN_REQUEST,
        creds: creds,
    }
}

export function _LoginSuccess(user) {
    return {
        type: actions.login.LOGIN_SUCCESS,
        id_token: user.access_token,
    }
}

export function _loginError(message) {
    return {
        type: actions.login.LOGIN_FAILURE,
        message: message,
    }
}

/* Signup */

export function _signupRequest(creds) {
    return {
        type: actions.login.SIGNUP_REQUEST,
        creds: creds,
    }
}

export function _signupSuccess(user) {
    return {
        type: actions.login.SIGNUP_SUCCESS,
        id_token: user.access_token,
    }
}

export function _signupError(message) {
    return {
        type: actions.login.SIGNUP_FAILURE,
        message: message,
    }
}

/* SMTP */

export function isSMTPError(errMessage) {
    return errMessage.includes("Sending the email to the following server failed");
}


// Calls the API to get a token and dispatches actions along the way
export function loginUser(creds) {
    return dispatch => {
        dispatch(_loginRequest(creds));  // "Fetching..."
        return RestService.login(creds)
            .then(response => {
                //console.log(response)
                /* HTTP response with error code */
                if (!response.ok) {
                    response.text().then(err => {
                        dispatch(_loginError(response.statusText));
                        console.log("Error logging in: ", response);
                        if (response.statusText === "Unauthorized") {
                            feedback.info("Wrong username or password", "RestService::loginUser");
                        }
                    });
                    //return Promise.reject(response);
                /* Successful login (200) */
                } else {
                    feedback.reset();
                    response.json().then(res => {
                        dispatch(_LoginSuccess(res));
                        AuthService._doAuthentication(res);
                    }).catch(err => console.log("Error retreiving access_token: ", JSON.stringify(err, null, 2)));
                }
            /* No HTTP response */
            }).catch(err => {
                feedback.error("Error logging in: " + err.message, {}, "RestService::loginUser");
                console.log("Error logging in - cannot fetch: ", err);
            });
    }
}

export function signupUser(creds) {
    return dispatch => {
        dispatch(_signupRequest(creds));  // "Fetching..."
        return RestService.signup(creds)
            .then(response => {
                //console.log(response)
                /* HTTP response with error code */
                if (!response.ok) {
                    response.text().then(err => {
                        dispatch(_signupError(err));
                        if (isSMTPError(err)) {
                            feedback.error("Cannot sign up: email service is inactive (SMTP server is unavailable).", {}, "signupUser");
                        } else {
                            feedback.error("Signup Error: "+err, {}, "signupUser");
                        }
                        console.log("Error signing up: ", err);
                    });
                    //return Promise.reject(response);  // redirects to `catch()`
                /* Successful signup (200) */
                } else {
                    feedback.reset();
                    response.json().then(res => {
                        feedback.success("Congratulations! You have signed up successfully!", "signupUser");
                        dispatch(_signupSuccess(res));
                        AuthService._doAuthentication(res);
                        hashHistory.replace('/home');
                    }).catch(err => console.log("Error retreiving access_token: ", JSON.stringify(err, null, 2)));
                }
            /* No HTTP response */
            }).catch(err => {
                feedback.error("Cannot connect to server. Please report to an administrator.", err, "signupUser");
                console.log("Error signing up - cannot fetch: ", err);
            });
    }
}


/* Logout */

export function logout() {
    return {
        type: actions.login.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}


/* Reset password */

export function requestResetPassword(email) {
    return dispatch => {
        dispatch(() => {return {type: actions.login.RESET_PASSWORD_REQUEST}});
        return RestService.requestResetPassword(email)
            .then(response => {
                if (response.ok) {
                    feedback.reset();
                    dispatch(() => {return {type: actions.login.RESET_PASSWORD_SUCCESS}});
                    feedback.success("New password request sent, please check your email box", "restService::requestResetPassword");
                    hashHistory.replace('/home');
                } else {
                    dispatch(() => {return {type: actions.login.RESET_PASSWORD_FAILURE}});
                    response.text().then(err => {
                        if (isSMTPError(err)) {
                            feedback.error("Cannot reset password: email service is inactive (SMTP server is unavailable).", {}, "restService::requestResetPassword");
                        } else {
                            feedback.error(err, {}, "restService::requestResetPassword");
                        }
                    });
                    // return Promise.reject(response);
                }
            }).catch(err => {
                feedback.error("Reset Password Error: " + err.message, err, "signupUser");
                console.log('Error asking for password reset: ' + JSON.stringify(err, null, 2));
            });
        }
}


export function changePassword(code, email, newPassword) {
    return dispatch => {
        dispatch(() => {return {type: actions.login.CHANGE_PASSWORD_REQUEST}});
        return RestService.changePassword(code, email, newPassword)
            .then(response => {
                if (response.ok) {
                    feedback.success("You have changed your password successfully!", "restService::changePassword");
                    dispatch(() => {
                        return {type: actions.login.CHANGE_PASSWORD_SUCCESS}
                    });
                    hashHistory.replace('/home');
                } else {
                    dispatch(() => {
                        return {type: actions.login.CHANGE_PASSWORD_FAILURE}
                    });
                    response.text().then(err => {
                        if (isSMTPError(err)) {
                            feedback.error("Cannot change password: email service is inactive (SMTP server is unavailable).", {}, "restService::changePassword");
                        } else {
                            feedback.error("Change Password Error: " + err, {}, "restService::changePassword");
                        }
                    });
                    // return Promise.reject(response);
                }
            }).catch(err =>{
                feedback.error("Change Password Error: "+ err.message, {}, "restService::changePassword");
                console.log('Error changing password: ' + JSON.stringify(err, null, 2));
            });
    }
}

export function getLoginDetails() {
    let args = {storeKey:'accountProfile'};
    return asyncAction(actions.login.GET_ACCOUNT_PROFILE, RestService.getLoginDetails.bind(null), args);
}






