import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import { findByIdAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import validators from '../validators';
import * as forms from '../forms.js';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class ProjectInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "people";
        this.required = ["first_name", "last_name", "email", "address", "phone"];
        this.state = forms.defaultFormState;
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let initFormData = store.getState().facilityData["updateData"];
            if (initFormData && Object.keys(initFormData).length > 0) {
                console.debug(this.props.updateId, initFormData)
                this.setState({ initFormData });
            }
        });
        if (this.props.updateId) {
            store.dispatch(findByIdAsync(this.table, this.props.updateId));
        }
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    formatFormData(formData) {
        formData.isLaboratory = true;
        formData.phone = parseInt(formData.phone);
        return formData;
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, this.formatFormData);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
        }
    }

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
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* First name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="firstName" label="PI first name" required
                                   missing = {!!this.state.missing["first_name"]}
                                   invalid = {!!this.state.invalid["first_name"]}
                                   ref = {(c) => this._firstName = c}
                                   defaultValue="J"
                        />
                    </Col>

                    {/* Last name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="lastName" label="PI last name" required
                                   missing = {!!this.state.missing["last_name"]}
                                   invalid = {!!this.state.invalid["last_name"]}
                                   ref = {(c) => this._lastName = c}
                                   defaultValue="D"
                        />
                    </Col>

                    {/* Email */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="email" label="PI email" required
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
                        <TextField name="address" label="PI address" required
                                   missing = {!!this.state.missing["address"]}
                                   invalid = {!!this.state.invalid["address"]}
                                   ref = {(c) => this._address = c}
                                   defaultValue=""
                        />
                    </Col>

                    {/* Phone */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="phone" label="PI phone" required
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

