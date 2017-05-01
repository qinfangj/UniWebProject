"use strict";

/**
 * Format Ag-grid table fields, such as boolean (1 -> "Yes") and dates (112763817623 -> "Jan 1, 2016").
 * The argument is an object `{value, valuedFormatted, data, node, colDef, ...}`.
 * */


export function boolean(v) {
    if (!v) {
        return v;
    }
    switch (v.value) {
        case 1:
        case "1":
        case "true":
        case "True":
        case true:
            return "Yes";
        case 0:
        case "0":
        case "false":
        case "False":
        case false:
            return "No";
        default:
            return "-";
    }
}

/**
 * Convert timestamp `v.value` to a readable date, assuming `v.value` is a Unix timestamp.
 */
export function date(v) {
    if (!v) return v;
    let date = new Date(v.value * 1000);
    return `${date.getYear()}-${date.getDay()}-${date.getMonth()}`;
}

/**
 * Whatever can be None in backend can be translated to "undefined" and
 * must be handled specially.
 */
export function nullable(v) {
    if (!v) {
        console.warn(`Encountered undefined value v=${v} (${typeof(v)}) in formatters.nullable(v)`);
        return v;
    }
    else if (!v.value || v.value === "") { return "-"; }
    else { return v.value; }
}

/**
 * Round floats to a number of significant digits.
 * Handles undefined/missing values.
 */
export function clipFloat(v) {
    if (!v) return v;
    let parsed = parseFloat(v.value);
    if (!isNaN(parsed)) {
        return Math.round(parsed * 100) / 100;
    } else {
        return nullable(v);
    }
}

