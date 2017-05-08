"use strict";

/*
 * Validators take an input value and return an "Error" object
 * `{valid <boolean>, msg <string>}`.
 */


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function trimmed(v) {
    return (''+v).trim();
}


class Validators {

    codeNameValidator(v) {
        let valid = /^\w+_[a-zA-Z]{2}$/.test(trimmed(v));
        return valid;
    }

    shortStringValidator(v) {
        let valid = /^[\w ]{2,10}$/.test(trimmed(v));
        return valid;
    }

    mediumStringValidator(v) {
        let valid = /^[\w ]{0,30}$/.test(trimmed(v));
        return valid;
    }

    descriptionValidator(v) {
        let valid = trimmed(v).split(" ").length >= 3;
        return valid;
    }

    laneNumberValidator(v) {
        let valid = true;
        if (! Number.isInteger(v)) {
            valid = /^[1-8]$/.test(trimmed(v));
        }
        return valid;
    }

    integerValidator(v) {
        let valid = true;
        if (! Number.isInteger(v)) {
            valid = /^[0-9]*$/.test(trimmed(v));
        }
        return valid;
    }

    positiveIntegerValidator(v) {
        let valid = true;
        if (! Number.isInteger(v)) {
            valid = /^[1-9]+$/.test(trimmed(v));
        }
        return valid;
    }

    /**
     * Positive floats.
     */
    numberValidator(v) {
        let valid = isNumeric(trimmed(v));
        return valid;
    }

    emailValidator(v) {
        let regex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ ;
        let valid = regex.test(trimmed(v));
        return valid;
    }

    phoneValidator(v) {
        let regex = /^[0-9]{9,}$/ ;
        let stripped = trimmed(v).replace(/[+()\- ]*/g, "");
        let valid = regex.test(stripped);
        return valid;
    }

}


export default new Validators;

