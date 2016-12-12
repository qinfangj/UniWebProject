
import actions from '../actionTypes';



export function sendError(error) {
    return {
        type: actions.ERROR,
        error: error,
    };
}

export function toggleSidebar(open) {
    return {
        type: actions.TOGGLE_SIDEBAR,
        open: open,
    };
}

/**
 * Navigate to new url
 */
export function goTo(url, query={}, state={}, data={}) {
    return {
        type: actions.GOTO,
        url: url,
        query: query,  // "...?option=that"
        state: state,
        data: data,    // data to pass to the next page using the store
    }
}

export function changeFormValue(form, field, value) {
    return {
        type: actions.CHANGE_FORM_VALUE,
        form: form,
        field: field,
        value: value,
    }
}

export function changeQueryProjectsType(queryType) {
    return {
        type: actions.CHANGE_QUERY_PROJECTS_TYPE,
        queryType: queryType,
    }
}

export function searchQueryProjects(term) {
    return {
        type: actions.SEARCH_QUERY_PROJECTS,
        term: term,
    }
}
