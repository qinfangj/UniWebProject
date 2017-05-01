"use strict";
import React from 'react';
import css from '../forms.css';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import DatePicker from '../elements/DatePicker';
import TextArea from '../elements/Textarea';
import validators from '../validators';
import * as Options from '../subcomponents/Options';
import * as forms from '../forms.js';
import formNames from '../../constants/formNames';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../utils/Feedback';



class ProjectInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "projects";
        this.form = formNames.PROJECTS_INSERT_FORM;
        this.state = {
            disabled: false,
        };
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        forms.newOrUpdate(this.form, this.table, this.props.updateId);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
    }
    componentWillReceiveProps() {
        forms.newOrUpdate(this.form, this.table, this.props.updateId);
    }

    onSubmit() {
        forms.submit(this.form, this.table, null);
    }

    activateForm() {
        this.setState({ disabled: false });
    }

    render() {
        return (
            <form className={css.form}>

                <Feedback reference={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.NAME}
                            disabled={this.state.disabled}
                            label="Project name"
                            required
                        />
                    </Col>

                    {/* Person in charge */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Laboratories
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Code name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.CODE_NAME}
                            disabled={this.state.disabled}
                            label="Code name"
                            validator = {validators.codeNameValidator}
                            placeholder = "[name]_[initials] Ex: Tcells_EG."
                            required
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
                            disabled={this.state.disabled}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>
                    <Col sm={4} className={css.formCol}>

                        {/* Project state */}

                        <Options.ProjectStates
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />

                        {/* Is control */}

                        <Checkbox
                            form={this.form}
                            field={fields.IS_CONTROL}
                            label="Control Project"
                            disabled={this.state.disabled}
                        />

                    </Col>

                    {/* User meeting date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.USER_MEETING_DATE}
                            label="User meeting date"
                            disabled={this.state.disabled}
                        />
                    </Col>

                    {/* Project analysis */}

                    <Col sm={4} className={css.formCol}>
                        <Options.ProjectAnalyses
                            form={this.form}
                            disabled={this.state.disabled}
                            required
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
                            disabled={this.state.disabled}
                        />
                    </Col>

                </Form>

                {/* Submit */}

                {this.state.disabled ?
                    <Button action="submit" bsStyle="primary" onClick={this.activateForm.bind(this)} className={css.submitButton}>
                        Activate form
                    </Button>
                    :
                    <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                        Submit
                    </Button>
                }

            </form>
        );
    }
}


export default ProjectInsertForm;

