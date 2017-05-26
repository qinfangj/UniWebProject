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
        let msg = "Code name must be one word followed by an underscore, followed by PI initials.";
        return {valid, msg};
    }

    shortStringValidator(v) {
        let valid = trimmed(v).length >= 2 && trimmed(v).length <= 10;
        let msg = "2-10 characters.";
        return {valid, msg};
    }

    mediumStringValidator(v) {
        let valid = trimmed(v).length <= 30;
        let msg = "0-30 characters.";
        return {valid, msg};
    }

    descriptionValidator(v) {
        let valid = trimmed(v).split(" ").length >= 3;
        let msg = "Description must be at least 3 words.";
        return {valid, msg};
    }

    laneNumberValidator(v) {
        let valid = true;
        let msg = "";
        if (! Number.isInteger(v)) {
            valid = /^[1-8]$/.test(trimmed(v));
            msg = "Lane number is one digit between 1 and 8.";
        }
        return {valid, msg};
    }

    integerValidator(v) {
        let valid = true;
        let msg = "";
        if (! Number.isInteger(v)) {
            valid = /^[0-9]*$/.test(trimmed(v));
            msg = "Must be an integer.";
        }
        return {valid, msg};
    }

    positiveIntegerValidator(v) {
        let valid = true;
        let msg = "";
        if (! Number.isInteger(v)) {
            valid = /^[1-9]+$/.test(trimmed(v));
            msg = "Must be a non-null integer.";
        }
        return {valid, msg};
    }

    /**
     * Positive floats.
     */
    numberValidator(v) {
        let valid = isNumeric(trimmed(v));
        let msg = "Must be a number.";
        return {valid, msg};
    }

    emailValidator(v) {
        let regex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ ;
        let valid = regex.test(trimmed(v));
        let msg = "Email is not valid.";
        return {valid, msg};
    }

    phoneValidator(v) {
        let regex = /^[0-9]{9,}$/ ;
        let stripped = trimmed(v).replace(/[+()\- ]*/g, "");
        let valid = regex.test(stripped);
        let msg = "Not a valid phone number (9+ digits. Accepts +,-,(), and spaces).";
        return {valid, msg};
    }

}


export default new Validators;

