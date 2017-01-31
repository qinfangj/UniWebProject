import actionTypes from '../actionTypes';
import constants from '../../constants/constants';
let types = actionTypes.facilityData;


const defaultState = {};


/**
 * All kinds of special backend async GET responses are handled the same way.
 * @param storeKey: key name in the store.
 */
function returnList(action, state, storeKey, pendingValue) {
    if (action.status === constants.PENDING) {
        return Object.assign(state, {[storeKey]: pendingValue});
    } else if (action.status === constants.SUCCESS) {
        return Object.assign(state, {[storeKey]: action.response});
    } else if (action.status === constants.ERROR) {
        return Object.assign(state, {[storeKey]: action.response});
    } else {
        return state;
    }
}


let facilityDataReducers = (state = defaultState, action) => {

    switch (action.type) {

        /* Select options list */

        case types.GET_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        /* Table data */

        case types.GET_TABLE_DATA:
            return returnList(action, state, action.args.storeKey, []);

        /* Inserts */

        case types.INSERT:
            return returnList(action, state, action.args.storeKey, []);

        default:
            return state;
    }
};


export default facilityDataReducers;
