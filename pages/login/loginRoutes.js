import React from 'react';
import LoginWidget from '../../components/login/LoginWidget';
import LoginForm from '../../components/login/LoginForm';
import SignupForm from '../../components/login/SignupForm';
import ForgotPasswordForm from '../../components/login/ForgotPasswordForm';


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

