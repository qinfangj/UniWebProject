"use strict";
import React from 'react';
import css from '../forms.css';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import DatePicker from '../elements/DatePicker';
import TextArea from '../elements/Textarea';
import * as Options from '../subcomponents/Options';
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
        this.table = "projects";
        this.form = formStoreKeys.PROJECTS_INSERT_FORM;
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

    onSubmit() {
        forms.submit(this, this.form, this.table, null);
    }

    render() {
        return (
            <form className={css.form}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.NAME}
                            required
                            label="Project name"
                            submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Person in charge */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Laboratories
                            form={this.form}
                            required
                            submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Code name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.CODE_NAME}
                            required
                            label="Code name"
                            validator = {validators.codeNameValidator}
                            submissionError = {this.state.submissionError}
                            placeholder = "[name]_[initials] Ex: Tcells_EG."
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.DESCRIPTION}
                            label="Description"
                            validator = {validators.descriptionValidator}
                            submissionError = {this.state.submissionError}
                            defaultValue = "Enter description here"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>
                    <Col sm={4} className={css.formCol}>

                        {/* Project state */}

                        <Options.ProjectStates
                            form={this.form}
                            required
                            submissionError = {this.state.submissionError}
                        />

                        {/* Is control */}

                        <Checkbox
                            form={this.form}
                            field={fields.IS_CONTROL}
                            label="Control Project"
                        />

                    </Col>

                    {/* User meeting date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.USER_MEETING_DATE}
                            label="User meeting date"
                        />
                    </Col>

                    {/* Project analysis */}

                    <Col sm={4} className={css.formCol}>
                        <Options.ProjectAnalyses
                            form={this.form}
                            required
                            submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea
                            form={this.form}
                            field={fields.COMMENT}
                            label="Comment"
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

