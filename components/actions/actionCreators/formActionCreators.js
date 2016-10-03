
import * as actions from '../actionTypes';
import * as constants from '../../constants/constants';
import restService from '../api/restService';



function insert(status, response) {
    return {
        type: actions.INSERT,
        status: status,
        response: response,
    };
}
function insertAsync(table, fields, values) {
    return dispatch => {
        dispatch(insert(constants.PENDING, {}));
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
    insertAsync,
};
