"use strict";
import React from 'react';
//import { Control, Field, Form, actions} from 'react-redux-form';

import formsCss from '../../forms.css';
import css from './runs.css';
import cx from 'classnames';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import CheckBox from '../../elements/MyCheckBox';
import Select from '../../elements/Select';
import TextArea from '../../elements/Textarea';
import DatePicker from '../../elements/DatePicker';
import validators from '../../validators';
import * as forms from '../../forms.js';
import * as Options from '../../subcomponents/Options';
import PoolsForProject from '../../subcomponents/secondarySelects/PoolsForProject';
import fields from '../../fields';
import RunsSubForm from './RunsSubForm';
import formNames from '../../../constants/formNames';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../../utils/Feedback';



class RunsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "runs";
        this.form = formNames.RUNS_INSERT_FORM;
        this.required = ["ga_run_nb", "flowcell_ref_name", "lanes"];
        this.state = {
            disabled: false,
            lanes: store.getState().common.route.data || {}
        };
    }

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
        let formData = this.getFormValues();
        forms.submit(this.table, formData, this.required, null);
    }

    activateForm() {
        this.setState({ disabled: false });
    }

    getFormValues() {
        let {lanes, invalid} = this._lanes.getFormValues();
        for (let laneNb of Object.keys(invalid)) {
            for (let lib of Object.keys(invalid[laneNb])) {
                if (invalid[laneNb][lib] === true) {
                    lanes = null;
                    break;
                }
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

                {/*<Feedback reference={this.form} />*/}

                <Form componentClass="fieldset" horizontal>

                    {/* Run# */}

                    <Col sm={1} className={formsCss.formCol}>
                        <TextField
                            form = {this.form}
                            field={fields.RUN_NUMBER}
                            label="Run#"
                            required
                            validator = {validators.integerValidator}
                            ref = {(c) => this._runNb = c}
                        />
                    </Col>

                    {/* Flowcell ID */}

                    <Col sm={2} className={formsCss.formCol}>
                        <TextField  
                            form={this.form}
                            field="flowcell_ref_name"
                            label="Flowcell ID"
                            required
                        />
                    </Col>

                    {/* Version */}

                    <Col sm={1} className={formsCss.formCol}>
                        <Options.FlowcellTypes 
                            form={this.form}
                            field={fields.FLOWCELL_TYPE_ID}
                            required
                        />
                    </Col>

                     {/* Cluster date (aka "flowcell_loading_date") */}

                    <Col sm={3} className={formsCss.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.CLUSTER_DATE}
                            label="Cluster date"
                            required
                        />
                    </Col>

                    {/* Machine (aka "Instrument") */}

                    <Col sm={2} className={formsCss.formCol}>
                        <Options.Instruments 
                            form={this.form}
                            field={fields.INSTRUMENT_ID}
                        />
                    </Col>

                    {/* Run date (aka "ga_run_date") */}

                    <Col sm={3} className={formsCss.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.RUN_DATE}
                            label="Run date"
                            required
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    <Col sm={4} style={{padding: 0}}>

                        <Form componentClass="fieldset" horizontal>

                            {/* Reads type + length */}

                            <Col sm={12} className={formsCss.formCol}>
                                <Options.RunTypesLengths 
                                    suffix="all"
                                    form={this.form}
                                    required
                                />
                            </Col>

                            {/* Run stage */}

                            <Col sm={4} className={formsCss.formCol}>
                                <Select
                                    form={this.form}
                                    field="stage"
                                    label="Stage"
                                    options={[[1,'--'], [2,'A'], [3,'B']]}
                                />
                            </Col>

                            {/* Kit */}

                            <Col sm={4} className={formsCss.formCol}>
                                <Options.SequencingKitVersions 
                                    form={this.form}
                                    field={fields.SEQUENCING_KIT_VERSION_ID}
                                    required
                                />
                            </Col>

                            {/* Is failed */}

                            <Col sm={3} className={cx(formsCss.formCol)}>
                                <CheckBox
                                    form={this.form}
                                    field={fields.IS_FAILED}
                                    label="Run failed"
                                />
                            </Col>

                        </Form>

                    </Col>
                    <Col sm={8} className={formsCss.formCol}>
                        <TextArea
                            form={this.form}
                            field={fields.COMMENT}
                            label="Comment"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>
                <table className={css.preRunsInsertTable}>
                    <thead><tr>
                        <th>Add Lane</th>
                        <th className={css.laneId}>Lane</th>
                        <th className={css.numeric}>#Libraries</th>
                        <th className={css.numeric}>#QC Libraries</th>
                        <th>Project</th>
                        <th>Library pool</th>
                    </tr></thead>
                    <tbody>
                    <tr>
                        <td><button>+</button></td>
                        <td key="id" className={css.laneId}>
                            <TextField form={this.form} field="id"  required
                                       validator = {validators.integerValidator}
                            />
                        </td>
                        <td key="nlibs" className={css.numeric}>
                            <TextField form={this.form} field="nlibs" defaultValue="0" required
                                       validator = {validators.integerValidator}
                            />
                        </td>
                        <td key="nqc" className={css.numeric}>
                            <TextField form={this.form} field="nqc" defaultValue="0" required
                                       validator = {validators.integerValidator}
                            />
                        </td>
                        <td key="project">
                            <Options.ProjectsWithPool
                                form={this.form}
                            />
                        </td>
                        <td key="pool">
                            <PoolsForProject
                                form={this.form}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                </Form>
                {/*<Form componentClass="fieldset" horizontal>*/}

                    {/*<Col sm={7} style={{padding: 0}}>*/}
                        {/*<Form componentClass="fieldset" horizontal>*/}

                            {/*/!* Lanes sub form *!/*/}

                            {/*<Col sm={12} className={cx(formsCss.formCol, css.subformCol)}>*/}
                                {/*<RunsSubForm lanes={this.state.lanes}*/}
                                             {/*ref = {(c) => this._lanes = c} />*/}
                            {/*</Col>*/}

                        {/*</Form>*/}
                    {/*</Col>*/}
                    {/*<Col sm={5} className={formsCss.formCol}>*/}

                        {/*/!* Comment *!/*/}

                        {/*<TextArea form={this.form}*/}
                            {/*field="lanes_comment" label="Comment"*/}
                                  {/*ref = {(c) => this._lanesComment = c}*/}
                        {/*/>*/}

                    {/*</Col>*/}

                {/*</Form>*/}

                 {/*Submit */}

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


export default RunsInsertForm;

