

/**
 * Check that a variable is an array, otherwise throw an error.
 */
export function assertIsArray(v, argname="") {
    if (! Array.isArray(v)) {
        throw "Argument '"+argname+"' should be an array: "+ (v ? JSON.stringify(v) : v);
    }
}