import React from 'react';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { findByIdAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import TextArea from '../elements/Textarea';
import Select from '../elements/Select';
import * as Options from '../subcomponents/Options';
import * as forms from '../forms.js';
import validators from '../validators';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class BasecallingsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "basecallings";
        this.form = "basecallings";
        this.state = forms.defaultFormState;
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let initFormData = store.getState().facilityData["updateData"];
            if (initFormData && Object.keys(initFormData).length > 0) {
                console.debug(this.props.updateId, initFormData)
                this.setState({ initFormData });
            }
        });
        if (this.props.updateId) {
            store.dispatch(findByIdAsync(this.table, this.props.updateId));
        }
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, null);
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
                        <Select field="control_lane" label="Control lane" form={this.form}
                                options={Options.getControlLanes()}
                                ref={(c) => this._control_lane = c}
                        />
                    </Col>

                    {/* Demultiplexing */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox label="Demultiplexing" form={this.form} ref={(c) => this._demultiplexing = c} />
                    </Col>


                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Unaligned data output folder */}

                    <Col sm={12} className={css.formCol}>
                        <TextField field="output_folder" label="Unaligned data output folder" form={this.form} required
                                   ref = {(c) => this._output_folder = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea field="comment" label="Comment" form={this.form} ref={(c) => this._comment = c} />
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

