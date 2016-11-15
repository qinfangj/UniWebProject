import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';
import cx from 'classnames';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import Select from './elements/Select';
import TextArea from './elements/Textarea';
import DatePicker from './elements/DatePicker';
import validators from './validators';
import * as forms from './forms.js';
import * as options from './options';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class RunsInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "runs";
        this.required = [];
        this.state = forms.defaultFormState;
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
        }
    }

    getFormValues() {
        return {
            // taxo_id: this._organism.getValue(),
            // assembly: this._assembly.getValue(),
            // genome_folder: this._genomeFolder.getValue(),
            // url: this._url.getValue(),
            // downloaded_date: this._downloadedDate.getValue(),
            // files: this._files.getValue(),
            // comment: this._comment.getValue(),
            // isMasked: this._isMasked.getValue(),
            // isArchived: this._isArchived.getValue(),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Run# */}

                    <Col sm={1} className={css.formCol}>
                        <TextField name="run" label="Run#" required
                                   ref = {(c) => this._run = c}
                        />
                    </Col>

                    {/* Flowcell ID */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="flowcell" label="Flowcell ID" required
                                   ref = {(c) => this._flowcellId = c}
                        />
                    </Col>

                    {/* Version */}

                    <Col sm={1} className={css.formCol}>
                        <Select name="version" label="Version"
                                options={options.getFlowcellVersions()}
                                ref={(c) => this._version = c}
                        />
                    </Col>

                    {/* Cluster date (aka "?") */}

                    <Col sm={3} className={css.formCol}>
                        <DatePicker name="cluster_date" label="Cluster date"
                                    ref = {(c) => this._clusterDate = c}
                        />
                    </Col>

                    {/* Machine (aka "Instrument") */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="machine" label="Machine"
                                options={options.getInstruments()}
                                ref={(c) => this._instrument = c}
                        />
                    </Col>

                    {/* Run date (aka "?") */}

                    <Col sm={3} className={css.formCol}>
                        <DatePicker name="run_date" label="Run date"
                                    ref = {(c) => this._runDate = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    <Col sm={4} style={{padding: 0}}>

                        <Form componentClass="fieldset" horizontal>

                            {/* Reads type + length */}

                            <Col sm={12} className={css.formCol}>
                                <Select name="run_type" label="Run type"
                                        options={options.getRunTypesLengths()}
                                        ref={(c) => this._runTypesLengths = c}
                                />
                            </Col>

                            {/* Run stage */}

                            <Col sm={4} className={css.formCol}>
                                <Select name="stage" label="Stage"
                                        options={options.getRunStages()}
                                        ref={(c) => this._stage = c}
                                />
                            </Col>

                            {/* Kit */}

                            <Col sm={4} className={css.formCol}>
                                <Select name="kit" label="Kit"
                                        options={options.getSequencingKits()}
                                        ref={(c) => this._kit = c}
                                />
                            </Col>

                            {/* Is failed */}

                            <Col sm={3} className={css.formCol}>
                                <CheckBox ref={(c) => this._isFailed = c} name="isFailed" label="Run failed" />
                            </Col>

                        </Form>

                    </Col>
                    <Col sm={8} className={css.formCol}>
                        <TextArea name="comment" label="Comment"
                                  ref = {(c) => this._comment = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    <Col sm={7} style={{padding: 0}}>
                        <Form componentClass="fieldset" horizontal>

                            {/* Library */}

                            <Col sm={12} className={css.formCol}>
                                <TextField name="_" label="<Project-Library-[pM]-QC form>"
                                           ref = {(c) => this.___ = c}
                                />
                            </Col>

                        </Form>
                    </Col>
                    <Col sm={5} className={css.formCol}>

                        {/* Comment */}

                        <TextField name="comment" label="Comment"
                                   ref = {(c) => this._comment = c}
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


export default RunsInsertForm;

