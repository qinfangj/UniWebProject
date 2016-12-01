import types from '../actionTypes';
import constants from '../../constants/constants';


let asyncReducers = (state = {}, action) => {

    /**
     * All kinds of special backend async GET responses are handled the same way.
     * @param storeKey: key name in the store.
     */
    function returnList(storeKey) {
        if (action.status === constants.PENDING) {
            return Object.assign(state, {[storeKey]: []});
        } else if (action.status === constants.SUCCESS) {
            return Object.assign(state, {[storeKey]: action.response});
        } else if (action.status === constants.ERROR) {
            return Object.assign(state, {[storeKey]: action.error});
        } else {
            return state;
        }
    }

    let storeKey;

    switch (action.type) {

        /* Select options list */

        case types.GET_OPTIONS_LIST:
            storeKey = action.args.storeKey;
            return returnList(storeKey);

        case types.GET_SECONDARY_OPTIONS_LIST:
            storeKey = action.args.storeKey;
            return returnList(storeKey);

        /* Table data */

        case types.GET_TABLE_DATA:
            storeKey = action.args.storeKey || action.args.tableName;
            return returnList(storeKey);

        /* Inserts */

        case types.INSERT:
            storeKey = action.args.storeKey || action.args.tableName;
            return returnList(storeKey);

        default:
            return state;
    }
};


export default asyncReducers;
