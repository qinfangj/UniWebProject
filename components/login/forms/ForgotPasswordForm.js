"use strict";
import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import store from '../../../core/store';
import { requestResetPassword } from '../../actions/actionCreators/authActionCreators';
import validators  from '../../forms/validators';

import {Form, FormControl, InputGroup, FormGroup, Button, HelpBlock} from 'react-bootstrap/lib';
import formNames from '../../constants/formNames';



class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "test@test.com",
            fbEmail: null,
            msgEmail: "",
        };
    }

    submit() {
        store.dispatch(requestResetPassword(this.state.email));
    }

    onChangeEmail = (e) => {
        let email = e.target.value;
        let emailCheck = this.validateEmail(email);
        this.setState({
            email: email,
            msgEmail: emailCheck.msg,
            fbEmail: emailCheck.feedback
        });
    };

    validateEmail = (field) => {
        let isValid = validators.emailValidator(field);
        if (isValid) {
            return {msg: "", feedback: "success" };
        } else {
            return {msg: "Email is not valid", feedback: "warning" };
        }
    };

    render() {
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    To reset your password, submit your email address.

                    <FormGroup className={css.formGroup} validationState={this.state.fbEmail}>
                        <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                        </InputGroup>
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.msgEmail}</HelpBlock>
                    </FormGroup>
                </Form>

                <Button onClick={this.submit.bind(this)} className={css.loginButton}>
                    Reset password >
                </Button>

            </div>
        );
    }

}


export default ForgotPasswordForm;

