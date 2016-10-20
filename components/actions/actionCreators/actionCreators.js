
import actions from '../actionTypes';


function toggleSidebar(open) {
    return {
        type: actions.TOGGLE_SIDEBAR,
        open: open,
    };
}


export {
    toggleSidebar,
};
