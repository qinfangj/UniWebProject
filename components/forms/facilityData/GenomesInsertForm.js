"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import DatePicker from '../elements/DatePicker';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import SubmissionFeedback from '../SubmissionFeedback';



class GenomesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "genomes";
        this.form = formStoreKeys.GENOMES_INSERT_FORM;
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
        forms.submit(this.form, this.table, null);
    }

    render() {
        return (
            <form className={css.form}>

                <SubmissionFeedback form={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Organism */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Taxonomies
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Assembly */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.ASSEMBLY}
                            label="Assembly"
                            required
                        />
                    </Col>

                    {/* Genome folder */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.GENOME_FOLDER}
                            label="Genome folder"
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
                            required
                        />
                    </Col>

                    {/* Is masked / is archived */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox
                            form={this.form}
                            field={fields.IS_MASKED}
                            label="Masked"
                        />
                        <Checkbox
                            form={this.form}
                            field={fields.IS_ARCHIVED}
                            label="Archived"
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


export default GenomesInsertForm;

