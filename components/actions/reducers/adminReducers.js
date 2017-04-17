"use strict";
import actionTypes from '../actionTypes';

const types = actionTypes.admin;

const defaultState = {
};


let adminReducers = (state = defaultState, action) => {

    let newState;
    switch (action.type) {

        /* Messages */

        case types.DELETE_UNVALIDATED_REQUEST:
            return Object.assign({}, state, {
                isError: false,
                Message: '',
            });

        case types.DELETE_UNVALIDATED_SUCCESS:
            return Object.assign({}, state, {
                isError: false,
                Message: '',
            });


        case types.DELETE_UNVALIDATED_FAILURE:
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