
import types from '../actionTypes';
import { browserHistory } from 'react-router';
import formStoreKeys from '../../constants/formStoreKeys';


const defaultState = {
    route: {data: {}},
    forms: {},
};


let commonReducers = (state = defaultState, action) => {

    let newState;

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
            newState = Object.assign({}, state);
            // Create if not exists
            if (! (form in state.forms)) {
                newState.forms[form] = {};
            }
            newState.forms[form][field] = value;
            //console.debug(field, action, value)

            /* Special cases */

            // QP: Reset samples selection if projects selection changes
            if (form === formStoreKeys.QUERY_PROJECTS_FORM
                && field === form + formStoreKeys.suffixes.PROJECTS) {
              newState.forms[form][form + formStoreKeys.suffixes.SAMPLES] = {};
            }

            return newState;

        /**
         * Specific to queryProjects, but acts on centralized form values, so we treat it here as well.
         */
        case types.queryProjects.RESET_SELECTION:
            newState = Object.assign({}, state);
            let qpForm = formStoreKeys.QUERY_PROJECTS_FORM;
            let samplesKey = qpForm + formStoreKeys.suffixes.SAMPLES;
            let projectsKey = qpForm + formStoreKeys.suffixes.PROJECTS;
            if (newState.forms[qpForm] !== undefined) {
                newState.forms[qpForm][samplesKey] = {};
                newState.forms[qpForm][projectsKey] = {};
            }
            return newState;

        default:
            return state;
    }
};


export default commonReducers;
