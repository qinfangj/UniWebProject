"use strict";
import actions from '../actionTypes';


export function sendError(error, origin) {
    return {
        type: actions.ERROR,
        error: error,
        origin: origin,
    };
}
