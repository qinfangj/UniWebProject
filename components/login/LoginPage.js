import React from 'react';
import cx from 'classnames';
import css from './login.css';
import LoginWidget from './LoginWidget';
import Col from 'react-bootstrap/lib/Col';



class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    render() {
        return (
            <div className={css.loginPage}>
                <LoginWidget/>
            </div>
        );
    }

}


export default LoginPage;
