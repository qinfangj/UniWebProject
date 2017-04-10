"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { resetFeedback } from '../actions/actionCreators/formsActionCreators';
import css from './forms.css';
import Alert from 'react-bootstrap/lib/Alert';
import constants from '../constants/constants';


export class SubmissionFeedback extends React.PureComponent {

    static propTypes = {
        form: React.PropTypes.string.isRequired,
        status: React.PropTypes.string,
        msg: React.PropTypes.string,
    };

    render() {
        let bsStyle = undefined, show = true, msg = "";
        switch (this.props.status) {
            case constants.SUBMISSION_SUCCESS:
                bsStyle = "success";
                msg = "Submission successful";
                break;
            case constants.SUBMISSION_ERROR:
                bsStyle = "warning";
                msg = "Some required fields are missing or ill-formatted. Please review the form and submit again.";
                break;
            case constants.SERVER_ERROR:
                bsStyle = "danger";
                let error = this.props.error;
                msg = `${error.statusText} (${error.status}): ${error.responseText}`;
                break;
            default:
                show = false;
                break;
        }
        if (show) {
            return (
                <Alert bsStyle={bsStyle} onClick={this.props.resetFeedback}>
                    {msg}
                    <span className={css.alertOk} onClick={this.props.resetFeedback}><a>OK</a></span>
                </Alert>
            );
        } else return null;
    }
}


SubmissionFeedback.defaultProps = {
    status: "",
    msg: "",
};

const mapStateToProps = (state, ownProps) => {
    let submission = state.forms[ownProps.form]._submission;
    return {
        status: submission.status,
        msg: submission.msg,
        error: submission.error,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetFeedback: () => dispatch(resetFeedback(ownProps.form)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionFeedback);





/************************ OLDER VERSION ******************************/




/**
 * Error message showing on top of the screen when an invalid form is submitted.
 */
export class SubmissionErrorMessage extends React.PureComponent {
    /* Need a state and not only props because we want to be able to close it without changing props. */
    state = {
        visible: this.props.error,
    };
    static propTypes = {
        error: React.PropTypes.bool.isRequired,
    };
    componentWillReceiveProps(newProps) {
        this.setState({visible: newProps.error});
    }
    discardErrorMessage() {
        this.setState({visible: false});
    }
    render() {
        let warningMessage = "Some required fields are missing or ill-formatted. Please review the form and submit again.";
        if (this.state.visible) {
            return (
                <Alert bsStyle="warning" onClick={this.discardErrorMessage.bind(this)}>
                    {warningMessage}
                    <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                </Alert>
            );
        } else return null;
    }
}

/**
 * Info message showing on top of the screen when a valid form is submitted.
 */
export class SubmissionSuccessfulMessage extends React.PureComponent {
    state = { visible:
    this.props.success
    };
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
        let message = "Submission successful" + (this.props.id ? ` (#${this.props.id})` : '');
        if (this.props.id && this.state.visible) {
            return (
                <Alert bsStyle="success" onClick={this.discardErrorMessage.bind(this)}>
                    {message}
                    <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                </Alert>
            );
        } else return null;
    }
}

export class ServerErrorMessage extends React.PureComponent {
    state = {
        error: this.props.error,
        visible: this.isError(this.props.error),
    };
    static propTypes = {
        error: React.PropTypes.object.isRequired,
    };
    isError(err) {
        return err.status && err.status !== 200;
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            error: newProps.error,
            visible: this.isError(newProps.error),
        });
    }
    discardErrorMessage() {
        this.setState({visible: false});
    }
    render() {
        let error = this.state.error;
        let message = `${error.statusText} (${error.status}): ${error.responseText}`;
        if (this.state.visible) {
            return (
                <Alert bsStyle="danger" onClick={this.discardErrorMessage.bind(this)}>
                    {message}
                    <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                </Alert>
            );
        } else return null;
    }
}


