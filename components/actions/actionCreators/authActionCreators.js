
import actions from '../actionTypes';
let types = actions.login;


/* Login */

export function requestLogin(creds) {
    return {
        type: types.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

export function receiveLogin(user) {
    return {
        type: types.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

export function loginError(message) {
    return {
        type: types.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

// Calls the API to get a token and dispatches actions along the way
export function loginUser(creds) {

    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: JSON.stringify({
            username: creds.username,
            password: creds.password
        })
    };

    return dispatch => {
        dispatch(requestLogin(creds));  // "Fetching..."
        return fetch(window.ENV.BACKEND_URL + '/sessions/create', config)
            // Format the response
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
                // Error
                if (!response.ok) {
                    dispatch(loginError(user.message));
                    return Promise.reject(user);
                // Successful login
                } else {
                    localStorage.setItem('id_token', user.id_token)
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



