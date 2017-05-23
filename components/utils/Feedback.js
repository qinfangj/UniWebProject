"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetFeedback } from '../actions/actionCreators/feedbackActionCreators';
import css from './Feedback.css';
import Alert from 'react-bootstrap/lib/Alert';
import constants from '../constants/constants';



export class Feedback extends React.PureComponent {

    static propTypes = {
        reference: PropTypes.string.isRequired,  // to connect with redux (see at the bottom), a key to identify the source
        status: PropTypes.string,  // one of the three constants in the switch below, or ""
        message: PropTypes.string,  // the message to display
        error: PropTypes.object,  // an error object such as returned by fetch() or jQuery $.ajax().
    };

    render() {
        let bsStyle = undefined, show = true, message = this.props.message;
        let error = this.props.error;

        switch (this.props.status) {
            case constants.SUCCESS:
                bsStyle = "success";
                break;
            case constants.WARNING:
                bsStyle = "warning";
                break;
            case constants.ERROR:
                bsStyle = "danger";
                message = message === "" ? `${error.statusText} (${error.status}): ${error.responseText}` : message;
                break;
            default:
                show = false;
                break;
        }

        if (show) {
            return (
                <div className={css.alertWrapper}>
                    <Alert className={css.alert} bsStyle={bsStyle} onClick={this.props.resetFeedback}>
                        {message}
                        <span className={css.alertOk} onClick={this.props.resetFeedback}><a>OK</a></span>
                    </Alert>
                </div>
            );
        } else return null;
    }
}


Feedback.defaultProps = {
    status: "",
    message: "",
    error: {},
};

const mapStateToProps = (state, ownProps) => {
    let submission = state.feedback[ownProps.reference];
    if (!submission) {
        submission = {
            status: null,
            message: "",
            error: {},
        };
    }
    return {
        status: submission.status,
        message: submission.message,
        error: submission.error,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetFeedback: () => dispatch(resetFeedback(ownProps.reference)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

