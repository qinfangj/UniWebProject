import React from 'react';
import store from '../../core/store';
import css from './forms.css';
import _ from 'lodash';
import { insertAsync } from '../actions/actionCreators/facilityDataActionCreators';
import Alert from 'react-bootstrap/lib/Alert';


export const defaultFormState = {
    submissionError: false,
    submissionSuccess: false,
    submissionId: undefined,
};

/**
 * Get the value of that input from the store.
 */
export function getFormValue(form, storeKey) {
    if (! store.getState().common.forms[form]) {
        return null;
    } else {
        return store.getState().common.forms[form][storeKey];
    }
}


export function submit(tableName, formData, formatFormData=null) {
    console.info(JSON.stringify(formData, null, 2));
    let fields = Object.keys(formData);
    // Check if some fields have value 'null' (invalid or missing+required)
    let invalidFields = fields.filter(k => formData[k] === null);
    let state = {};
    // Invalid form: don't submit, return an error
    if (invalidFields.length !== 0) {
        let invalid = _.zipObject(invalidFields, new Array(invalidFields.length).fill(true));
        state = {invalid, submissionError: true};
    // Valid form: send
    } else {
        if (formatFormData) {
            formData = formatFormData(formData);
        }
        let future = store.dispatch(insertAsync(tableName, formData));
        state = {submissionError: false, submissionFuture: future};
    }
    return state;
}


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
