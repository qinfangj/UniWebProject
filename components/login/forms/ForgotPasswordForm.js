"use strict";
import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import store from '../../../core/store';
import { requestResetPassword } from '../../actions/actionCreators/authActionCreators';
import Validators  from '../../forms/validators';

import {Form, FormControl, InputGroup, FormGroup, Button, HelpBlock} from 'react-bootstrap/lib';



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

    onChangeEmail(e) {
        this.setState({email: e.target.value});
        let email = e.target.value;
        let emailCheck = this.validateEmail(email);
        this.setState({email: email, msgEmail: emailCheck.msg,
            fbEmail: emailCheck.feedback});
    }

    validateEmail(field) {
        let checkEmail = Validators.emailValidator(field);

        if (checkEmail.valid === true) {
            //return checkEmail object. if validator is true
            //Set appropriate feedbacks and error messages.
            return {msg: "", feedback: "success" };
        } else {
            return {msg: checkEmail.msg, feedback: "warning" };
        }
    }

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
                            onChange={this.onChangeEmail.bind(this)}
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

