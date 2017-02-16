import React from 'react';
import css from './login.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Link from 'react-router';
import { browserHistory } from 'react-router';
import { Button, ButtonGroup } from 'react-bootstrap/lib';



class LoginWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    goToLogin() {
        browserHistory.push('/login');
    }

    goToSignup() {
        browserHistory.push('/signup');
    }

    render() {
        return (
            <div className={css.loginWidget}>
                <div>
                    <ButtonGroup className={css.switchLoginSignup}>
                        <Button className={css.modeButton} onClick={this.goToLogin}>Log In</Button>
                        <Button className={css.modeButton} onClick={this.goToSignup}>Sign up</Button>
                    </ButtonGroup>
                </div>
                {this.props.children}
            </div>
        );
    }

}


export default LoginWidget;
