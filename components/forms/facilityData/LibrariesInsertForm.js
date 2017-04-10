"use strict";
import React from 'react';
import css from '../forms.css';

import TextField from '../elements/TextField';
import Textarea from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import SubmissionFeedback from '../SubmissionFeedback';



class LibrariesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "libraries";
        this.form = formStoreKeys.LIBRARIES_INSERT_FORM;
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
        formData.concentration = parseInt(formData.concentration);
        formData.volume = parseInt(formData.volume);
        formData.fragSizeMin = parseInt(formData.fragSizeMin);
        formData.fragSizeMax = parseInt(formData.fragSizeMax);
        formData.bioanalyserPeak = parseInt(formData.bioanalyserPeak);
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

                    {/* Name */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.NAME}
                            label="Name"
                            required
                            validator = {validators.mediumStringValidator}
                        />
                    </Col>

                    {/* Library type - aka protocol */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Starting material */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.STARTING_MATERIAL}
                            label="Starting material"
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library date */}

                    <Col sm={2} className={css.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.LIBRARY_DATE}
                            label="Library date"
                        />
                    </Col>


                    {/* Bioanalyser peak */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.BIOANALYSER_PEAK}
                            label="Bioanalyser peak"
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* Min frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.FRAG_SIZE_MIN}
                            label="Frag.size(min)"
                            required
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* Max frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.FRAG_SIZE_MAX}
                            label="Frag.size(max)"
                            required
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* Concentration */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.CONCENTRATION}
                            label="Concentration"
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* Quantification */}

                    <Col sm={2} className={css.formCol}>
                        <Options.QuantifMethods
                            form={this.form}
                            field={fields.QUANTIF_METHOD_ID}
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Multiplex index */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MultiplexIndexes
                            form={this.form}
                            field={fields.MULTIPLEX_INDEX_7_ID}
                            required
                            label="Multiplex index (I7)"
                            suffix="all"
                        />
                    </Col>

                    {/* Second (multiplex) index */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MultiplexIndexes
                            form={this.form}
                            field={fields.MULTIPLEX_INDEX_5_ID}
                            required
                            label="Second index (I5)"
                            suffix="all"
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.VOLUME}
                            label="Volume"
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* Adapters */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryAdapters
                            form={this.form}
                            field={fields.ADAPTER_ID}
                            required
                        />
                    </Col>

                    {/* Illumina kits and lots */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.KITS_LOTS}
                            label="Illumina kits and lots"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.COMMENT}
                            label="Comment"
                        />
                    </Col>

                    {/* Library state */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryStates
                            form={this.form}
                            field={fields.LIBRARY_STATE_ID}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Internal comment */}

                    <Col sm={10} className={css.formCol}>
                        <Textarea
                            form={this.form}
                            field={fields.COMMENT_CUSTOMER}
                            label="Internal comment"
                        />
                    </Col>

                    {/* Is made by user / by robot / trashed */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox form={this.form} field={fields.IS_CUSTOMER_MADE} label="Made by user"
                        />
                        <Checkbox form={this.form} field={fields.IS_ROBOT_MADE} label="Made by robot"
                        />
                        <Checkbox form={this.form} field={fields.IS_TRASHED} label="Discarded"
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


export default LibrariesInsertForm;

