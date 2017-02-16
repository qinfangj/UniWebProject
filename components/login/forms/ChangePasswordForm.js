import React from 'react';
import cx from 'classnames';
import css from '../login.css';
import commonCss from '../../../styles/common.css';
import store from '../../../core/store';
import { requestResetPassword } from '../../actions/actionCreators/authActionCreators';
import { Link } from 'react-router';

import {Form, FormControl, InputGroup, FormGroup, Button, Glyphicon} from 'react-bootstrap/lib';



class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            password: "",
            password2: "",
            valid: false,
        };
    }

    static propTypes = {
        code: React.PropTypes.string,
        email: React.PropTypes.string,
    };

    submit() {
        //store.dispatch(changePassword(this.state.code, this.state.password));
    }

    onChangeCode(e) {
        this.setState({code: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    onChangePassword2(e) {
        this.setState({password2: e.target.value});
    }

    render() {
        console.debug(this.props)
        return (
            <div className={css.formContainer}>

                <Form className={css.form}>

                    {/*Enter in the field below the code that you received at your email address:*/}

                    Verification code:

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph='lock'/></InputGroup.Addon>
                            <FormControl
                                value={this.props.code}
                                disabled
                                onChange={this.onChangeCode.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>

                    Enter you new password:

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph='lock'/></InputGroup.Addon>
                            <FormControl
                                type="password"
                                value={this.state.password}
                                onChange={this.onChangePassword.bind(this)}
                            />
                        </InputGroup>
                    </FormGroup>

                    Re-enter your new password for confirmation:

                    <FormGroup className={css.formGroup}>
                        <InputGroup>
                        <InputGroup.Addon><Glyphicon glyph='lock'/></InputGroup.Addon>
                        <FormControl
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChangePassword2.bind(this)}
                        />
                        </InputGroup>
                    </FormGroup>

                </Form>

                <Button onClick={this.submit.bind(this)} className={css.loginButton}>
                    Update password >
                </Button>

            </div>
        );
    }

}


export default ChangePasswordForm;

