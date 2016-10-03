

function isFormComplete(formValues) {
    return formValues.indexOf(null) === -1;
}

function codeNameValidator(v) {
    let valid = /^\w+_[a-zA-Z]{2}$/.test(v);
    let msg = "Code name must be one word followed by an underscore, followed by PI initials.";
    return {valid, msg};
}


export {
    isFormComplete,
    codeNameValidator,
};

