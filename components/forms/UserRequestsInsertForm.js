import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';
import cx from 'classnames';

import TextField from './elements/TextField';
import CheckBox from './elements/MyCheckbox';
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
        this.form = "user_requests";
        this.required = ["multiplexing_group", "multiplex_nb"];
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
            project_id: this._project.getValue(),
            sample_id: this._sample.getValue(),
            insert_size_min: this._insertSizeMin.getValue(),
            insert_size_max: this._insertSizeMax.getValue(),
            library_type_id: this._library_type.getValue(),
            multiplexing_group: this._multiplexingGroup.getValue(),
            run_request_id: this._run_request.getValue(),
            lane_nb: this._laneNb.getValue(),
            multiplex_nb: this._multiplexNb.getValue(),
            isQClib: this._isQC.getValue(),
            comment: this._comment.getValue(),
            isDiscarded: this._isDiscarded.getValue(),
            isDone: this._isDone.getValue(),
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
                        <Options.Projects form={this.form} ref={(c) => this._project = c} />
                    </Col>

                    {/* Sample */}

                    <Col sm={3} className={css.formCol}>
                        <Select name="sample" label="Sample" form={this.form}
                                options={options.getSamplesList()}
                                ref={(c) => this._sample = c}
                        />
                    </Col>

                    {/* Insert size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="insert_size_min" label="Insert size min"
                                   validator = {validators.integerValidator}
                                   invalid = {!! this.state.invalid["insert_size_min"]}
                                   ref = {(c) => this._insertSizeMin = c}
                        />
                    </Col>
                    <Col sm={2} className={css.formCol}>
                        <TextField name="insert_size_max" label="Insert size max"
                                   validator = {validators.integerValidator}
                                   invalid = {!! this.state.invalid["insert_size_max"]}
                                   ref = {(c) => this._insertSizeMax = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols form={this.form} ref={(c) => this._library_type = c} />
                    </Col>

                    {/* Multiplexing group */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="multiplexing_group" label="Multiplexing group" required
                                   validator = {validators.shortStringValidator}
                                   invalid = {!! this.state.invalid["multiplexing_group"]}
                                   missing = {!! this.state.missing["multiplexing_group"]}
                                   ref = {(c) => this._multiplexingGroup = c}
                        />
                    </Col>

                    {/* Run request */}

                    <Col sm={2} className={css.formCol}>
                        <Options.RunTypesLengths all={true} form={this.form} ref={(c) => this._run_request = c} />
                    </Col>

                    {/* Number of lanes */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="nn_lanes" label="Nb of lanes" required
                                   ref = {(c) => this._laneNb = c}
                        />
                    </Col>

                    {/* Multiplex# */}

                    <Col sm={2} className={css.formCol}>
                        <TextField name="multiplex_nb" label="Multiplex#" required
                                   validator={validators.integerValidator}
                                   invalid = {!! this.state.invalid["multiplex_nb"]}
                                   missing = {!! this.state.missing["multiplex_nb"]}
                                   ref = {(c) => this._multiplexNb = c}
                        />
                    </Col>

                    {/* Is QC lib */}

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

