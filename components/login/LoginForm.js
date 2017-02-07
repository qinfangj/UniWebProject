import React from 'react';
import cx from 'classnames';
import css from './login.css';
import commonCss from '../../styles/common.css';
import store from '../../core/store';
import { loginUser } from '../../components/actions/actionCreators/authActionCreators';
import { Link } from 'react-router';

import {Form, FormControl, InputGroup, FormGroup, Button, Glyphicon} from 'react-bootstrap/lib';



class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "jdelafon ",
            password: "pwd",
        };
    }

    login() {
        store.dispatch(loginUser(
            {
                username: this.state.username,
                password: this.state.password,
            }
        ));
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                        <InputGroup.Addon><Glyphicon glyph="user"/></InputGroup.Addon>
                        <FormControl
                            value={this.state.username}
                            onChange={this.onChangeUsername.bind(this)}
                        />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                        <InputGroup.Addon><Glyphicon glyph="lock"/></InputGroup.Addon>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangePassword.bind(this)}
                        />
                        </InputGroup>
                    </FormGroup>

                    <div className={css.forgotPassword}>
                        <Link className={cx(css.forgotPasswordLink, commonCss.nolink)}>Don't remember your password?</Link>
                    </div>

                        {/*<button type="submit" className="submit-button btn btn-primary"*/}
                                {/*onClick={this.login} disabled={!this.formValid()}>Login</button>*/}
                        {/*{!this.isDemo ?*/}
                            {/*<Link id='signup-link' to='/signup'>Register</Link> : '' }*/}
                        {/*{!this.isDemo ?*/}
                            {/*<Link id='forget-password-link' to='/forgetPassword'>I forgot my password</Link> : '' }*/}

                </Form>

                <Button onClick={this.login.bind(this)} className={css.loginButton}>
                    Log in >
                </Button>

            </div>
        );
    }

}


export default LoginForm;

