"use strict";
import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import store from '../../../core/store';
import { signupUser } from '../../actions/actionCreators/authActionCreators';
import Validators  from '../../forms/validators';

import {Form, FormControl, InputGroup, FormGroup, ControlLabel, Button, HelpBlock} from 'react-bootstrap/lib';
import Icon from 'react-fontawesome';



class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            phone: "",
            fbPassword: null,
            fbPassword2: null,
            fbFirstNm: null,
            fbLastNm: null,
            fbEmail: null,
            msg: "",
            msg2: "",
            msgFirstNm: "",
            msgLastNm:"",
            msgEmail: "",
        };
    }

    submit() {
        store.dispatch(signupUser(
            {
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                address: this.state.address,
                phone: this.state.phone
            }
        ));
    }

    onChangePassword(e) {
        //this.setState({password: e.target.value});
        let password = e.target.value;
        let confirmPassword = this.state.confirmPassword;
        let pwdChecked = this.validatePwd(password, confirmPassword);
        this.setState({password: password, msg: pwdChecked.msg, msg2: pwdChecked.msg2,
            fbPassword: pwdChecked.feedback, fbPassword2: pwdChecked.feedback2});
    }
    onChangeConfirmPassword(e) {
        //this.setState({confirmPassword: e.target.value});
        let confirmPassword = e.target.value;
        let password = this.state.password;
        let pwdChecked2 = this.validatePwd(password, confirmPassword);
        this.setState({confirmPassword: confirmPassword, msg: pwdChecked2.msg, msg2: pwdChecked2.msg2,
            fbPassword: pwdChecked2.feedback, fbPassword2: pwdChecked2.feedback2});
    }
    onChangeFirstName(e) {
        //this.setState({firstName: e.target.value});
        let firstName = e.target.value;
        let fieldCheck = this.validateField(firstName);
        this.setState({firstName: firstName, msgFirstNm: fieldCheck.msg,
            fbFirstNm: fieldCheck.feedback});
    }
    onChangeLastName(e) {
        this.setState({lastName: e.target.value});
        let lastName = e.target.value;
        let fieldCheck2 = this.validateField(lastName);
        //console.log(fieldCheck2.feedback);
        this.setState({LastName: lastName, msgLastNm: fieldCheck2.msg,
            fbLastNm: fieldCheck2.feedback});
    }
    onChangeEmail(e) {
        this.setState({email: e.target.value});
        let email = e.target.value;
        let emailCheck = this.validateEmail(email);
        this.setState({email: email, msgEmail: emailCheck.msg,
            fbEmail: emailCheck.feedback});
    }
    onChangeAddress(e) {
        this.setState({address: e.target.value});
    }
    onChangePhone(e) {
        this.setState({phone: e.target.value});
    }

    validatePwd (pwd,pwd2) {

        if (pwd.length === 0) {
            //Check if new password is empty. Set appropriate feedbacks and error messages
            //Set appropriate feedbacks and error messages.
            return {msg: "Password can't be empty!", msg2: "", feedback: "warning", feedback2: null};
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

    validateField(field) {
        if (field.length === 0) {
            //Check if input is empty. Set appropriate feedbacks and error messages
            //Set appropriate feedbacks and error messages.
            return {msg: "Field can't be empty!", feedback: "warning" };
        } else {
            return {msg: "", feedback: "success" };
        }
    }

    validateEmail(field) {
        let checkEmail = Validators.emailValidator(field);

        if (checkEmail.valid == true) {
            //return checkEmail object. if validator is true
            //Set appropriate feedbacks and error messages.
            return {msg: "", feedback: "success" };
        } else {
            return {msg: checkEmail.msg, feedback: "warning" };
        }
    }

    isDisabledButton(){
        let disabled = ! (this.state.fbPassword === "success" && this.state.fbPassword2 === "success"
                            && this.state.fbFirstNm === "success" && this.state.fbLastNm === "success"
                            && this.state.fbEmail ==="success");
        return disabled;
    }

    render() {
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    {/* Password */}

                    <FormGroup className={css.formGroup} validationState={this.state.fbPassword}>
                        <ControlLabel>Password</ControlLabel>
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

                    {/* Confirm Password */}

                    <FormGroup className={css.formGroup} validationState={this.state.fbPassword2}>
                        <ControlLabel>Re-enter Password</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Icon name="lock"/></InputGroup.Addon>
                            <FormControl
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={this.onChangeConfirmPassword.bind(this)}
                            />
                        </InputGroup>
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.msg2}</HelpBlock>
                    </FormGroup>

                    {/* First name */}

                    <FormGroup className={css.formGroup} validationState={this.state.fbFirstNm}>
                        <ControlLabel>First name</ControlLabel>
                        <FormControl
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName.bind(this)}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.msgFirstNm}</HelpBlock>
                    </FormGroup>

                    {/* Last name */}

                    <FormGroup className={css.formGroup} validationState={this.state.fbLastNm}>
                        <ControlLabel>Last name</ControlLabel>
                        <FormControl
                            value={this.state.lastName}
                            onChange={this.onChangeLastName.bind(this)}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.msgLastNm}</HelpBlock>
                    </FormGroup>

                    {/* Email */}

                    <FormGroup className={css.formGroup} validationState={this.state.fbEmail}>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            value={this.state.email}
                            onChange={this.onChangeEmail.bind(this)}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.msgEmail}</HelpBlock>
                    </FormGroup>

                    {/* Address */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>Address</ControlLabel>
                        <FormControl
                            value={this.state.address}
                            onChange={this.onChangeAddress.bind(this)}
                        />
                    </FormGroup>

                    {/* Phone */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>Phone</ControlLabel>
                        <FormControl
                            value={this.state.phone}
                            onChange={this.onChangePhone.bind(this)}
                        />
                    </FormGroup>

                    {/*<div className='form-actions col-sm-9 col-sm-offset-3'>*/}
                        {/*<button type="submit" className="submit-button btn btn-primary"*/}
                                {/*onClick={this.login} disabled={!this.formValid()}>Login</button>*/}
                        {/*{!this.isDemo ?*/}
                            {/*<Link id='signup-link' to='/signup'>Register</Link> : '' }*/}
                        {/*{!this.isDemo ?*/}
                            {/*<Link id='forget-password-link' to='/forgetPassword'>I forgot my password</Link> : '' }*/}
                    {/*</div>*/}

                </Form>

                <Button onClick={this.submit.bind(this)} className={css.loginButton} disabled={this.isDisabledButton()}>
                    Submit >
                </Button>

            </div>
        );
    }

}


export default SignupForm;

