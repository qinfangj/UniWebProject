"use strict";


/**
 * Just verify that the data is an array.
 */
export function checkData(data) {
    if (! (data instanceof Array)) {
        throw("Received invalid data to display:" + JSON.stringify(data, null, 2));
    }
}
