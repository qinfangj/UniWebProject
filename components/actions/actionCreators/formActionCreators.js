
import * as actions from '../actionTypes';
import * as constants from '../../constants/constants';
import restService from '../api/restService';



function select(status, response) {
    return {
        type: actions.SELECT,
        status: status,
        response: response,
    };
}
function selectAsync(table, fields, conds) {
    return dispatch => {
        dispatch(select(constants.PENDING, null));
        return restService.selectAll(table, fields, conds)
        .done(response => {
            dispatch(select(constants.SUCCESS, response));
        })
        .fail(error => {
            dispatch(select(constants.ERROR, error));
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
    selectAsync,
    insertAsync,
};
