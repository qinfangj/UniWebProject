"use strict";
import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import store from '../../../core/store';
import { signupUser } from '../../actions/actionCreators/authActionCreators';
import Validators  from '../../forms/validators';
import Feedback from '../../utils/Feedback';
import formNames from '../../constants/formNames';

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
        let fieldCheck = this.validateName(firstName);
        this.setState({firstName: firstName, msgFirstNm: fieldCheck.msg,
            fbFirstNm: fieldCheck.feedback});
    }
    onChangeLastName(e) {
        this.setState({lastName: e.target.value});
        let lastName = e.target.value;
        let fieldCheck2 = this.validateName(lastName);
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
            return {msg: "Password cannot be empty!", msg2: "", feedback: "warning", feedback2: null};
        } else if (pwd.length !== 0 && pwd !== pwd2) {
            //Check if re-entered password is matched with the entered password.
            //Set appropriate feedbacks and error messages.
            return {msg: "", msg2: "Re-entered password does not match.", feedback: null, feedback2: "warning"};
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
            return {msg: "Field cannot be empty!", feedback: "warning" };
        } else {
            return {msg: "", feedback: "success" };
        }
    }

    validateName(name) {
        let fieldCheck = this.validateField(name);

        if (fieldCheck.msg===""){
            let checkName = Validators.userNameValidator(name);
            if (checkName.valid) {
                return {msg: "", feedback: "success" };
            } else {
                return {msg: checkName.msg, feedback: "warning" };
            }

        }else {
            return fieldCheck;
        }
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

    isDisabledButton(){
        let disabled = ! (this.state.fbPassword === "success" && this.state.fbPassword2 === "success"
                            && this.state.fbFirstNm === "success" && this.state.fbLastNm === "success"
                            && this.state.fbEmail ==="success");
        return disabled;
    }

    render() {
        return (
            <div className={css.formContainer}>
                <Feedback reference={formNames.SIGN_UP_FORM} />
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

                </Form>

                <Button onClick={this.submit.bind(this)} className={css.loginButton} disabled={this.isDisabledButton()}>
                    Submit >
                </Button>

            </div>
        );
    }

}


export default SignupForm;

