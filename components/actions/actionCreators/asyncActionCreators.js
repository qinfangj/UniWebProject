
import actions from '../actionTypes';
import constants from '../../constants/constants';
import restService from '../api/restService';
import { sendError } from './commonActionCreators';

/**
 * @param type: action type.
 * @param status: constants.[SUCCESS|ERROR|PENDING]
 * @param response: http response.
 * @param args: an object of parameters to pass to the reducers.
 */
function syncAction(type, status, response, args) {
    return { type, status, response, args };
}
function asyncAction(type, action, args) {
    return dispatch => {
        dispatch(syncAction(type, constants.PENDING, null, args));
        return action(args)
            .done(response => {
                dispatch(syncAction(type, constants.SUCCESS, response, args));
            })
            .fail(error => {
                dispatch(syncAction(type, constants.ERROR, error, args))
            })
        ;
    }
}

/* Select options. `suffix` is something like "labsList" in "/table/<tableName>/<suffix>". */
function getOptionsListAsync(tableName) {
    let args = {tableName,};
    return asyncAction(actions.GET_OPTIONS_LIST, restService.getOptionsList.bind(null, tableName), args)
}

/* Table data */
function getTableDataAsync(tableName, activeOnly) {
    let args = {tableName,};
    return asyncAction(actions.GET_TABLE_DATA, restService.specialSelect.bind(null, tableName, activeOnly), args);
}

/* Inserts */
function insertAsync(tableName, formData) {
    let args = {tableName,};
    return asyncAction(actions.INSERT, restService.insert.bind(null, tableName, formData), args);
}


export {
    getOptionsListAsync,
    getTableDataAsync,
    insertAsync,
};
