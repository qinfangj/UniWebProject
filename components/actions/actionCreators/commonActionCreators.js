
import actions from '../actionTypes';


/**
 * Open/close the left menu
 */
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



