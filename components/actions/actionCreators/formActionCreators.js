
import actions from '../actionTypes';
import constants from '../../constants/constants';
import restService from '../api/restService';


function sendError(error) {
    return {
        type: actions.ERROR,
        error: error,
    };
}


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
        return restService.getLabsList()
            .done(response => {
                dispatch(getLabsList(constants.SUCCESS, response));
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
function insertAsync(table, fields, values) {
    return dispatch => {
        dispatch(insert(constants.PENDING, null));
        return restService.insert(table, fields, values)
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
    insertAsync,
};
