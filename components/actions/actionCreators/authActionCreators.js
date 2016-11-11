
import actions from '../actionTypes';

/* Login */

export function requestLogin(creds) {
    return {
        type: actions.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

export function receiveLogin(user) {
    return {
        type: actions.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

export function loginError(message) {
    return {
        type: actions.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}


/* Logout */

function requestLogout() {
    return {
        type: actions.LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: actions.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export function logoutError(message) {
    return {
        type: actions.LOGOUT_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}


/* Show lock screen */

function showLock() {
    return {
        type: actions.SHOW_LOCK,
    }
}

function lockSuccess(profile, token) {
    return {
        type: actions.LOCK_SUCCESS,
        profile,
        token
    }
}

function lockError(err) {
    return {
        type: actions.LOCK_ERROR,
        err
    }
}

