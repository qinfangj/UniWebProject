"use strict";
import types from '../actionTypes';
import constants from '../../constants/constants';

function checkStatus(status) {
    if (!
      (status === undefined
    || status === null
    || status === types.feedback.FEEDBACK_SUCCESS
    || status === types.feedback.FEEDBACK_ERROR
    || status === types.feedback.FEEDBACK_WARNING
    || status === types.feedback.FEEDBACK_RESET)) {
        throw "Status must be one of the feedback constants";
    }
}


let feedbackReducers = (state = {}, action) => {
    let newState;

    switch (action.type) {

        case types.feedback.FEEDBACK_SUCCESS:
            checkStatus(action.status);
            newState = {...state};
            newState[action.reference] = {
                status: action.status || constants.SUCCESS,
                message: action.message,
                error: {},
            };
            return newState;

        case types.feedback.FEEDBACK_WARNING:
            checkStatus(action.status);
            newState = {...state};
            newState[action.reference] = {
                status: action.status || constants.WARNING,
                message: action.message,
                error: {},
            };
            return newState;

        case types.feedback.FEEDBACK_ERROR:
            checkStatus(action.status);
            newState = {...state};
            newState[action.reference] = {
                status: action.status || constants.ERROR,
                message: action.message,
                error: action.error,
            };
            return newState;

        case types.feedback.FEEDBACK_RESET:
            checkStatus(action.status);
            newState = {...state};
            newState[action.reference] = {
                status: constants.NONE,
                message: "",
                error: {},
            };
            return newState;

        default:
            return state;

    }
};


export default feedbackReducers;

