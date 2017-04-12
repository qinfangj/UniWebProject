"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { resetFeedback } from '../actions/actionCreators/formsActionCreators';
import css from './forms.css';
import Alert from 'react-bootstrap/lib/Alert';
import constants from '../constants/constants';



export class SubmissionFeedback extends React.PureComponent {

    static propTypes = {
        status: React.PropTypes.string,  // one of the three constants in the switch below, or ""
        msg: React.PropTypes.string,
        error: React.PropTypes.object,  // an error object such as returned by fetch() or jQuery $.ajax().
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
    error: {},
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

