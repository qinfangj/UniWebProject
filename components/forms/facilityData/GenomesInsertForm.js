"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import DatePicker from '../elements/DatePicker';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import formNames from '../../constants/formNames';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../utils/Feedback';



class GenomesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "genomes";
        this.form = formNames.GENOMES_INSERT_FORM;
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

                    {/* Organism */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Taxonomies
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Assembly */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.ASSEMBLY}
                            label="Assembly"
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Genome folder */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.GENOME_FOLDER}
                            label="Genome folder"
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Url */}

                    <Col sm={8} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.URL}
                            label="URL"
                            disabled={this.state.disabled}
                            required
                            defaultValue = "http://"
                        />
                    </Col>

                    {/* Downloaded date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.DOWNLOADED_DATE}
                            label="Download date"
                            disabled={this.state.disabled}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* File names */}

                    <Col sm={12} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.FILES}
                            label="File names"
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.COMMENT}
                            label="Comment"
                            disabled={this.state.disabled}
                        />
                    </Col>

                    {/* Is masked / is archived */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox
                            form={this.form}
                            field={fields.IS_MASKED}
                            label="Masked"
                            disabled={this.state.disabled}
                        />
                        <Checkbox
                            form={this.form}
                            field={fields.IS_ARCHIVED}
                            label="Archived"
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


export default GenomesInsertForm;

