
import actions from '../actionTypes';
let types = actions.login;
import restService from '../api/restService';
import { browserHistory } from 'react-router'


/* Login */

export function requestLogin(creds) {
    return {
        type: types.LOGIN_REQUEST,
        creds: creds,
    }
}

export function receiveLogin(user) {
    return {
        type: types.LOGIN_SUCCESS,
        id_token: user.access_token,
    }
}

export function loginError(message) {
    return {
        type: types.LOGIN_FAILURE,
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
                    response.json().then(user => {
                        localStorage.setItem('id_token', user.access_token);
                        dispatch(receiveLogin(user));
                        browserHistory.push('/home');
                    }).catch(err => console.log("Error retreiving id_token: ", err))
                }
            }).catch(err => console.log("Error logging in: ", err))
    }
}

export function signupUser(info) {

}


/* Logout */

export function logout() {
    return {
        type: types.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}




