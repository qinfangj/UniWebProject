import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactDOM from 'react-dom';
import css from './forms.css';
import store from '../../core/store';
import _ from 'lodash';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import LabsList from './subcomponents/LabsList';
import validators from './validators';
import { insertAsync } from '../actions/actionCreators/formActionCreators';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';



class ProjectInsertForm extends React.Component {
    constructor() {
        super();
        this.required = ["name", "code_name"];
        this.state = {
            missing: {},
            invalid: {},
            submissionError: false,
        };
    }

    /**
     * Close the error message window.
     */
    discardErrorMessage() {
        this.setState({submissionError: false});
    }

    onSubmit() {
        let formData = this.getFormValues();
        console.info(JSON.stringify(formData, null, 2));
        let fields = Object.keys(formData);
        let values = Object.values(formData);
        let nullFields = this.required.filter(k => formData[k] === null);
        let invalidFields = fields.filter(k => formData[k] === null);
        if (invalidFields.length !== 0) {
            let missing = _.zipObject(nullFields, new Array(nullFields.length).fill(true));
            let invalid = _.zipObject(invalidFields, new Array(invalidFields.length).fill(true));
            this.setState({missing, invalid, submissionError: true});
        } else {
            this.setState({missing: {}, invalid: {}, submissionError: false});
            store.dispatch(insertAsync("projects", fields, values));
        }
    }

    /**
     * Read the values of all inputs in the form.
     */
    getFormValues() {
        console.debug("ref::", this._personInCharge)
        let value = (ref) => {
            let v = ReactDOM.findDOMNode(ref).value.trim();
            return v === "none" ? null : v;
        };
        return {
            name: this._projectName.getValue(),
            person_id: this._personInCharge.getValue(),
            code_name: this._codeName.getValue(),
            description: this._description.getValue(),
            project_state_id: parseInt(value(this._projectState)),
            isControl: this._isControl.getValue(),
            user_meeting_date: value(this._userMeetingDate),
            project_analysis_id: parseInt(value(this._projectAnalysis)),
            comment: value(this._comments),
        };
    }

    /**
     * VAvailable values for the project state dropdown.
     */
    getProjectStatesList() {
        let values = [[1,"Ongoing"],[2,"Done"],[3,"Todo"]];
        return values.map(v => {
            return <option value={v[0]} key={v[0]}>{v[1]}</option>;
        });
        // displaydb($table, $args): select * from table

        // sub _getProjectStates {
        //     my $table = DBIinsert::displaydb('project_states',['id','state_order','name']);
        //     my $table_mod;
        //     for my $i (0..$#{$table}) {
        //         $table_mod->[$i] = [$table->[$i]->[0], "$table->[$i]->[1] - $table->[$i]->[2]" ];
        //     }
        //     return $table_mod;
        // }
    }

    /**
     * Available values for the project analysis dropdown.
     */
    getProjectAnalysesList() {
        let values = [[1,"Analysis1"], [2,"Analysis2"], [3,"Analysis3"]];
        return values.map(v => {
            return <option value={v[0]} key={v[0]}>{v[1]}</option>;
        });
        // optiondisplaydbOrdered($table, $args, $order, $limit): select * from table order by ..

        // sub _getProjectAnalysis {
        //     return DBIinsert::optiondisplaydbOrdered('project_analysis',['id','name' ], ['id']);
        //
        // }
    }

    render() {
        return (
            <form className={css.form}>

                {/* Error message */}

                {this.state.submissionError ?
                    <Alert bsStyle="warning" onClick={this.discardErrorMessage.bind(this)}>
                        Some required fields are missing or ill-formatted. Please review the form and submit again.
                        <span className={css.alertOk} onClick={this.discardErrorMessage.bind(this)}><a>OK</a></span>
                    </Alert>
                    : null}

                <Form componentClass="fieldset" horizontal>

                    {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                    <TextField name="projectName" visibleName="Project name" required
                        missing = {!!this.state.missing["name"]}
                        invalid = {!!this.state.invalid["name"]}
                        ref = {(c) => this._projectName = c}
                        defaultValue="Name"
                    />
                    </Col>

                    {/* Person in charge */}

                    <Col sm={4} className={css.formCol}>
                    <LabsList ref={(c) => this._personInCharge = c} />
                    </Col>

                    {/* Code name */}

                    <Col sm={4}>
                    <TextField name="codeName" visibleName="Code name" required
                        missing = {!!this.state.missing["code_name"]}
                        invalid = {!!this.state.invalid["code_name"]}
                        validator = {validators.codeNameValidator}
                        helpMessage = "[name]_[initials] Ex: Tcells_EG."
                        ref = {(c) => this._codeName = c}
                        defaultValue="code_JD"
                    />
                    </Col>

                </Form>

                {/* Description */}

                <TextField name="description" visibleName="Description"
                           defaultValue = "Enter description here"
                           validator = {validators.descriptionValidator}
                           invalid = {!!this.state.invalid["description"]}
                           ref = {(c) => this._description = c}
                />

                <Form componentClass="fieldset" horizontal>

                    {/* Project state */}

                    <Col sm={4} className={css.formCol}>
                    <FormGroup controlId="project_state_id" >
                        <ControlLabel>Project state</ControlLabel>
                        <FormControl componentClass="select" placeholder="Project state"
                                     ref = {(c) => this._projectState = c} >
                            {this.getProjectStatesList()}
                        </FormControl>

                    {/* Is control */}

                    <CheckBox ref={(c) => this._isControl = c} label="Control Project" />

                    </FormGroup>
                    </Col>

                    {/* User meeting date */}

                    <Col sm={4} className={css.formCol}>
                    <FormGroup controlId="user_meeting_date" >
                        <ControlLabel>User meeting date</ControlLabel>
                        <FormControl
                            type="date"
                            placeholder="User meeting date"
                            ref={(c) => this._userMeetingDate = c}
                            defaultValue="2000-01-01"
                        />
                    </FormGroup>
                    </Col>

                    {/* Project analysis */}

                    <Col sm={4}>
                    <FormGroup controlId="project_analysis_id" >
                        <ControlLabel>Project analysis</ControlLabel>
                        <FormControl componentClass="select" placeholder="Project analysis"
                                     ref={(c) => this._projectAnalysis = c} >
                            {this.getProjectAnalysesList()}
                        </FormControl>
                    </FormGroup>
                    </Col>

                </Form>

                {/* Comments */}

                <FormGroup controlId="comments">
                    <ControlLabel>Comments</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Comments"
                                 ref={(c) => this._comments = c} />
                </FormGroup>

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default ProjectInsertForm;

