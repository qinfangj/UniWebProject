
import * as constants from '../actionTypes';


function changeFormInput(form, field, value) {
    return {
        type: constants.CHANGE_FORM_INPUT,
        form: form,
        field: field,
        value: value,
    };
}


export {
    changeFormInput,
};
