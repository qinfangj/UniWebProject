"use strict";


const actionTypes = {

    TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
    GOTO: "GOTO",

    messages: {
        ERROR: "ERROR",
    },

    feedback: {
        FEEDBACK_SUCCESS: "FEEDBACK_SUCCESS",
        FEEDBACK_ERROR: "FEEDBACK_ERROR",
        FEEDBACK_WARNING: "FEEDBACK_WARNING",
        FEEDBACK_RESET: "FEEDBACK_RESET",
    },

    forms: {
        FORM_SUBMISSION_ERROR: "FORM_SUBMISSION_ERROR",
        FORM_SERVER_ERROR: "FORM_SERVER_ERROR",
        FORM_SUBMISSION_SUCCESS: "FORM_SUBMISSION_SUCCESS",
        FORM_FEEDBACK_RESET: "FORM_FEEDBACK_RESET",
        RESET_FORM: "RESET_FORM",
        CHANGE_FORM_VALUE: "CHANGE_FORM_VALUE",
        FILL_UPDATE_FORM: "FILL_UPDATE_FORM",
        GET_OPTIONS_LIST: "GET_OPTIONS_LIST",
        GET_SECONDARY_OPTIONS_LIST: "GET_SECONDARY_OPTIONS_LIST",
    },

    facilityData: {
        SELECT: "SELECT",
        INSERT: "INSERT",
        DELETE: "DELETE",
        FIND_BY_ID: "FIND_BY_ID",
        GET_TABLE_DATA: "GET_TABLE_DATA",
        VALIDATE_USER: "VALIDATE_USER"
    },

    login: {
        RESET_FEEDBACK: 'RESET_FEEDBACK',
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
        GET_ACCOUNT_PROFILE: 'GET_ACCOUNT_PROFILE',
    },

    admin: {
        DELETE_UNVALIDATED_REQUEST: 'DELETE_UNVALIDATED_REQUEST',
        DELETE_UNVALIDATED_SUCCESS: 'DELETE_UNVALIDATED_SUCCESS',
        DELETE_UNVALIDATED_FAILURE: 'DELETE_UNVALIDATED_FAILURE'
    },

    queryProjects: {
        QUERY_PROJECTS: "QUERY_PROJECTS",
        SEARCH_SAMPLES: "SEARCH_SAMPLES",
        RESET_SELECTION: "RESET_SELECTION",
        CHANGE_PROJECTS_SELECTION: "CHANGE_PROJECT_SELECTION",
        CHANGE_SAMPLES_SELECTION: "CHANGE_SAMPLES_SELECTION",
    },
};

export default actionTypes;
