

function codeNameValidator(v) {
    let valid = /^\w+_[a-zA-Z]+$/.test(v);
    let msg = "Code name must be one word followed by an underscore, followed by PI initials.";
    return {valid, msg};
}


export {
    codeNameValidator,
};

