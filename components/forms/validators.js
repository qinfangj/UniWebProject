/*
 * Validators take an input value and return an "Error" object
 * `{valid <boolean>, msg <string>}`.
 */


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


class Validators {

    codeNameValidator(v) {
        let valid = /^\w+_[a-zA-Z]{2}$/.test(v.trim());
        let msg = "Code name must be one word followed by an underscore, followed by PI initials.";
        return {valid, msg};
    }

    shortStringValidator(v) {
        let valid = /^\w{2,10}$/.test(v.trim());
        let msg = "2-10 characters.";
        return {valid, msg};
    }

    mediumStringValidator(v) {
        let valid = /^\w{0,30}$/.test(v.trim());
        let msg = "0-30 characters.";
        return {valid, msg};
    }

    descriptionValidator(v) {
        let valid = v.trim().split(" ").length >= 3;
        let msg = "Description must be at least 3 words.";
        return {valid, msg};
    }

    laneNumberValidator(v) {
        let valid = true;
        let msg = "";
        if (! Number.isInteger(v)) {
            valid = /^[1-8]$/.test(v.trim());
            msg = "Lane number is one digit between 1 and 8.";
        }
        return {valid, msg};
    }

    integerValidator(v) {
        let valid = true;
        let msg = "";
        if (! Number.isInteger(v)) {
            valid = /^[0-9]*$/.test(''+v.trim());
            msg = "Must be an integer.";
        }
        return {valid, msg};
    }

    positiveIntegerValidator(v) {
        let valid = true;
        let msg = "";
        if (! Number.isInteger(v)) {
            valid = /^[1-9]+$/.test(v.trim());
            msg = "Must be a non-null integer.";
        }
        return {valid, msg};
    }

    /**
     * Positive floats.
     */
    numberValidator(v) {
        let valid = isNumeric(v);
        let msg = "Must be a number.";
        return {valid, msg};
    }

    emailValidator(v) {
        let regex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ ;
        let valid = regex.test(v.trim());
        let msg = "Email is not valid.";
        return {valid, msg};
    }

    phoneValidator(v) {
        let regex = /^[0-9]{9,}$/ ;
        let stripped = v.trim().replace(/[+()\- ]*/g, "");
        let valid = regex.test(stripped);
        let msg = "Not a valid phone number (9+ digits. Accepts +,-,(), and spaces).";
        return {valid, msg};
    }

}


export default new Validators;

