import React from 'react';
import LoginWidget from '../../components/login/LoginWidget';
import LoginForm from '../../components/login/forms/LoginForm';
import SignupForm from '../../components/login/forms/SignupForm';
import ForgotPasswordForm from '../../components/login/forms/ForgotPasswordForm';
import ChangePasswordForm from '../../components/login/forms/ChangePasswordForm';


export class LoginPage extends React.Component {
    render() {
        return (
            <LoginWidget>
                <LoginForm/>
            </LoginWidget>
        );
    }
}


export class SignupPage extends React.Component {
    render() {
        return (
            <LoginWidget>
                <SignupForm/>
            </LoginWidget>
        );
    }
}


export class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <LoginWidget>
                <ForgotPasswordForm/>
            </LoginWidget>
        );
    }
}


export class ChangePasswordPage extends React.Component {
    render() {
        let {email, code} = this.props.location.query;
        return (
            <LoginWidget>
                <ChangePasswordForm email={email} code={code} />
            </LoginWidget>
        );
    }
}

