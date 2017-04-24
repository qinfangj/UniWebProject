"use strict";
import types from '../actionTypes';


export function resetFeedback(key) {
    return {
        type: types.feedback.FEEDBACK_RESET,
        key: key,
    }
}

export function feedbackSuccess(key, msg) {
    return {
        type: types.feedback.FEEDBACK_SUCCESS,
        key: key,
        msg: msg,
    };
}

export function feedbackWarning(key, msg, error) {
    return {
        type: types.feedback.FEEDBACK_WARNING,
        key: key,
        msg: msg,
        error: error,
    };
}

export function feedbackError(key, msg, error) {
    return {
        type: types.feedback.FEEDBACK_ERROR,
        key: key,
        msg: msg,
        error: error,
    };
}
