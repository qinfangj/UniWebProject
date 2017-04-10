"use strict";
import types from '../actionTypes';


export function sendError(error, origin) {
    return {
        type: types.messages.ERROR,
        error: error,
        origin: origin,
    };
}

