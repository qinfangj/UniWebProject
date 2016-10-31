
import actions from '../actionTypes';



function sendError(error) {
    return {
        type: actions.ERROR,
        error: error,
    };
}

function toggleSidebar(open) {
    return {
        type: actions.TOGGLE_SIDEBAR,
        open: open,
    };
}

function toggleSidebarSubmenu(open) {
    return {
        type: actions.TOGGLE_SIDEBAR_SUBMENU,
        open: open,
    };
}

/**
 * Navigate to new url
 */
function go_to(url) {
    return {
        type: actions.GOTO,
        url: url,
    }
}


export {
    sendError,
    toggleSidebar,
    toggleSidebarSubmenu,
    go_to,
};
