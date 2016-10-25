import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactDOM from 'react-dom';
import css from './forms.css';
import store from '../../core/store';
import _ from 'lodash';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import validators from './validators';
import { insertAsync } from '../actions/actionCreators/asyncActionCreators';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';



class ProjectInsertForm extends React.Component {
    constructor() {
        super();
        this.table = "people";
        this.required = ["first_name", "last_name", "email", "address", "phone"];
        this.state = {
            missing: {},
            invalid: {},
            submissionError: false,
        };
    }

    /**
     * Close the error message window.
     */
    discardErrorMessage() {
        this.setState({submissionError: false});
    }

    formatFormData(formData) {
        formData.isLaboratory = 1;
        formData.phone = parseInt(formData.phone);
        return formData;
    }

    onSubmit() {
        let formData = this.getFormValues();
        console.info(JSON.stringify(formData, null, 2));
        let fields = Object.keys(formData);
        let nullFields = this.required.filter(k => formData[k] === null);
        let invalidFields = fields.filter(k => formData[k] === null);
        if (invalidFields.length !== 0) {
            let missing = _.zipObject(nullFields, new Array(nullFields.length).fill(true));
            let invalid = _.zipObject(invalidFields, new Array(invalidFields.length).fill(true));
            this.setState({missing, invalid, submissionError: true});
        } else {
            this.setState({missing: {}, invalid: {}, submissionError: false});
            formData = this.formatFormData(formData);
            store.dispatch(insertAsync(this.table, formData));
        }
    }

    /**
     * Read the values of all inputs in the form.
     */
    getFormValues() {
        return {
            first_name: this._firstName.getValue(),
            last_name: this._lastName.getValue(),
            email: this._email.getValue(),
            address: this._address.getValue(),
            phone: this._phone.getValue(),
        };
    }

    render() {
        return (
            <form className={css.form}>

                {/* Error message */}

                {this.state.submissionError ?
                    <Alert bsStyle="warning" onClick={this.discardErrorMessage.bind(this)}>
                        Some required fields are missing or ill-formatted. Please review the form and submit again.
                        <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                    </Alert>
                    : null}

                <Form componentClass="fieldset" horizontal>

                    {/* First name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="firstName" visibleName="PI first name" required
                                   missing = {!!this.state.missing["first_name"]}
                                   invalid = {!!this.state.invalid["first_name"]}
                                   ref = {(c) => this._firstName = c}
                                   defaultValue="J"
                        />
                    </Col>

                    {/* Last name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="lastName" visibleName="PI last name" required
                                   missing = {!!this.state.missing["last_name"]}
                                   invalid = {!!this.state.invalid["last_name"]}
                                   ref = {(c) => this._lastName = c}
                                   defaultValue="D"
                        />
                    </Col>

                    {/* Email */}

                    <Col sm={4}>
                        <TextField name="email" visibleName="PI email" required
                                   missing = {!!this.state.missing["email"]}
                                   invalid = {!!this.state.invalid["email"]}
                                   ref = {(c) => this._email = c}
                                   validator = {validators.emailValidator}
                                   defaultValue="lab@unil.ch"
                        />
                    </Col>

                </Form>

                <Form componentClass="fieldset" horizontal>

                    {/* Address */}

                    <Col sm={8} className={css.formCol}>
                        <TextField name="address" visibleName="PI address" required
                                   missing = {!!this.state.missing["address"]}
                                   invalid = {!!this.state.invalid["address"]}
                                   ref = {(c) => this._address = c}
                                   defaultValue=""
                        />
                    </Col>

                    {/* Phone */}

                    <Col sm={4}>
                        <TextField name="phone" visibleName="PI phone" required
                                   missing = {!!this.state.missing["phone"]}
                                   invalid = {!!this.state.invalid["phone"]}
                                   ref = {(c) => this._phone = c}
                                   validator={validators.phoneValidator}
                                   defaultValue="000 000 000"
                        />
                    </Col>

                </Form>

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default ProjectInsertForm;

