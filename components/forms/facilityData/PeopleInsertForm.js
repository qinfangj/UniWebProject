"use strict";
import React from 'react';
import css from '../forms.css';

import TextField from '../elements/TextField';
import validators from '../validators';
import * as forms from '../forms.js';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import SubmissionFeedback from '../SubmissionFeedback';



class ProjectInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "people";
        this.form = formStoreKeys.PEOPLE_INSERT_FORM;
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
        forms.submit(this.form, this.table, this.formatFormData);
    }

    render() {
        return (
            <form className={css.form}>

                <SubmissionFeedback form={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* First name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.FIRST_NAME}
                            label="PI first name"
                            required
                        />
                    </Col>

                    {/* Last name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.LAST_NAME}
                            label="PI last name"
                            required
                        />
                    </Col>

                    {/* Email */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.EMAIL}
                            label="PI email"
                            required
                            validator = {validators.emailValidator}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Address */}

                    <Col sm={8} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.ADDRESS}
                            label="PI address"
                            required
                        />
                    </Col>

                    {/* Phone */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.PHONE}
                            label="PI phone"
                            required
                            validator={validators.phoneValidator}
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

