"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import TextArea from '../elements/Textarea';
import Select from '../elements/Select';
import * as Options from '../subcomponents/Options';
import * as forms from '../forms.js';
import formNames from '../../constants/formNames';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../utils/Feedback';



class BasecallingsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "basecallings";
        this.form = formNames.BASECALLINGS_INSERT_FORM;
        this.state = {
            disabled: false,
        };
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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

                    {/* Run */}

                    <Col sm={5} className={css.formCol}>
                        <Options.RunsOutputFolders
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Version */}

                    <Col sm={3} className={css.formCol}>
                        <Options.PipelineVersions
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Analysis type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.PipelineAnalysisTypes
                            form={this.form}
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Control lane nb */}

                    <Col sm={2} className={css.formCol}>
                        <Select
                            form={this.form}
                            field={fields.CONTROL_LANE_NB}
                            disabled={this.state.disabled}
                            required
                            label="Control lane"
                            options={[[0,'No'], [1,'1'], [2,'2'], [3,'3'], [4,'4'], [5,'5'], [6,'6'], [7,'7'], [8,'8']]}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Unaligned data output folder */}

                    <Col sm={10} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.UNALIGNED_OUTPUT_DIR}
                            label="Unaligned data output folder"
                            disabled={this.state.disabled}
                            required
                        />
                    </Col>

                    {/* Is demultiplexing? */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox
                            form={this.form}
                            field={fields.IS_DEMULTIPLEXING}
                            disabled={this.state.disabled}
                            label="Demultiplexing"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea
                            form={this.form}
                            field={fields.COMMENT}
                            disabled={this.state.disabled}
                            label="Comment"
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


export default BasecallingsInsertForm;

