"use strict";
import actionTypes from '../actionTypes';
import constants from '../../constants/constants';
import returnList from './base';
import AuthService from '../../../utils/AuthService';
const types = actionTypes.login;


const defaultState = {
    isFetching: false,
    isAuthenticated: AuthService.isLoggedIn, //!! localStorage.getItem('id_token'),
};


let authReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.RESET_FEEDBACK:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                isError: false,
                errorMessage: '',
            });

        /* Login */

        case types.LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                isError: false,
                errorMessage: '',
            });

        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                isError: false,
                errorMessage: '',
            });

        case types.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                isError: true,
                errorMessage: action.message
            });

        /* Logout */

        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                isError: false,
                errorMessage: '',
            });

        /* Signup */

        case types.SIGNUP_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                isError: false,
                errorMessage: '',
            });

        case types.SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                isError: false,
                errorMessage: '',
            });

        case types.SIGNUP_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                isError: true,
                errorMessage: action.message
            });

        /* Reset Password */

        case types.RESET_PASSWORD_REQUEST:
            return state;

        /* Get login details */

        case types.GET_ACCOUNT_PROFILE:
            return returnList(action, state, action.args.storeKey, []);


        default:
            return state;
    }
};


export default authReducers;
