"use strict";

/**
 * Return the current timstamp as a string such as "2017-03-13 11:08:56".
 * @returns {string}
 */
export function timeNow() {
    return (new Date (
              (new Date((new Date(new Date())).toISOString() )).getTime()
            - ((new Date()).getTimezoneOffset()*60000)
           ))
           .toISOString().slice(0, 19).replace('T', ' ');
}

export function dateNow() {
    return timeNow().split(" ")[0];
}

/**
 * Transform the "Mar 13, 2017 10:47:53 AM" we receive from backend to a
 * timestamp format that the backend understands when we send it back...
 */
export function parseDateString(dateString) {
    return (new Date(Date.parse(dateString))).toISOString().slice(0, 19).replace('T', ' ');
}