
import types from '../actionTypes';
import constants from '../../constants/constants';


const defaultState = {
};


let asyncReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.GET_LABS_LIST:
            if (action.status === constants.PENDING) {
                return Object.assign(state, {labsList: []});
            } else if (action.status === constants.SUCCESS) {
                return Object.assign(state, {labsList: action.response});
            } else {
                return state;
            }

        case types.GET_PROJECTS_LIST:
            if (action.status === constants.PENDING) {
                return Object.assign(state, {projectsList: []});
            } else if (action.status === constants.SUCCESS) {
                return Object.assign(state, {projectsList: action.response});
            } else {
                return state;
            }

        case types.INSERT:
            return state;

        default:
            return state;
    }
};


export default asyncReducers;
