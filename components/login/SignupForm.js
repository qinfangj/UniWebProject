import React from 'react';
import cx from 'classnames';
import css from './login.css';
import store from '../../core/store';
import { signupUser } from '../../components/actions/actionCreators/authActionCreators';

import {Form, FormControl, InputGroup, FormGroup, ControlLabel, Button, Glyphicon} from 'react-bootstrap/lib';



class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            phone: "",
            fax: "",
        };
    }

    submit() {
        store.dispatch(signupUser(
            {
                username: this.state.username,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                address: this.state.address,
                phone: this.state.phone,
                fax: this.state.fax,
            }
        ));
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value});
    }
    onChangePassword(e) {
        this.setState({password: e.target.value});
    }
    onChangeFirstName(e) {
        this.setState({firstName: e.target.value});
    }
    onChangeLastName(e) {
        this.setState({lastName: e.target.value});
    }
    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }
    onChangeAddress(e) {
        this.setState({address: e.target.value});
    }
    onChangePhone(e) {
        this.setState({phone: e.target.value});
    }
    onChangeFax(e) {
        this.setState({fax: e.target.value});
    }

    render() {
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    {/* Username */}

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="user"/></InputGroup.Addon>
                            <FormControl
                                value={this.state.username}
                                onChange={this.onChangeUsername.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>

                    {/* Password */}

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

                    {/* First name */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>First name</ControlLabel>
                        <FormControl
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName.bind(this)}
                        />
                    </FormGroup>

                    {/* Last name */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>Last name</ControlLabel>
                        <FormControl
                            value={this.state.lastName}
                            onChange={this.onChangeLastName.bind(this)}
                        />
                    </FormGroup>

                    {/* Email */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            value={this.state.email}
                            onChange={this.onChangeEmail.bind(this)}
                        />
                    </FormGroup>

                    {/* Address */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>Address</ControlLabel>
                        <FormControl
                            value={this.state.address}
                            onChange={this.onChangeAddress.bind(this)}
                        />
                    </FormGroup>

                    {/* Phone */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>Phone</ControlLabel>
                        <FormControl
                            value={this.state.phone}
                            onChange={this.onChangePhone.bind(this)}
                        />
                    </FormGroup>

                    {/* Fax */}

                    <FormGroup className={css.formGroup}>
                        <ControlLabel>Fax</ControlLabel>
                        <FormControl
                            value={this.state.fax}
                            onChange={this.onChangeFax.bind(this)}
                        />
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

                <Button onClick={this.submit.bind(this)} className={css.loginButton}>
                    Submit >
                </Button>

            </div>
        );
    }

}


export default SignupForm;

