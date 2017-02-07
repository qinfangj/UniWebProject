import React from 'react';
import css from './LoginPage.css';
import LoginWidget from '../../components/login/LoginWidget';



class LoginPage extends React.Component {
    render() {
        return (
            <div className={css.loginPage}>
                <LoginWidget/>
            </div>
        );
    }

}


export default LoginPage;
