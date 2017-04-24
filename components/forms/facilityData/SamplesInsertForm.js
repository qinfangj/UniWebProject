"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Textarea from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import formNames from '../../constants/formNames';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../utils/Feedback';



class SamplesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "samples";
        this.form = formNames.SAMPLES_INSERT_FORM;
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

                <Feedback reference={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.NAME}
                            label="Name"
                            required
                            validator = {validators.mediumStringValidator}
                        />
                    </Col>

                    {/* Short name */}

                    <Col sm={3} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.SHORT_NAME}
                            label="Short name"
                            required
                            validator = {validators.shortStringValidator}
                        />
                    </Col>

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        <Options.Projects
                            form={this.form}
                            suffix="all"
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Organism */}

                    <Col sm={3} className={css.formCol}>
                        <Options.Taxonomies
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Sample type */}

                    <Col sm={3} className={css.formCol}>
                        <Options.SampleTypes
                            form={this.form}
                            required
                        />
                    </Col>

                    {/* Received date */}

                    <Col sm={3} className={css.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.RECEIVED_DATE}
                            label="Received date"
                        />
                    </Col>

                    {/* Quantification */}

                    <Col sm={3} className={css.formCol}>
                        <Options.QuantifMethods
                            form={this.form}
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Concentration */}

                    <Col sm={3} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.CONCENTRATION}
                            label="Concentration"
                            required
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* Volume */}

                    <Col sm={3} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.VOLUME}
                            label="Volume"
                            required
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* RIN */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.RIN}
                            label="RIN"
                            required
                            validator = {validators.numberValidator}
                        />
                    </Col>

                    {/* Ratio 260/280 */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.RATIO_260_280}
                            label="Ratio 260/280"
                        />
                    </Col>

                    {/* Ratio 260/230 */}

                    <Col sm={2} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.RATIO_260_230}
                            label="Ratio 260/230"
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
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Customer's comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.COMMENT}
                            label="Comment"
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

                    {/* Is trashed */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox
                            form={this.form}
                            field={fields.IS_TRASHED}
                            label="Discarded"
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


export default SamplesInsertForm;

