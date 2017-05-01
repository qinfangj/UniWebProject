"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import TextArea from '../elements/Textarea';
import * as Options from '../subcomponents/Options';
import SamplesForProject from '../subcomponents/secondarySelects/SamplesForProject';
import { ProjectsWithSamples } from '../../forms/subcomponents/OptionsWith';
import * as forms from '../forms.js';
import validators from '../validators';
import formNames from '../../constants/formNames';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../utils/Feedback';



class UserRequestsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "user_requests";
        this.form = formNames.USER_REQUESTS_INSERT_FORM;
        this.projectsFormKey = this.form + formNames.suffixes.PROJECTS;
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

    formatFormData(formData) {
        formData.insertSizeMin = parseInt(formData.insertSizeMin);
        formData.insertSizeMax = parseInt(formData.insertSizeMax);
        formData.nbLanes = parseInt(formData.nbLanes);
        formData.millionReads = parseInt(formData.millionReads);
        return formData;
    }

    onSubmit() {
        forms.submit(this.form, this.table, this.formatFormData);
    }

    activateForm() {
        this.setState({ disabled: false });
    }

    render() {
        return (
            <form className={css.form}>

                <Feedback reference={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        <ProjectsWithSamples
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Sample */}

                    <Col sm={3} className={css.formCol}>
                        <SamplesForProject
                            form={this.form}
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
                        />
                    </Col>
                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.INSERT_SIZE_MAX}
                            label="Insert size max"
                            validator = {validators.integerValidator}
                            disabled={this.state.disabled}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Multiplexing group */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.MULTIPLEXING_GROUP}
                            label="Multiplexing group"
                            disabled={this.state.disabled}
                            validator = {validators.shortStringValidator}
                        />
                    </Col>

                    {/* Run request */}

                    <Col sm={2} className={css.formCol}>
                        <Options.RunTypesLengths
                            form={this.form}
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
                            validator={validators.integerValidator}
                        />
                    </Col>

                    {/* Is QC lib */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox
                            form={this.form}
                            field={fields.WITH_LIB_QC}
                            label="is QC"
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
                        />
                    </Col>

                    {/* Is discarded / is done */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox
                            form={this.form} field={fields.IS_TRASHED} label="Discarded"
                            disabled={this.props.disabled}
                        />
                        <Checkbox
                            form={this.form} field={fields.IS_FULFILLED} label="DONE"
                            disabled={this.props.disabled}
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


export default UserRequestsInsertForm;

