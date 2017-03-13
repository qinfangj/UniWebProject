"use strict";
import React from 'react';
import css from '../forms.css';

import TextField from '../elements/TextField';
import validators from '../validators';
import * as forms from '../forms.js';
import * as messages from '../messages';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class ProjectInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "people";
        this.form = formStoreKeys.PEOPLE_INSERT_FORM;
        this.state = forms.defaultFormState;
        forms.initForm(this.form);
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        forms.newOrUpdate(this.form, this.table, this.props.updateId);
    }
    componentWillReceiveProps() {
        forms.newOrUpdate(this.form, this.table, this.props.updateId);
    }

    formatFormData(formData) {
        formData.islaboratory = true;  // add
        formData.phone = parseInt(formData.phone);
        return formData;
    }

    onSubmit() {
        forms.submit(this, this.form, this.table, this.formatFormData);
    }

    render() {
        return (
            <form className={css.form}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                <Form componentClass="fieldset" horizontal>

                    {/* First name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.FIRST_NAME} label="PI first name" form={this.form} required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Last name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.LAST_NAME} label="PI last name" form={this.form} required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Email */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.EMAIL} label="PI email" form={this.form} required
                                   validator = {validators.emailValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Address */}

                    <Col sm={8} className={css.formCol}>
                        <TextField field={fields.ADDRESS} label="PI address" form={this.form} required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Phone */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.PHONE} label="PI phone" form={this.form} required
                                   validator={validators.phoneValidator}
                                   submissionError = {this.state.submissionError}
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

