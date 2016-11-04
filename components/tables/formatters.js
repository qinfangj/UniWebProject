/**
 * Format Ag-grid table fields, such as boolean (1 -> "Yes") and dates (112763817623 -> "Jan 1, 2016").
 * The argument is an object `{value, valuedFormatted, data, node, colDef, ...}`.
 * */


function boolean(v) {
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
function date(v) {
    let date = new Date(v.value * 1000);
    return `${date.getYear()}-${date.getDay()}-${date.getMonth()}`;
}


export {
    boolean,
    date,
};