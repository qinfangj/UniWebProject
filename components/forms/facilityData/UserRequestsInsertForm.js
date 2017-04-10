"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import TextArea from '../elements/Textarea';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';
import * as forms from '../forms.js';
import validators from '../validators';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import SubmissionFeedback from '../messages';



class UserRequestsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "user_requests";
        this.form = formStoreKeys.USER_REQUESTS_INSERT_FORM;
        this.projectsFormKey = this.form + formStoreKeys.suffixes.PROJECTS;
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
        formData.insertSizeMin = parseInt(formData.insertSizeMin);
        formData.insertSizeMax = parseInt(formData.insertSizeMax);
        formData.nbLanes = parseInt(formData.nbLanes);
        formData.millionReads = parseInt(formData.millionReads);
        return formData;
    }

    onSubmit() {
        forms.submit(this, this.form, this.table, this.formatFormData);
    }

    render() {
        return (
            <form className={css.form}>

                <SubmissionFeedback form={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        <Options.ProjectsWithSamples
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Sample */}

                    <Col sm={3} className={css.formCol}>
                        <SecondaryOptions.SamplesForProject
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Insert size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.INSERT_SIZE_MIN}
                            label="Insert size min"
                            validator = {validators.integerValidator}
                        />
                    </Col>
                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.INSERT_SIZE_MAX}
                            label="Insert size max"
                            validator = {validators.integerValidator}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Multiplexing group */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.MULTIPLEXING_GROUP}
                            label="Multiplexing group"
                            required
                            validator = {validators.shortStringValidator}
                        />
                    </Col>

                    {/* Run request */}

                    <Col sm={2} className={css.formCol}>
                        <Options.RunTypesLengths
                            form={this.form}
                            required
                            suffix="all"
                        />
                    </Col>

                    {/* Number of lanes */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.NB_LANES}
                            label="Nb of lanes"
                            required
                            validator={validators.integerValidator}
                        />
                    </Col>

                    {/* Multiplex# */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.MILLION_READS}
                            label="Multiplex#"
                            required
                            validator={validators.integerValidator}
                        />
                    </Col>

                    {/* Is QC lib */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox
                            form={this.form}
                            field={fields.WITH_LIB_QC}
                            label="is QC"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextArea
                            form={this.form}
                            field={fields.COMMENT}
                            label="Comment"
                        />
                    </Col>

                    {/* Is discarded / is done */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox form={this.form} field={fields.IS_TRASHED} label="Discarded"/>
                        <Checkbox form={this.form} field={fields.IS_FULFILLED} label="DONE"/>
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


export default UserRequestsInsertForm;

