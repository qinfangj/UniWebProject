import React from 'react';
import ReactDOM from 'react-dom';
import css from './forms.css';
import store from '../../core/store';
import _ from 'lodash';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import validators from './validators';
import { insertAsync } from '../actions/actionCreators/formActionCreators';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';



class ProjectInsertForm extends React.Component {
    constructor() {
        super();
        this.formName = "projectInsertForm";
        this.required = ["projectName", "codeName"];
        this.state = {
            missing: {},
            invalid: {},
            submissionError: false,
        };
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

    getFormValues() {
        let value = (ref) => {
            let v = ReactDOM.findDOMNode(ref).value.trim();
            return v === "none" ? null : v;
        };
        return {
            projectName: this._projectName.getValue(),
            personInCharge: value(this._personInCharge),
            codeName: this._codeName.getValue(),
            description: this._description.getValue(),
            projectState: value(this._projectState),
            isControl: this._isControl.getValue(),
            userMeetingDate: value(this._userMeetingDate),
            projectAnalysis: value(this._projectAnalysis),
            comments: value(this._comments),
        };
    }

    /**
     * Available values for the person in charge dropdown.
     */
    getLabsList() {
        let values = ["Me", "Him", "Other"];
        return values.map(v => {
            return <option value={v} key={v}>{v}</option>;
        });
        // crossdisplaydbOrdered($table, $args, $where, $order): select * from table where .. order by ..

        // sub _getSelLabs {
        //     return DBIinsert::crossdisplaydbOrdered(
        //         ['id','last_name', 'first_name'],['people'],['people.isLaboratory = 1'],
        //         ['last_name', 'first_name']);
        // }
    }

    /**
     * VAvailable values for the project state dropdown.
     */
    getProjectStatesList() {
        let values = ["Ongoing","Done","Todo"];
        return values.map(v => {
            return <option value={v} key={v}>{v}</option>;
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
        let values = ["Analysis1", "Analysis2", "Analysis3"];
        return values.map(v => {
            return <option value={v} key={v}>{v}</option>;
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
                <Form componentClass="fieldset" horizontal>

                    {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                    <TextField name="projectName" visibleName="Project name" required
                        missing = {!!this.state.missing["projectName"]}
                        invalid = {!!this.state.invalid["projectName"]}
                        ref={(c) => this._projectName = c}
                    />
                    </Col>

                    {/* Person in charge */}

                    <Col sm={4} className={css.formCol}>
                    <FormGroup controlId="personInCharge" >
                        <ControlLabel>Person in charge</ControlLabel>
                        <FormControl componentClass="select" placeholder="Person in charge"
                                     ref={(c) => this._personInCharge = c} >
                            {this.getLabsList()}
                        </FormControl>
                    </FormGroup>
                    </Col>

                    {/* Code name */}

                    <Col sm={4}>
                    <TextField name="codeName" visibleName="Code name" required
                        missing = {!!this.state.missing["codeName"]}
                        invalid = {!!this.state.invalid["codeName"]}
                        validator = {validators.codeNameValidator}
                        helpMessage = "[name]_[initials] Ex: Tcells_EG."
                        ref={(c) => this._codeName = c}
                    />
                    </Col>

                </Form>

                {/* Description */}

                <TextField name="description" visibleName="Description"
                           defaultValue = "Enter description here"
                           validator={validators.descriptionValidator}
                           ref={(c) => this._description = c}
                />

                <Form componentClass="fieldset" horizontal>

                    {/* Project state */}

                    <Col sm={4} className={css.formCol}>
                    <FormGroup controlId="projectState" >
                        <ControlLabel>Project state</ControlLabel>
                        <FormControl componentClass="select" placeholder="Project state"
                                     ref={(c) => this._projectState = c} >
                            {this.getProjectStatesList()}
                        </FormControl>

                    {/* Is control */}

                    <CheckBox ref={(c) => this._isControl = c} label="Control Project" />

                    </FormGroup>
                    </Col>

                    {/* User meeting date */}

                    <Col sm={4} className={css.formCol}>
                    <FormGroup controlId="userMeetingDate" >
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
                    <FormGroup controlId="projectAnalysis" >
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

                {/* Error message */}

                {this.state.submissionError ?
                    <Alert bsStyle="warning">
                        Some required fields are missing or ill-formatted. Please review the form and submit again.
                    </Alert>
                 : null}

            </form>
        );
    }
}


export default ProjectInsertForm;

