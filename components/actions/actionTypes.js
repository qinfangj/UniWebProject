

const actionTypes = {
    ERROR: "ERROR",
    SELECT: "SELECT",
    INSERT: "INSERT",

    GET_OPTIONS_LIST: "GET_OPTIONS_LIST",
    GET_SECONDARY_OPTIONS_LIST: "GET_SECONDARY_OPTIONS_LIST",
    GET_TABLE_DATA: "GET_TABLE_DATA",

    TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
    GOTO: "GOTO",

    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',

    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE',

    SHOW_LOCK: 'SHOW_LOCK',
    LOCK_SUCCESS: 'LOCK_SUCCESS',
    LOCK_ERROR: 'LOCK_ERROR',

    CHANGE_FORM_VALUE: "CHANGE_FORM_VALUE",

    QUERY_PROJECTS: "QUERY_PROJECTS",
    CHANGE_QUERY_PROJECTS_TYPE: "CHANGE_QUERY_PROJECTS_TYPE",
    SEARCH_QUERY_PROJECTS: "SEARCH_QUERY_PROJECTS",
};

export default actionTypes;
