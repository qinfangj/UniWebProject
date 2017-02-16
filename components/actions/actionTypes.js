

const actionTypes = {
    ERROR: "ERROR",

    TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
    GOTO: "GOTO",
    CHANGE_FORM_VALUE: "CHANGE_FORM_VALUE",

    facilityData: {
        SELECT: "SELECT",
        INSERT: "INSERT",
        FIND_BY_ID: "FIND_BY_ID",
        FILL_UPDATE_FORM: "FILL_UPDATE_FORM",
        EMPTY_FORM: "EMPTY_FORM",
        GET_OPTIONS_LIST: "GET_OPTIONS_LIST",
        GET_SECONDARY_OPTIONS_LIST: "GET_SECONDARY_OPTIONS_LIST",
        GET_TABLE_DATA: "GET_TABLE_DATA",
    },

    login: {
        LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
        LOGIN_REQUEST: 'LOGIN_REQUEST',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGIN_FAILURE: 'LOGIN_FAILURE',
        SIGNUP_REQUEST: 'SIGNUP_REQUEST',
        SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
        SIGNUP_FAILURE: 'SIGNUP_FAILURE',
        RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
        RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
        RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
        CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
        CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE',
        CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
    },

    queryProjects: {
        QUERY_PROJECTS: "QUERY_PROJECTS",
        CHANGE_QUERY_TYPE: "CHANGE_QUERY_TYPE",
        SEARCH_SAMPLES: "SEARCH_SAMPLES",
        RESET_SELECTION: "RESET_SELECTION",
    },
};

export default actionTypes;
