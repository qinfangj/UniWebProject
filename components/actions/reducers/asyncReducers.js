
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
        } else {
            return state;
        }
    }

    switch (action.type) {

        case types.GET_LABS_LIST:
            return returnList("labsList");

        case types.GET_PROJECTS_LIST:
            return returnList("projectsList");

        case types.GET_PEOPLE_LIST:
            return returnList("peopleList");

        case types.INSERT:
            return state;

        default:
            return state;
    }
};


export default asyncReducers;
