
import actionTypes from '../actionTypes';
import constants from '../../constants/constants';
import AuthService from '../../../utils/AuthService';
const types = actionTypes.login;


const defaultState = {
    isFetching: false,
    isAuthenticated: AuthService.isLoggedIn, //!! localStorage.getItem('id_token'),
};


let authReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds,
            });

        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
            });

        case types.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });

        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
            });

        case types.SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
            });

        default:
            return state;
    }
};


export default authReducers;
