"use strict";

/*
 * Validators take an input value and return true/false.
 */


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function trimmed(v) {
    return (''+v).trim();
}


class Validators {

    /** User name must contain alphanumeric characters, plus are allowed space, ',', '-', '_'. */
    userNameValidator(v){
        let valid = /^[a-zA-Z .,\-_]*$/.test(trimmed(v));
        return valid;
    }

    /** Code name must be one word followed by an underscore, followed by PI initials. */
    codeNameValidator(v) {
        if (v === "") { return true; }
        let valid = /^\w+_[a-zA-Z]{2}$/.test(trimmed(v));
        return valid;
    }

    /** 2-10 characters. */
    shortStringValidator(v) {
        if (v === "") { return true; }
        let valid = /^[\w ]{2,10}$/.test(trimmed(v));
        return valid;
    }

    /** 0-30 characters. */
    mediumStringValidator(v) {
        if (v === "") { return true; }
        let valid = /^[\w ]{0,30}$/.test(trimmed(v));
        return valid;
    }

    /** Description must be empty or have at least 3 words. */
    descriptionValidator(v) {
        if (v === "") { return true; }
        let valid = trimmed(v).split(" ").length >= 3;
        return valid;
    }

    /** Lane number is one digit between 1 and 8. */
    laneNumberValidator(v) {
        if (v === "") { return true; }
        let valid = true;
        if (! Number.isInteger(v)) {
            valid = /^[1-8]$/.test(trimmed(v));
        }
        return valid;
    }

    /** Must be an integer. */
    integerValidator(v) {
        if (v === "") { return true; }
        let valid = true;
        if (! Number.isInteger(v)) {
            valid = /^[0-9]*$/.test(trimmed(v));
        }
        return valid;
    }

    /** Must be a non-null integer. */
    positiveIntegerValidator(v) {
        if (v === "") { return true; }
        let valid = true;
        if (! Number.isInteger(v)) {
            valid = /^[1-9]+$/.test(trimmed(v));
        }
        return valid;
    }

    /**
     * Positive floats.
     */
    // input type="number" should make this obsolete
    numberValidator(v) {
        if (v === "") { return true; }
        let valid = isNumeric(trimmed(v));
        return valid;
    }

    // input type="email" should make this obsolete
    emailValidator(v) {
        if (v === "") { return true; }
        let regex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ ;
        let valid = regex.test(trimmed(v));
        return valid;
    }

    // input type="phone" should make this obsolete (but it does not seem to work well)
    phoneValidator(v) {
        if (v === "") { return true; }
        let regex = /^[0-9]{9,}$/ ;
        let stripped = trimmed(v).replace(/[+()\- ]*/g, "");
        let valid = regex.test(stripped);
        return valid;
    }

}


export default new Validators;

