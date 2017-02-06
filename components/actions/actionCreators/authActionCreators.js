
import actions from '../actionTypes';
let types = actions.login;
import restService from '../api/restService';


/* Login */

export function requestLogin(creds) {
    return {
        type: types.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds: creds,
    }
}

export function receiveLogin(user) {
    return {
        type: types.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.access_token,
    }
}

export function loginError(message) {
    return {
        type: types.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message: message,
    }
}

// Calls the API to get a token and dispatches actions along the way
export function loginUser(creds) {
    return dispatch => {
        dispatch(requestLogin(creds));  // "Fetching..."
        return restService.login(creds)
            // Format the response
            .then(response => {
                // Error
                if (!response.ok) {
                    dispatch(loginError(response.statusText));
                    return Promise.reject(response);
                // Successful login
                } else {
                    response.json().then(user => ({ user, response }))
                }
            }).then(({ user, response }) =>  {
                // Error
                if (!response.ok) {
                    dispatch(loginError(user.message));
                    return Promise.reject(user);
                // Successful login
                } else {
                    localStorage.setItem('id_token', user.access_token)
                    dispatch(receiveLogin(user));
                }
            }).catch(err => console.log("Error: ", err))
    }
}


/* Logout */

function requestLogout() {
    return {
        type: types.LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: types.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export function logoutError(message) {
    return {
        type: types.LOGOUT_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}


/* Show lock screen */

function showLock() {
    return {
        type: types.SHOW_LOCK,
    }
}

function lockSuccess(profile, token) {
    return {
        type: types.LOCK_SUCCESS,
        profile,
        token
    }
}

function lockError(err) {
    return {
        type: types.LOCK_ERROR,
        err
    }
}



