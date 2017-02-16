import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import commonCss from '../../../styles/common.css';
import store from '../../../core/store';
import { requestResetPassword } from '../../actions/actionCreators/authActionCreators';
import { Link } from 'react-router';

import {Form, FormControl, InputGroup, FormGroup, Button, Glyphicon} from 'react-bootstrap/lib';



class ForgotPasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    submit() {
        store.dispatch(requestResetPassword(this.state.email));
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    render() {
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    To reset your password, submit your email address.

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail.bind(this)}
                        />
                        </InputGroup>
                    </FormGroup>

                </Form>

                <Button onClick={this.submit.bind(this)} className={css.loginButton}>
                    Reset password >
                </Button>

            </div>
        );
    }

}


export default ForgotPasswordForm;

