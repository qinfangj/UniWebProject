"use strict";
import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import commonCss from '../../../styles/common.css';
import store from '../../../core/store';
import { changePassword } from '../../actions/actionCreators/authActionCreators';
import { Link, hashHistory } from 'react-router';

import {Form, FormControl, InputGroup, FormGroup, Button, Glyphicon,HelpBlock} from 'react-bootstrap/lib';



class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            password: "",
            password2: "",
            valid: false,
            feedBack:null,
            feedBack2:null,
            msg:"",
            msg2:""
        };
    }

    static propTypes = {
        code: React.PropTypes.string,
        email: React.PropTypes.string,
    };

    submit() {
        store.dispatch(changePassword(this.props.code, this.props.email, this.state.password));
        //After reset password, redirect to login page qinfang jolliet
        hashHistory.push('/login');
    }

    onChangeCode(e) {
        this.setState({code: e.target.value});
    }

    onChangePassword(e) {
        let password=e.target.value;
        let password2= this.state.password2;
        let pwdChecked=this.validatePwd(password,password2);

        this.setState({password: password,msg:pwdChecked.msg,msg2:pwdChecked.msg2,feedBack:pwdChecked.feedBack,feedBack2:pwdChecked.feedBack2});

    }

    onChangePassword2(e) {
        //this.setState({password2: e.target.value});
        let password2=e.target.value;
        let password= this.state.password;
        let pwdChecked2=this.validatePwd(password,password2);

        this.setState({password2: password2,msg:pwdChecked2.msg,msg2:pwdChecked2.msg2,feedBack:pwdChecked2.feedBack,feedBack2:pwdChecked2.feedBack2});
    }

    validatePwd (pwd,pwd2) {

        if (pwd.length == 0) {
            //check if new password is empty.Set appropriate feedBacks and error messages
            //Set appropriate feedBacks and error messages.
            return {msg: "New password can't be empty!", msg2: "", feedBack: "warning",feedBack2:null};
        } else if (pwd.length !=0 && pwd !== pwd2){
            //check if re-enter password is matched with the entered password.
            //Set appropriate feedBacks and error messages
            return {msg: "", msg2: "Re-entered password is not matched.",feedBack: null, feedBack2: "warning"};
        } else if (pwd.length !=0 && pwd2.length !=0 && pwd === pwd2) {
            //check if re-enter password is matched .
            //Set appropriate feedBacks and error messages
            return {msg: "", msg2: "", feedBack: "success",feedBack2: "success"};
        }
    }

    enableButton(){
        let value = (this.state.feedBack ==="success" && this.state.feedBack2 ==="success") ? false:true;
        return value
    }

    render() {
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    {/*Enter in the field below the code that you received at your email address:*/}

                    Verification code:

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph='lock'/></InputGroup.Addon>
                            <FormControl
                                value={this.props.code}
                                disabled
                                onChange={this.onChangeCode.bind(this)}

                            />
                        </InputGroup>

                    </FormGroup>

                    Enter you new password:

                    <FormGroup className={css.formGroup} validationState={this.state.feedBack}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph='lock'/></InputGroup.Addon>
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

                    <FormGroup className={css.formGroup} validationState={this.state.feedBack2}>
                        <InputGroup>
                        <InputGroup.Addon><Glyphicon glyph='lock'/></InputGroup.Addon>
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

                <Button onClick={this.submit.bind(this)} className={css.loginButton} disabled={this.enableButton()}>
                    Update password >
                </Button>

            </div>
        );
    }

}


export default ChangePasswordForm;

