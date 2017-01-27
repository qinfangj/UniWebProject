import actionTypes from '../actionTypes';
import constants from '../../constants/constants';
let types = actionTypes.facilityData;


const defaultState = {};


let facilityDataReducers = (state = defaultState, action) => {

    /**
     * All kinds of special backend async GET responses are handled the same way.
     * @param storeKey: key name in the store.
     */
    function returnList(storeKey, pendingValue) {
        if (action.status === constants.PENDING) {
            return Object.assign(state, {[storeKey]: pendingValue});
        } else if (action.status === constants.SUCCESS) {
            return Object.assign(state, {[storeKey]: action.response});
        } else if (action.status === constants.ERROR) {
            return Object.assign(state, {[storeKey]: action.error});
        } else {
            return state;
        }
    }


    switch (action.type) {

        /* Select options list */

        case types.GET_OPTIONS_LIST:
            return returnList(action.args.storeKey, []);

        case types.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action.args.storeKey, []);

        /* Table data */

        case types.GET_TABLE_DATA:
            return returnList(action.args.storeKey, []);

        /* Inserts */

        case types.INSERT:
            return returnList(action.args.storeKey, []);

        /* Get one row details by ID */
        case types.FIND_BY_ID:
            return returnList("updateData", {});

        default:
            return state;
    }
};


export default facilityDataReducers;
