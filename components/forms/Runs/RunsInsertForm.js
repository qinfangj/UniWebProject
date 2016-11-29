import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import formsCss from '../forms.css';
import css from './runs.css';
import cx from 'classnames';
import store from '../../../core/store';

import TextField from '../elements/TextField';
import CheckBox from '../elements/MyCheckbox';
import Select from '../elements/Select';
import TextArea from '../elements/Textarea';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as options from '../options';
import * as Options from '../subcomponents/Options';
import RunsSubForm from './RunsSubForm';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class RunsInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "runs";
        this.required = ["ga_run_nb", "flowcell_ref_name", "lanes"];
        this.state = forms.defaultFormState;
        this.state.lanes = store.getState().common.route.data || {};
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                lanes: store.getState().common.route.data,   // NOT SAFE
            });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
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
        let {lanes, invalid} = this._lanes.getFormValues();
        for (let laneNb of Object.keys(invalid)) {
            if (Object.keys(invalid[laneNb]).length > 0) {
                lanes = null;
                break;
            }
        }
        if (lanes !== null) {
            lanes = Object.values(lanes);
        }
        return {
            ga_run_nb: this._runNb.getValue(),
            flowcell_ref_name: this._flowcell.getValue(),
            flowcell_type_id: this._flowcell_type_id.getValue(),
            flowcell_loading_date: this._clusterDate.getValue(),
            instrument_id: this._instrument.getValue(),
            ga_run_date: this._runDate.getValue(),
            run_types_length_id: this._runTypesLengths.getValue(),
            fc_stage: this._stage.getValue(),
            sequencing_kit_version_id: this._kit.getValue(),
            isFailed: this._isFailed.getValue(),
            comment: this._comment.getValue(),
            lanesComment: this._lanesComment.getValue(),
            lanes: lanes,
        };
    }

    render() {
        return (
            <form className={formsCss.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Run# */}

                    <Col sm={1} className={formsCss.formCol}>
                        <TextField name="ga_run_nb" label="Run#" required
                                   missing = {!!this.state.missing["ga_run_nb"]}
                                   invalid = {!!this.state.invalid["ga_run_nb"]}
                                   validator = {validators.integerValidator}
                                   ref = {(c) => this._runNb = c}
                        />
                    </Col>

                    {/* Flowcell ID */}

                    <Col sm={2} className={formsCss.formCol}>
                        <TextField name="flowcell_ref_name" label="Flowcell ID" required
                                   missing = {!!this.state.missing["flowcell_ref_name"]}
                                   invalid = {!!this.state.invalid["flowcell_ref_name"]}
                                   ref = {(c) => this._flowcell = c}
                        />
                    </Col>

                    {/* Version */}

                    <Col sm={1} className={formsCss.formCol}>
                        <Options.FlowcellTypes ref={(c) => this._flowcell_type_id = c} />
                    </Col>

                    {/* Cluster date (aka "flowcell_loading_date") */}

                    <Col sm={3} className={formsCss.formCol}>
                        <DatePicker name="cluster_date" label="Cluster date"
                                    ref = {(c) => this._clusterDate = c}
                        />
                    </Col>

                    {/* Machine (aka "Instrument") */}

                    <Col sm={2} className={formsCss.formCol}>
                        <Options.Instruments ref={(c) => this._instrument = c} />
                    </Col>

                    {/* Run date (aka "ga_run_date") */}

                    <Col sm={3} className={formsCss.formCol}>
                        <DatePicker name="run_date" label="Run date"
                                    ref = {(c) => this._runDate = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    <Col sm={4} style={{padding: 0}}>

                        <Form componentClass="fieldset" horizontal>

                            {/* Reads type + length */}

                            <Col sm={12} className={formsCss.formCol}>
                                <Options.RunTypesLengths all={false} ref={(c) => this._runTypesLengths = c} />
                            </Col>

                            {/* Run stage */}

                            <Col sm={4} className={formsCss.formCol}>
                                <Select name="stage" label="Stage"
                                        options={options.getRunStages()}
                                        ref={(c) => this._stage = c}
                                />
                            </Col>

                            {/* Kit */}

                            <Col sm={4} className={formsCss.formCol}>
                                <Options.SequencingKitVersions ref={(c) => this._kit = c} />
                            </Col>

                            {/* Is failed */}

                            <Col sm={3} className={cx(formsCss.formCol)}>
                                <CheckBox ref={(c) => this._isFailed = c} name="isFailed" label="Run failed" />
                            </Col>

                        </Form>

                    </Col>
                    <Col sm={8} className={formsCss.formCol}>
                        <TextArea name="comment" label="Comment"
                                  ref = {(c) => this._comment = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    <Col sm={7} style={{padding: 0}}>
                        <Form componentClass="fieldset" horizontal>

                            {/* Lanes sub form */}

                            <Col sm={12} className={cx(formsCss.formCol, css.subformCol)}>
                                <RunsSubForm lanes={this.state.lanes}
                                             ref = {(c) => this._lanes = c} />
                            </Col>

                        </Form>
                    </Col>
                    <Col sm={5} className={formsCss.formCol}>

                        {/* Comment */}

                        <TextArea name="lanes_comment" label="Comment"
                                  ref = {(c) => this._lanesComment = c}
                        />

                    </Col>

                </Form>

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={formsCss.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default RunsInsertForm;

