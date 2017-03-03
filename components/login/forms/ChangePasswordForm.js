"use strict";
import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import store from '../../../core/store';
import { changePassword } from '../../actions/actionCreators/authActionCreators';

import {Form, FormControl, InputGroup, FormGroup, Button, HelpBlock} from 'react-bootstrap/lib';
import Icon from 'react-fontawesome';



class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            password: "",
            password2: "",
            valid: false,
            feedback: null,
            feedback2: null,
            msg: "",
            msg2: ""
        };
    }

    static propTypes = {
        code: React.PropTypes.string,
        email: React.PropTypes.string,
    };

    submit() {
        store.dispatch(changePassword(this.props.code, this.props.email, this.state.password));
    }

    onChangeCode(e) {
        this.setState({code: e.target.value});
    }

    onChangePassword(e) {
        let password = e.target.value;
        let password2 = this.state.password2;
        let pwdChecked = this.validatePwd(password, password2);
        this.setState({password: password, msg: pwdChecked.msg, msg2: pwdChecked.msg2,
                       feedback: pwdChecked.feedback, feedback2: pwdChecked.feedback2});

    }

    onChangePassword2(e) {
        let password2 = e.target.value;
        let password = this.state.password;
        let pwdChecked2 = this.validatePwd(password, password2);
        this.setState({password2: password2, msg: pwdChecked2.msg, msg2: pwdChecked2.msg2,
                       feedback: pwdChecked2.feedback, feedback2: pwdChecked2.feedback2});
    }

    validatePwd (pwd,pwd2) {

        if (pwd.length === 0) {
            //Check if new password is empty. Set appropriate feedbacks and error messages
            //Set appropriate feedbacks and error messages.
            return {msg: "New password can't be empty!", msg2: "", feedback: "warning", feedback2: null};
        } else if (pwd.length !== 0 && pwd !== pwd2) {
            //Check if re-entered password is matched with the entered password.
            //Set appropriate feedbacks and error messages.
            return {msg: "", msg2: "Re-entered password is not matched.", feedback: null, feedback2: "warning"};
        } else if (pwd.length !== 0 && pwd2.length !== 0 && pwd === pwd2) {
            //Check if re-entered password is matched.
            //Set appropriate feedbacks and error messages
            return {msg: "", msg2: "", feedback: "success", feedback2: "success"};
        }
    }

    isDisabledButton(){
        let disabled = ! (this.state.feedback === "success" && this.state.feedback2 === "success");
        return disabled;
    }

    render() {
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    {/*Enter in the field below the code that you received at your email address:*/}

                    Verification code:

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                            <InputGroup.Addon><Icon name="lock"/></InputGroup.Addon>
                            <FormControl
                                value={this.props.code}
                                disabled
                                onChange={this.onChangeCode.bind(this)}

                            />
                        </InputGroup>

                    </FormGroup>

                    Enter you new password:

                    <FormGroup className={css.formGroup} validationState={this.state.feedback}>
                        <InputGroup>
                            <InputGroup.Addon><Icon name="lock"/></InputGroup.Addon>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                onChange={this.onChangePassword.bind(this)}
                            />
                        </InputGroup>
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.msg}</HelpBlock>
                    </FormGroup>

                    Re-enter your new password for confirmation:

                    <FormGroup className={css.formGroup} validationState={this.state.feedback2}>
                        <InputGroup>
                        <InputGroup.Addon><Icon name="lock"/></InputGroup.Addon>
                        <FormControl
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChangePassword2.bind(this)}
                        />
                        </InputGroup>
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.msg2}</HelpBlock>
                    </FormGroup>

                </Form>

                <Button onClick={this.submit.bind(this)} className={css.loginButton} disabled={this.isDisabledButton()}>
                    Update password >
                </Button>

            </div>
        );
    }

}


export default ChangePasswordForm;

