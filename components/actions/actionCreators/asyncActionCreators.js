
import actions from '../actionTypes';
import constants from '../../constants/constants';
import restService from '../api/restService';
import { sendError } from './commonActionCreators';


function syncAction(type, status, response) {
    return { type, status, response };
}
function asyncAction(type, action, args) {
    return dispatch => {
        dispatch(syncAction(type, constants.PENDING, null));
        return action(...args)
            .done(response => {
                dispatch(syncAction(type, constants.SUCCESS, response));
            })
            .fail(error => {
                dispatch(syncAction(type, constants.ERROR, error))
            })
        ;
    }
}

function getLabsListAsync() {
    return asyncAction(actions.GET_LABS_LIST, restService.getLabs, []);
}

function getProjectsListAsync(activeOnly) {
    return asyncAction(actions.GET_PROJECTS_LIST, restService.specialSelect, ["projects", activeOnly]);
}

function getPeopleListAsync(activeOnly) {
    return asyncAction(actions.GET_PEOPLE_LIST, restService.specialSelect, ["people", activeOnly]);
}

function getGenomesListAsync(activeOnly) {
    return asyncAction(actions.GET_GENOMES_LIST, restService.specialSelect, ["genomes", activeOnly]);
}

function insertAsync(table, formData) {
    return asyncAction(actions.INSERT, restService.insert, [table, formData]);
}


export {
    getLabsListAsync,
    getProjectsListAsync,
    getPeopleListAsync,
    getGenomesListAsync,
    insertAsync,
};
