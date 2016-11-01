
import types from '../actionTypes';
import constants from '../../constants/constants';


const defaultState = {
};


let asyncReducers = (state = defaultState, action) => {

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

    switch (action.type) {

        case types.GET_LABS_LIST:
            return returnList("labsList");

        case types.GET_TABLE_DATA:
            return returnList(action.args[0]);

        case types.INSERT:
            return returnList(action.args[0]);

        default:
            return state;
    }
};


export default asyncReducers;
