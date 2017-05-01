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
import SamplesForProject from '../../forms/subcomponents/secondarySelects/SamplesForProject';
import { ProjectsWithSamples } from '../../forms/subcomponents/OptionsWith';
import formNames from '../../constants/formNames';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../utils/Feedback';



class LibrariesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "libraries";
        this.form = formNames.LIBRARIES_INSERT_FORM;
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
        formData.concentration = parseInt(formData.concentration);
        formData.volume = parseInt(formData.volume);
        formData.fragSizeMin = parseInt(formData.fragSizeMin);
        formData.fragSizeMax = parseInt(formData.fragSizeMax);
        formData.bioanalyserPeak = parseInt(formData.bioanalyserPeak);
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

                    <Col sm={4} className={css.formCol}>
                        <ProjectsWithSamples
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Sample */}

                    <Col sm={2} className={css.formCol}>
                        <SamplesForProject
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Name */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.NAME}
                            label="Name"
                            disabled={this.state.disabled}
                            required
                            validator = {validators.mediumStringValidator}
                        />
                    </Col>

                    {/* Library type - aka protocol */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Starting material */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.STARTING_MATERIAL}
                            label="Starting material"
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>


                    {/* Bioanalyser peak */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.BIOANALYSER_PEAK}
                            label="Bioanalyser peak"
                            validator = {validators.numberValidator}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Min frag size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.FRAG_SIZE_MIN}
                            label="Frag.size(min)"
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Quantification */}

                    <Col sm={2} className={css.formCol}>
                        <Options.QuantifMethods
                            form={this.form}
                            field={fields.QUANTIF_METHOD_ID}
                            disabled={this.state.disabled}
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
                            label="Multiplex index (I7)"
                            suffix="all"
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Second (multiplex) index */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MultiplexIndexes
                            form={this.form}
                            field={fields.MULTIPLEX_INDEX_5_ID}
                            label="Second index (I5)"
                            suffix="all"
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.VOLUME}
                            label="Volume"
                            validator = {validators.numberValidator}
                            disabled={this.state.disabled}
                        />
                    </Col>

                    {/* Adapters */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryAdapters
                            form={this.form}
                            field={fields.ADAPTER_ID}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Illumina kits and lots */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.KITS_LOTS}
                            label="Illumina kits and lots"
                            disabled={this.state.disabled}
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
                            disabled={this.state.disabled}
                        />
                    </Col>

                    {/* Library state */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibraryStates
                            form={this.form}
                            field={fields.LIBRARY_STATE_ID}
                            disabled={this.state.disabled}
                            required
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
                            disabled={this.state.disabled}
                        />
                    </Col>

                    {/* Is made by user / by robot / trashed */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox
                            form={this.form} field={fields.IS_CUSTOMER_MADE} label="Made by user"
                            disabled={this.state.disabled}
                        />
                        <Checkbox
                            form={this.form} field={fields.IS_ROBOT_MADE} label="Made by robot"
                            disabled={this.state.disabled}
                        />
                        <Checkbox
                            form={this.form} field={fields.IS_TRASHED} label="Discarded"
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


export default LibrariesInsertForm;

