"use strict";
import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import commonCss from '../../../styles/common.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginUser } from '../../actions/actionCreators/authActionCreators';
import * as feedback from '../../../utils/feedback';
import { isdev } from '../../../utils/common';

import { Link } from 'react-router';
import { Form, FormControl, InputGroup, FormGroup, Button } from 'react-bootstrap/lib';
import Icon from 'react-fontawesome';



class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: isdev() ? "test" : "",
            password: isdev() ? "test" : "",
        };
    }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.serverError) {
    //         let feedbackMessage = this.getFeedback();
    //         feedback.info(feedbackMessage);
    //     }
    // }

    submit = (e) => {
        e.preventDefault();
        this.props.loginUser(
            {
                username: this.state.username,
                password: this.state.password,
            }
        );
    };

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    };

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    getFeedback = () => {
        let feedback = "";
        let message = this.props.errorMessage;
        if (message === "Unauthorized") {
            feedback = "Wrong username or password";
        } else {
            feedback = "Unexpected error: " + message;
        }
        return feedback;
    };

    render() {
        return (
            <div className={css.formContainer}>

                {alert}

                <Form className={css.form} onSubmit={this.submit}>

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                        <InputGroup.Addon><Icon name="user"/></InputGroup.Addon>
                        <FormControl
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                        <InputGroup.Addon><Icon name="lock"/></InputGroup.Addon>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                        </InputGroup>
                    </FormGroup>

                    <div className={css.forgotPassword}>
                        <Link to='/forgotPassword' className={cx(css.forgotPasswordLink, commonCss.nolink)}>
                            Don't remember your password?
                        </Link>
                    </div>

                    <Button type="submit" className={css.loginButton}>
                        Log in >
                    </Button>

                </Form>

            </div>
        );
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        serverError: state.auth.isError,
        errorMessage: state.auth.errorMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loginUser }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

