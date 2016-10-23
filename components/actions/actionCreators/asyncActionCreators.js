
import actions from '../actionTypes';
import constants from '../../constants/constants';
import restService from '../api/restService';
import { sendError } from './commonActionCreators';


function getLabsList(status, response) {
    return {
        type: actions.GET_LABS_LIST,
        status: status,
        response: response,
    };
}
function getLabsListAsync() {
    return dispatch => {
        dispatch(getLabsList(constants.PENDING, null));
        return restService.getLabs()
            .done(response => {
                dispatch(getLabsList(constants.SUCCESS, response));
            })
            .fail(error => {
                dispatch(sendError(error));
            })
        ;
    }
}

function getProjectsList(status, response) {
    return {
        type: actions.GET_PROJECTS_LIST,
        status: status,
        response: response,
    };
}

function getProjectsListAsync(activeOnly) {
    return dispatch => {
        dispatch(getProjectsList(constants.PENDING, null));
        return restService.getProjects(activeOnly)
            .done(response => {
                dispatch(getProjectsList(constants.SUCCESS, response));
            })
            .fail(error => {
                dispatch(sendError(error));
            })
        ;
    }
}


function insert(status, response) {
    return {
        type: actions.INSERT,
        status: status,
        response: response,
    };
}
function insertAsync(table, formData) {
    return dispatch => {
        dispatch(insert(constants.PENDING, null));
        return restService.insert(table, formData)
            .done(response => {
                dispatch(insert(constants.SUCCESS, response));
            })
            .fail(error => {
                dispatch(insert(constants.ERROR, error));
            })
        ;
    }
}


export {
    getLabsListAsync,
    getProjectsListAsync,
    insertAsync,
};
