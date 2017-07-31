

/**
 * Check that a variable is an array, otherwise throw an error.
 */
export function assertIsArray(v, argname="") {
    if (! Array.isArray(v)) {
        throw "Argument '"+argname+"' should be an array: "+ (v ? JSON.stringify(v) : v);
    }
}

export function randomString(nchars) {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, nchars);
}

export function isdev() {
    return window.location.hostname === "localhost";
}
