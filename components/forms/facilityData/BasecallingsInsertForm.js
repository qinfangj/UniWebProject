"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import TextArea from '../elements/Textarea';
import Select from '../elements/Select';
import * as Options from '../subcomponents/Options';
import * as forms from '../forms.js';
import * as messages from '../messages';
import validators from '../validators';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class BasecallingsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "basecallings";
        this.form = formStoreKeys.BASECALLINGS_INSERT_FORM;
        this.state = forms.defaultFormState;
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

                    {/* Run */}

                    <Col sm={3} className={css.formCol}>
                        <Options.RunsOutputFolders
                            form={this.form}
                            required
                            submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Version */}

                    <Col sm={3} className={css.formCol}>
                        <Options.PipelineVersions
                            form={this.form}
                            required
                            submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Analysis type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.PipelineAnalysisTypes
                            form={this.form}
                            required
                            submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Control lane nb */}

                    <Col sm={2} className={css.formCol}>
                        <Select
                            form={this.form}
                            field={fields.CONTROL_LANE_NB}
                            required
                            label="Control lane"
                            options={[[0,'No'], [1,'1'], [2,'2'], [3,'3'], [4,'4'], [5,'5'], [6,'6'], [7,'7'], [8,'8']]}
                            submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Demultiplexing */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox
                            form={this.form}
                            field={fields.IS_DEMULTIPLEXING}
                            label="Demultiplexing"
                            submissionError = {this.state.submissionError}
                        />
                    </Col>


                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Unaligned data output folder */}

                    <Col sm={12} className={css.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.UNALIGNED_OUTPUT_DIR}
                            label="Unaligned data output folder"
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
                            submissionError = {this.state.submissionError}
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


export default BasecallingsInsertForm;

