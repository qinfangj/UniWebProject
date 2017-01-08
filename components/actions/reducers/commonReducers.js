
import types from '../actionTypes';
import { browserHistory } from 'react-router';
import formStoreKeys from '../../constants/formStoreKeys';


const defaultState = {
    route: {data: {}},
    forms: {},
    queryProjectsType: "starting_material",
};


let commonReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.TOGGLE_SIDEBAR:
            return Object.assign(state, {sidebarOpen: action.open});

        case types.GOTO:
            browserHistory.push(action.url, action.query, action.state);
            return Object.assign(state, {
                route: {
                    url: action.url,
                    query: action.query,
                    state: action.state,
                    data: action.data,
                }
            });

        case types.CHANGE_FORM_VALUE:
            let form = action.form;
            let field = action.field;
            let value = action.value;
            let newState = Object.assign({}, state);
            if (! (form in state.forms)) {
                newState.forms[form] = {};
            }
            newState.forms[form][field] = value;
            //console.debug(form, field, value)

            /* Special cases */

            // QP: Reset samples selection if projects selection changes
            if (form === formStoreKeys.QUERY_PROJECTS_FORM
                && field === form + formStoreKeys.suffixes.PROJECTS) {
              newState.forms[form][form + formStoreKeys.suffixes.SAMPLES] = [];
            }

            return newState;

        case types.queryProjects.CHANGE_QUERY_TYPE:
            return Object.assign(state, {queryProjectsType: action.queryType});

        default:
            return state;
    }
};


export default commonReducers;
