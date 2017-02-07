import React from 'react';
import css from './login.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import { Button, ButtonGroup } from 'react-bootstrap/lib';



class LoginWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "login",
        };
    }

    changeMode(mode) {
        this.setState({ mode });
    }

    render() {
        let form = (this.state.mode === "login") ? <LoginForm/> : <SignupForm/>;
        return (
            <div className={css.loginWidget}>
                <div>
                    <ButtonGroup className={css.switchLoginSignup}>
                        <Button className={css.modeButton} onClick={this.changeMode.bind(this, "login")}>Log In</Button>
                        <Button className={css.modeButton} onClick={this.changeMode.bind(this, "signup")}>Sign Up</Button>
                    </ButtonGroup>
                </div>
                {form}
            </div>
        );
    }

}


export default LoginWidget;
