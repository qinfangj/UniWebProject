
import * as constants from '../actionTypes';


function changeFormInput(form, field, value) {
    return {
        type: constants.CHANGE_FORM_INPUT,
        form: form,
        field: field,
        value: value,
    };
}

function insert(table, fields, values) {
    return {
        type: constants.INSERT,
        table: table,
        fields: fields,
        values: values,
    };
}


export {
    changeFormInput,
    insert,
};
