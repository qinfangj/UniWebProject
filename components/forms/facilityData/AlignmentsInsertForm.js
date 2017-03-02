"use strict";
import React from 'react';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { findForUpdateAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckBox';
import TextArea from '../elements/Textarea';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';
import * as Options from '../subcomponents/Options';
import * as forms from '../forms.js';
import * as messages from '../messages';
import validators from '../validators';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class AlignmentsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "alignments";
        this.form = formStoreKeys.ALIGNMENTS_INSERT_FORM;
        this.state = forms.defaultFormState;
        forms.initForm(this.form);
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        if (this.props.updateId) {
            store.dispatch(findForUpdateAsync(this.table, this.props.updateId, this.form));
        }
    }

    onSubmit() {
        let {submissionError, submissionFuture} = forms.submit(this.form, this.table, null);
        if (submissionError) {
            this.setState({ submissionError, serverError: {} });
        } else {
            submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId, submissionError: false, serverError: {} });
            }).fail((err) =>{
                this.setState({ serverError: err, submissionError: false, submissionSuccess: false });
            });
        }
    }

    render() {
        return (
            <form className={css.form}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                <Form componentClass="fieldset" horizontal>

                    {/* Analysis type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.PipelineAnalysisTypes form={this.form} required />
                    </Col>

                    {/* Run */}

                    <Col sm={3} className={css.formCol}>
                        <Options.RunsOutputFolders form={this.form} required />
                    </Col>

                    {/* Unaligned data output folder (aka basecallingId) */}

                    <Col sm={7} className={css.formCol}>
                        <SecondaryOptions.BasecallingsOutputFolders form={this.form} required />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Mapping tool */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MappingTools form={this.form} />
                    </Col>

                    {/* Alignment output folder */}

                    <Col sm={8} className={css.formCol}>
                        <TextField form={this.form} field={fields.ELAND_OUTPUT_DIR} label="Alignment output folder" required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox form={this.form} field={fields.HAS_QC_PDFS} label="QC report" />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Config file content */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea form={this.form} field={fields.CONFIG_FILE_CONTENT} label="Config file content" required
                                  submissionError = {this.state.submissionError}
                                  defaultValue = "ANALYSIS xxx\nUSE_BASES xxx"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea field={fields.COMMENT} label="Comment" form={this.form}
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


export default AlignmentsInsertForm;

