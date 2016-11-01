
import actions from '../actionTypes';
import constants from '../../constants/constants';
import restService from '../api/restService';
import { sendError } from './commonActionCreators';


function syncAction(type, status, response, args) {
    return { type, status, response, args };
}
function asyncAction(type, action, args) {
    return dispatch => {
        dispatch(syncAction(type, constants.PENDING, null, args));
        return action(...args)
            .done(response => {
                dispatch(syncAction(type, constants.SUCCESS, response, args));
            })
            .fail(error => {
                dispatch(syncAction(type, constants.ERROR, error, args))
            })
        ;
    }
}

/* Select options */
function getLabsListAsync() {
    return asyncAction(actions.GET_LABS_LIST, restService.getLabs, []);
}
function getProjectStatesListAsync() {
    return asyncAction(actions.GET_PROJECT_STATES_LIST, restService.getProjectStates, []);
}

/* Table data */
function getTableDataAsync(name, activeOnly) {
    return asyncAction(actions.GET_TABLE_DATA, restService.specialSelect, [name, activeOnly]);
}

/* Inserts */
function insertAsync(table, formData) {
    return asyncAction(actions.INSERT, restService.insert, [table, formData]);
}


export {
    getLabsListAsync,
    getProjectStatesListAsync,

    getTableDataAsync,
    insertAsync,
};
