import React from 'react';
import store from '../../core/store';
import css from './forms.css';
import _ from 'lodash';
import { insertAsync } from '../actions/actionCreators/facilityDataActionCreators';
import { changeFormValue } from '../actions/actionCreators/commonActionCreators';
import Alert from 'react-bootstrap/lib/Alert';


export const defaultFormState = {
    submissionError: false,
    submissionSuccess: false,
    submissionId: undefined,
};

export function initForm(form) {
    if (! store.getState().common.forms[form]) {
        store.getState().common.forms[form] = {};
        store.getState().common.forms[form]._isValid = {};
    }
}
export function initFormField(form, field, value=null) {
    if (! store.getState().common.forms[form][field]) {
        store.getState().common.forms[form][field] = value;
        store.getState().common.forms[form]._isValid[field] = true;
    }
}

/**
 * Get the value of that input from the store.
 */
export function getFormValue(form, field) {
    let storeData = store.getState().common.forms[form];
    if (! storeData) {
        return null;
    } else {
        return storeData[field];
    }
}
export function changeValue(form, field, value, valid) {
    if (form !== undefined) {
        store.dispatch(changeFormValue(form, field, value, valid));
    }
}


/**
 * Get all field values for one form from the store, as an object {field: value}.
 * `value` is null if the field is not valid.
 */
export function getFormData(form) {
    let storedForm = store.getState().common.forms[form];
    let formData = {};
    for (let key of Object.keys(storedForm)) {
        let valid = storedForm._isValid[key];
        if (valid === false) {
            formData[key] = null;
        } else {
            formData[key] = storedForm[key];
        }
        /* DON'T DO THIS:
             formData[key] = valid ? storedForm[key] : null;
           because if the value is null the key is added to the object (unlike undefined).
           and we don't want to submit everything we get from a backend row, or things like '_valid'.
        */
    }
    delete formData._isValid;
    return formData;
}

/**
 * Send the `formData` for insert or update of db `table`.
 * A custom formatter `formatFormData` can be given to transform the data before submission.
 */
export function submit(form, table, formatFormData=null) {
    let state = {};
    let formData = getFormData(form);
    console.info(JSON.stringify(formData, null, 2));
    let fields = Object.keys(formData);
    // Check if some fields have value 'null' (invalid or missing+required)
    let invalidFields = fields.filter(k => formData[k] === null);
    // Invalid form: don't submit, return an error
    if (invalidFields.length !== 0) {
        let invalid = _.zipObject(invalidFields, new Array(invalidFields.length).fill(true));
        state = {invalid, submissionError: true};
    // Valid form: send
    } else {
        if (formatFormData) {
            formData = formatFormData(formData);
        }
        let future = store.dispatch(insertAsync(table, formData));
        state = {submissionError: false, submissionFuture: future};
        future
            .done((insertId) => console.debug(200, "Inserted ID <"+insertId+">"))
            .fail(() => console.warn("Uncaught form validation error"));
    }
    return state;
}

/**
 * Error message showing on top of the screen when an invalid form is submitted.
 */
export class SubmissionErrorMessage extends React.Component {
    state = { visible: this.props.error };
    static propTypes = {
        error: React.PropTypes.bool.isRequired
    };
    componentWillReceiveProps(newProps) {
        this.setState({visible: newProps.error});
    }
    discardErrorMessage() {
        this.setState({visible: false});
    }
    render() {
        if (this.state.visible) {
            return (
                <Alert bsStyle="warning" onClick={this.discardErrorMessage.bind(this)}>
                    Some required fields are missing or ill-formatted. Please review the form and submit again.
                    <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                </Alert>
            );
        } else return null;
    }
}

/**
 * Info message showing on top of the screen when a valid form is submitted.
 */
export class SubmissionSuccessfulMessage extends React.Component {
    state = { visible: this.props.success };
    static propTypes = {
        success: React.PropTypes.bool.isRequired,
        id: React.PropTypes.number,
    };
    componentWillReceiveProps(newProps) {
        this.setState({visible: newProps.success});
    }
    discardErrorMessage() {
        this.setState({visible: false});
    }
    render() {
        if (this.props.id && this.state.visible) {
            return (
                <Alert bsStyle="success" onClick={this.discardErrorMessage.bind(this)}>
                    {"Submission successful" + (this.props.id ? ` (#${this.props.id})` : '')}
                    <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                </Alert>
            );
        } else return null;
    }
}
