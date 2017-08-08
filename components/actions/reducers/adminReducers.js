"use strict";
import actionTypes from '../actionTypes';

const types = actionTypes;

const defaultState = {};


let adminReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.admin.VALIDATE_USER:
            return state;

        case types.admin.DELETE_UNVALIDATED_REQUEST:
            return Object.assign({}, state, {
                isError: false,
                Message: '',
            });

        case types.admin.DELETE_UNVALIDATED_SUCCESS:
            return Object.assign({}, state, {
                isError: false,
                Message: '',
            });


        case types.admin.DELETE_UNVALIDATED_FAILURE:
            return Object.assign({}, state, {
                isError: true,
                Message: action.messages,
                error: action.error
            });

        default:
            return state;

    }
};


export default adminReducers;