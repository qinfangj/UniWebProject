"use strict";
import types from '../actionTypes';


export function resetFeedback(reference) {
    return {
        type: types.feedback.FEEDBACK_RESET,
        reference: reference,
    }
}

export function feedbackSuccess(reference, message) {
    return {
        type: types.feedback.FEEDBACK_SUCCESS,
        reference: reference,
        message: message,
    };
}

export function feedbackWarning(reference, message, error) {
    console.debug(reference, message, error)
    return {
        type: types.feedback.FEEDBACK_WARNING,
        reference: reference,
        message: message,
        error: error,
    };
}

export function feedbackError(reference, message, error) {
    return {
        type: types.feedback.FEEDBACK_ERROR,
        reference: reference,
        message: message,
        error: error,
    };
}
