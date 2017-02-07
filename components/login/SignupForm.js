import React from 'react';
import cx from 'classnames';
import css from './login.css';
import store from '../../core/store';
import { signupUser } from '../../components/actions/actionCreators/authActionCreators';

import {Form, FormControl, InputGroup, FormGroup, Button} from 'react-bootstrap/lib';



class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    signup() {
        store.dispatch(signupUser(
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
            <div className={css.loginForm}>

                <Form>

                    <FormGroup>
                        <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl
                            type="type"
                            value={this.state.username}
                            onChange={this.onChangeUsername.bind(this)}
                        />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangePassword.bind(this)}
                        />
                        </InputGroup>
                    </FormGroup>

                    {/*<div className='form-actions col-sm-9 col-sm-offset-3'>*/}
                        {/*<button type="submit" className="submit-button btn btn-primary"*/}
                                {/*onClick={this.login} disabled={!this.formValid()}>Login</button>*/}
                        {/*{!this.isDemo ?*/}
                            {/*<Link id='signup-link' to='/signup'>Register</Link> : '' }*/}
                        {/*{!this.isDemo ?*/}
                            {/*<Link id='forget-password-link' to='/forgetPassword'>I forgot my password</Link> : '' }*/}
                    {/*</div>*/}

                </Form>

                <Button onClick={this.signup.bind(this)} className={css.loginButton}>
                    Send >
                </Button>

            </div>
        );
    }

}


export default SignupForm;

