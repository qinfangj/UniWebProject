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



class BasecallingsInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "basecallings";
        this.form = "basecallings";
        this.required = ["output_folder"];
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
            run_id: this._run.getValue(),
            pipeline_version_id: this._pipeline_version.getValue(),
            analysis_type_id: this._analysis_type.getValue(),
            control_lane_id: this._control_lane.getValue(),
            isDemultiplexing: this._demultiplexing.getValue(),
            output_folder: this._output_folder.getValue(),
            comment: this._comment.getValue(),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Run */}

                    <Col sm={3} className={css.formCol}>
                        <Options.RunsOutputFolders form={this.form} ref={(c) => this._run = c} />
                    </Col>

                    {/* Version */}

                    <Col sm={3} className={css.formCol}>
                        <Options.PipelineVersions form={this.form} ref={(c) => this._pipeline_version = c} />
                    </Col>

                    {/* Analysis type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.PipelineAnalysisTypes form={this.form} ref={(c) => this._analysis_type = c} />
                    </Col>

                    {/* Control lane nb */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="control_lane" label="Control lane" form={this.form}
                                options={options.getControlLane()}
                                ref={(c) => this._control_lane = c}
                        />
                    </Col>

                    {/* Demultiplexing */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <CheckBox label="Demultiplexing" ref={(c) => this._demultiplexing = c} />
                    </Col>


                </Form>
                <Form componentClass="fieldset">

                    {/* Unaligned data output folder */}

                    <div className={css.soloField}>
                        <TextField name="output_folder" label="Unaligned data output folder" required
                                   missing = {!!this.state.missing["output_folder"]}
                                   ref = {(c) => this._output_folder = c}
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


export default BasecallingsInsertForm;

