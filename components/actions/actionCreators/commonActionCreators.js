
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
export function go_to(url) {
    return {
        type: actions.GOTO,
        url: url,
    }
}

