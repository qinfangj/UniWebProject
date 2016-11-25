import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';
import cx from 'classnames';

import TextField from './elements/TextField';
import CheckBox from './elements/MyCheckbox';
import TextArea from './elements/Textarea';
import Select from './elements/Select';
import * as Options from './subcomponents/Options';
import * as options from './options';
import * as forms from './forms.js';
import validators from './validators';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class AlignmentsInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "alignments";
        this.required = ["eland_output_folder"];
        this.state = forms.defaultFormState;
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                console.debug(555, insertId);
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
            }
    }

    getFormValues() {
        return {
            analysis_type_id: this._analysis_type.getValue(),
            run_id: this._run.getValue(),
            fastq_path: this._unaligned_output_folder.getValue(),
            mapping_tool_id: this._mapping_tool.getValue(),
            eland_output_folder: this._eland_output_folder.getValue(),
            isQC_report: this._qc_report.getValue(),
            config_file_content: this._config_file_content.getValue(),
            comment: this._comment.getValue(),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Analysis type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.PipelineAnalysisTypes ref={(c) => this._analysis_type = c} />
                    </Col>

                    {/* Run */}

                    <Col sm={3} className={css.formCol}>
                        <Select name="run" label="Run"
                                options={options.getRuns()}
                                ref={(c) => this._run = c}
                        />
                    </Col>

                    {/* Unaligned data output folder */}

                    <Col sm={7} className={css.formCol}>
                        <Select name="unaligned_output_folder" label="Unaligned data output folder"
                                options={[]}  // "double select", depends on Run selection --> "select_calling", "_getBasecalling"
                                ref={(c) => this._unaligned_output_folder = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Mapping tool */}

                    <Col sm={2} className={css.formCol}>
                        <Options.MappingTools ref={(c) => this._mapping_tool = c} />
                    </Col>

                    {/* Alignment output folder */}

                    <Col sm={8} className={css.formCol}>
                        <TextField name="eland_output_folder" label="Alignment output folder" required
                                   missing = {!!this.state.missing["eland_output_folder"]}
                                   ref = {(c) => this._eland_output_folder = c}
                        />
                    </Col>

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <CheckBox label="QC report" ref={(c) => this._qc_report = c}/>
                    </Col>

                </Form>
                <Form componentClass="fieldset">

                    {/* Config file content */}

                    <div className={css.soloField}>
                        <TextArea name="config_file_content" label="Config file content" required
                                   ref = {(c) => this._config_file_content = c}
                        />
                    </div>

                </Form>
                <Form componentClass="fieldset">

                    {/* Comment */}

                    <div className={css.soloField}>
                        <TextArea name="comment" label="Comment" ref={(c) => this._comment = c} />
                    </div>

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

