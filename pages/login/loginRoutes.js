import React from 'react';
import LoginWidget from '../../components/login/LoginWidget';
import LoginForm from '../../components/login/forms/LoginForm';
import SignupForm from '../../components/login/forms/SignupForm';
import ForgotPasswordForm from '../../components/login/forms/ForgotPasswordForm';


export class LoginPage extends React.Component {
    render() {
        return (
            <LoginWidget mode="login">
                <LoginForm/>
            </LoginWidget>
        );
    }
}


export class SignupPage extends React.Component {
    render() {
        return (
            <LoginWidget mode="signup">
                <SignupForm/>
            </LoginWidget>
        );
    }
}


export class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <LoginWidget mode="forgotPassword">
                <ForgotPasswordForm/>
            </LoginWidget>
        );
    }
}


// export class ChangePasswordPage extends React.Component {
//     render() {
//         return (
//             <div>
//                 <LoginWidget>
//                     <SignupForm/>
//                 </LoginWidget>
//             </div>
//         );
//     }
// }

