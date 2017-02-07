import React from 'react';
import css from './login.css';
import LoginForm from './LoginForm';



class LoginWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "login",
        };
    }

    render() {
        let form = (this.state.mode === "login") ? <LoginForm/> : <SignupForm/>;
        return (
            <div className={css.loginWidget}>
                {form}
            </div>
        );
    }

}


export default LoginWidget;
