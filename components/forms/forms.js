import React from 'react';
import store from '../../core/store';
import css from './forms.css';
import _ from 'lodash';
import { insertAsync } from '../actions/actionCreators/asyncActionCreators';
import Alert from 'react-bootstrap/lib/Alert';


function submit(tableName, formData, required, formatFormData) {
    console.info(JSON.stringify(formData, null, 2));
    let fields = Object.keys(formData);
    let nullFields = required.filter(k => formData[k] === null);
    let invalidFields = fields.filter(k => formData[k] === null);
    let state = {};
    if (invalidFields.length !== 0) {
        let missing = _.zipObject(nullFields, new Array(nullFields.length).fill(true));
        let invalid = _.zipObject(invalidFields, new Array(invalidFields.length).fill(true));
        state = {missing, invalid, submissionError: true};
    } else {
        state = {missing: {}, invalid: {}, submissionError: false};
        if (formatFormData) {
            formData = formatFormData(formData);
        }
        store.dispatch(insertAsync(tableName, formData));
    }
    return state;
}


class SubmissionErrorMessage extends React.Component {
    state = { visible: this.props.error };
    static propTypes = { error: React.PropTypes.bool };

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


export {
    submit,
    SubmissionErrorMessage,
}