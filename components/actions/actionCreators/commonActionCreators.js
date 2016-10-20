
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


export {
    sendError,
    toggleSidebar,
};
