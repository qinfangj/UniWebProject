import React,{Component} from 'react';
import { Control, Field, Form, actions} from 'react-redux-form';

import formsCss from '../../forms.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import TextField from '../../elements/TextField';
import TextArea from '../../elements/Textarea';
import DatePicker from '../../elements/DatePicker';
import CheckBox from '../../elements/MyCheckBox';
import Select from '../../elements/Select';
import * as Options from '../../subcomponents/Options';
import validators from '../../validators';
//import SubmissionFeedback from '../../SubmissionFeedback';
//import * as actions from '../../actions';
import formNames from '../../../constants/formNames';
import fields from '../../fields';
import { FormGroup,FormControl,Col,Button } from 'react-bootstrap/lib';



class RunsInsertFormTest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "runs";
        this.form = formNames.RUNS_INSERT_FORM;
        this.modelName = "runsInsertForms.insertForm";
        this.required = [];
        this.state = {
            lanesInfo: [{id:0, projectId: undefined, libraryId:undefined,comment:''}]
        };
        if (this.props.updateId === '' || this.props.updateId === undefined) {
            this.state.isInsert = true;
        }else{
            this.state.isInsert = false;
        }
    }

    onSubmit(v) {
        //forms.submit(this.form, this.table, this.formatFormData.bind(this));
    }

    render() {

        return (
            <Form model="runsForms.insertForm" className={formsCss.form} onSubmit={(v) => console.log(v)} >

                    {/* Run# */}

                    <Col sm={2} className={formsCss.formCol}>
                        <Control model = ".runNb" component = {TextField}
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
                        <Control model = ".flowcellId" component = {TextField}
                                 form={this.form}
                                 field={fields.FLOWCELL_ID} label="Flowcell ID" required
                                 ref = {(c) => this._flowcell = c}
                        />
                    </Col>

                    {/* Version */}

                    <Col sm={2} className={formsCss.formCol}>
                        <Control model = ".flowcellTypeId" component = {Options.FlowcellTypes}
                                 form={this.form} ref={(c) => this._flowcell_type_id = c} />

                    </Col>

                    {/* Cluster date (aka "flowcell_loading_date") */}

                    <Col sm={2} className={formsCss.formCol}>
                        <Control model = ".clusterDate" component = {DatePicker}
                            form={this.form}
                            field="cluster_date" label="Cluster date"
                            ref = {(c) => this._clusterDate = c}
                        />
                    </Col>

                    {/* Machine (aka "Instrument") */}

                    <Col sm={2} className={formsCss.formCol}>
                        <Control model = ".instrument" component = {Options.Instruments}
                            form={this.form} ref={(c) => this._instrument = c} />
                    </Col>

                    {/* Run date (aka "ga_run_date") */}

                    <Col sm={2} className={formsCss.formCol}>
                        <Control model = ".runDate" component = {DatePicker}
                            form={this.form}
                            field="run_date" label="Run date"
                            ref = {(c) => this._runDate = c}
                        />
                    </Col>

                     <Col sm={4} style={{padding: 0}}>

                         {/* Reads type + length */}

                         <Col sm={12} className={formsCss.formCol}>
                             <Control model = ".runTypesLengths" component = {Options.RunTypesLengths}
                                 suffix="all" form={this.form} ref={(c) => this._runTypesLengths = c} />
                         </Col>

                         {/* Run stage */}

                         <Col sm={4} className={formsCss.formCol}>
                             <Control model = ".stage" component = {Select}
                                 form={this.form}
                                 field="stage" label="Stage"
                                 options={[[1,'--'], [2,'A'], [3,'B']]}
                                 ref={(c) => this._stage = c}
                             />
                         </Col>

                         {/* Kit */}

                         <Col sm={4} className={formsCss.formCol}>
                             <Control model = ".kit" component = {Options.SequencingKitVersions}
                                 form={this.form} ref={(c) => this._kit = c} />
                         </Col>

                         {/* Is failed */}

                         <Col sm={3} className={cx(formsCss.formCol)}>
                             <Control model = ".isFailed" component = {CheckBox}
                                 form={this.form}
                                 ref={(c) => this._isFailed = c} field="isFailed" label="Run failed" />
                         </Col>

                    </Col>
                    <Col sm={8} className={formsCss.formCol}>
                        <Control  model = ".comment" component = {TextArea}
                            form={this.form}
                            field="comment" label="Comment"
                            ref = {(c) => this._comment = c}
                        />
                    </Col>

                {/* Lanes sub form */}

                {/*<Col sm={12} className={cx(formsCss.formCol, css.subformCol)}>*/}
                {/*<RunsSubForm lanes={this.state.lanes}*/}
                {/*ref = {(c) => this._lanes = c} />*/}
                {/*</Col>*/}

                {/* Submit */}

                <Button type="submit" bsStyle="primary" className={formsCss.button}>
                    {this.state.isInsert ? 'Submit':'Activate Form'}
                </Button>
            </Form>


        );
    }
}


export default RunsInsertFormTest;