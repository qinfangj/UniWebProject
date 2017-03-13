"use strict";
import React from 'react';
import css from './forms.css';
import Alert from 'react-bootstrap/lib/Alert';


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


// export class FeedbackMessages extends React.PureComponent {
//     static propTypes = {
//         submissionError: React.PropTypes.object.bool,
//         submissionSuccess: React.PropTypes.object.bool,
//         serverError: React.PropTypes.object.object,
//         submissionId: React.PropTypes.number,
//     };
//     render() {
//         return (
//             <div>
//                 <SubmissionErrorMessage error={this.props.submissionError} />
//                 <SubmissionSuccessfulMessage success={this.props.submissionSuccess} id={this.props.submissionId} />
//                 <ServerErrorMessage error={this.props.serverError} />
//             </div>
//         );
//     }
// }