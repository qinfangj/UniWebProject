"use strict";

/*
 * Validators take an input value and return an "Error" object
 * `{valid <boolean>, msg <string>}`.
 */

function trimmed(v) {
    return (''+v).trim();
}


class Validators {

    userNameValidator(v){
        let valid = /^[a-zA-Z .,-]*$/.test(trimmed(v));
        let msg = "This field must be filled with characters including space, ',', '-', '_'. ";
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

    emailValidator(v) {
        let regex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ ;
        let valid = regex.test(trimmed(v));
        let msg = "Email is not valid.";
        return {valid, msg};
    }

}


export default new Validators;

