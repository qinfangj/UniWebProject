/**
 * Format Ag-grid table fields, such as boolean (1 -> "Yes") and dates (112763817623 -> "Jan 1, 2016").
 * The argument is an object `{value, valuedFormatted, data, node, colDef, ...}`.
 * */


export function boolean(v) {
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
    let date = new Date(v.value * 1000);
    return `${date.getYear()}-${date.getDay()}-${date.getMonth()}`;
}

/**
 * Whatever can be None in backend can be translated to "undefined" and
 * must be handled specially.
 */
export function nullable(v) {
    if (!v.value || v.value === "") { return "-"; }
    else { return v.value; }
}

/**
 *
 */
export function clipFloat(v) {
    let parsed = parseFloat(v.value);
    if (!isNaN(parsed)) {
        return Math.round(parsed * 100) / 100;
    } else {
        return nullable(v.value);
    }
}
