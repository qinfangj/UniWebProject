import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';
import cx from 'classnames';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import Select from './elements/Select';
import TextArea from './elements/Textarea';
import * as Options from './subcomponents/Options';
import * as options from './options';
import * as forms from './forms.js';
import validators from './validators';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class UserRequestsInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "user_requests";
        this.required = [""];
        this.state = forms.defaultFormState;
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                console.debug(555, insertId)
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
            }
    }

    getFormValues() {
        return {
            // name: this._projectName.getValue(),
            // person_id: this._personInCharge.getValue(),
            // code_name: this._codeName.getValue(),
            // description: this._description.getValue(),
            // project_state_id: this._projectState.getValue(),
            // isControl: this._isControl.getValue(),
            // user_meeting_date: this._userMeetingDate.getValue(),
            // project_analysis_id: this._projectAnalysis.getValue(),
            // comment: this._comment.getValue(),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        <Select name="project" label="Project"
                                options={options.getProjectsList()}
                                ref={(c) => this._project = c}
                        />
                    </Col>

                    {/* Sample */}

                    <Col sm={3} className={css.formCol}>
                        <Select name="sample" label="Sample"
                                options={options.getSamplesList()}
                                ref={(c) => this._sample = c}
                        />
                    </Col>

                    {/* Insert size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="insertSizeMin" label="Insert size min" required
                                   ref = {(c) => this._insertSizeMin = c}
                        />
                    </Col>
                    <Col sm={2} className={css.formCol}>
                        <TextField name="insertSizeMax" label="Insert size max" required
                                   ref = {(c) => this._insertSizeMax = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library type */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="libraryType" label="Library type"
                                options={options.getLibraryTypes()}
                                ref={(c) => this._sample = c}
                        />
                    </Col>

                    {/* Multiplexing group */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="multiplexingGroup" label="Multiplexing group" required
                                   ref = {(c) => this._multiplexingGroup = c}
                        />
                    </Col>

                    {/* Run request */}

                    <Col sm={2} className={css.formCol}>
                        <Select name="runRequest" label="Run request"
                                options={options.getRunRequests()}
                                ref={(c) => this._runRequest = c}
                        />
                    </Col>

                    {/* Number of lanes */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="nbLanes" label="Nb of lanes" required
                                   ref = {(c) => this._laneNb = c}
                        />
                    </Col>

                    {/* Multiplex# */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="multiplexNb" label="Multiplex#" required
                                   ref = {(c) => this._multiplexNb = c}
                        />
                    </Col>

                    {/* Multiplex# */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <CheckBox ref = {(c) => this._isQC = c} name="isQC" label="is QC"/>
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextArea name="comment" label="Comment" ref={(c) => this._comment = c} />
                    </Col>

                    {/* Is discarded / is done */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <CheckBox ref = {(c) => this._isDiscarded = c} name="isDiscarded" label="Discarded"/>
                        <CheckBox ref = {(c) => this._isDone = c} name="isDone" label="DONE"/>
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


export default UserRequestsInsertForm;

