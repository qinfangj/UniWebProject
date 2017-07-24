"use strict";


/**
 * Just verify that the data is an array.
 */
export function checkData(data) {
    if (! (data instanceof Array)) {
        throw("Received invalid data to display:" + JSON.stringify(data, null, 2));
    }
}


/**
 * Sort an Immutable collection (from immutable.js).
 */
export function sortImmutable(data, sortBy, sortDirection) {
    return data
        .sortBy(item => item.get(sortBy))
        .update(list => (sortDirection === "DESC") ? list.reverse() : list);
}