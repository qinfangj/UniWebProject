"use strict";
import types from '../actionTypes';
import constants from '../../constants/constants';
import formNames from '../../constants/formNames';

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


const resetStatus = () => {
    let state = {};
    const neutralStatus = {
        status: constants.NONE,
        message: "",
        error: {},
    };
    for (let form in formNames) {
        state[form] = {...neutralStatus};
    }
    return state;
};

const defaultState = resetStatus();


let feedbackReducers = (state = defaultState, action) => {
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
            return resetStatus();

        default:
            return state;

    }
};


export default feedbackReducers;

