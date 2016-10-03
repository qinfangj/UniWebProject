import React from 'react';
import ReactDOM from 'react-dom';
import css from './forms.css';
import store from '../../core/store';
import _ from 'lodash';

import TextField from './TextField';
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
            isControl: value(this._isControl),
            userMeetingDate: value(this._userMeetingDate),
            projectAnalysis: value(this._projectAnalysis),
            comments: value(this._comments),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <Form componentClass="fieldset" horizontal>

                    {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                    <TextField form={this.formName} name="projectName" visibleName="Project name" required
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
                            <option value="me">me</option>
                            <option value="him">him</option>
                        </FormControl>
                    </FormGroup>
                    </Col>

                    {/* Code name */}

                    <Col sm={4}>
                    <TextField form={this.formName} name="codeName" visibleName="Code name" required
                        missing = {!!this.state.missing["codeName"]}
                        invalid = {!!this.state.invalid["codeName"]}
                        validator = {validators.codeNameValidator}
                        helpMessage = "[name]_[initials] Ex: Tcells_EG."
                        ref={(c) => this._codeName = c}
                    />
                    </Col>

                </Form>

                {/* Description */}

                <TextField form={this.formName} name="description" visibleName="Description"
                           ref={(c) => this._description = c}
                />

                <Form componentClass="fieldset" horizontal>

                    {/* Project state */}

                    <Col sm={4} className={css.formCol}>
                    <FormGroup controlId="projectState" >
                        <ControlLabel>Project state</ControlLabel>
                        <FormControl componentClass="select" placeholder="Project state"
                                     ref={(c) => this._projectState = c} >
                            <option value="ffff">ffff</option>
                            <option value="select">select</option>
                            <option value="other">other</option>
                        </FormControl>

                    {/* Is control */}

                        <Checkbox inputRef={(c) => this._isControl = c} >
                            Control Project
                        </Checkbox>

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
                        />
                    </FormGroup>
                    </Col>

                    {/* Project analysis */}

                    <Col sm={4}>
                    <FormGroup controlId="projectAnalysis" >
                        <ControlLabel>Project analysis</ControlLabel>
                        <FormControl componentClass="select" placeholder="Project analysis"
                                     ref={(c) => this._projectAnalysis = c} >
                            <option value="naaa">naaa</option>
                            <option value="select">select</option>
                            <option value="other">other</option>
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


// sub makeHtmlInsertForm {
//   my $self = shift;
//   my $project = shift;
//
//   my $select = _getSelLabs();
//   my $selState = _getProjectStates();
//   my $selAnalysis = _getProjectAnalysis();
//
//   my @args = @{$self->{_args}};
//   my $codeValidation = "validate=\"not_empty\" msg=\"Code name is Required\"";
//   if ($ENV{PROJECT_CODE_VALIDATION}) {
//     $codeValidation = "validate=\"not_empty|project_code\" msg=\"Code name is Required|Code name must be one word followed by an underscore, followed by PI initials.\"";
//   }
//   my $html = UImodifs::makeFormOpenTag('/table', 'projects', $project->[0]->[0])."
//   <tr>".
//   UImodifs::makeTextInput(2,50,"Project name",$args[0],$project->[0]->[1], "validate=\"not_empty\" msg=\"Name is Required\"" ).
//     UImodifs::makeSelectInput(1,30,"Person in charge",$args[1],$project->[0]->[2],$select,"validate=\"not_empty\" msg=\"Investigator is Required\"" ).
//     UImodifs::makeTextInput(1,20,"Code name",$args[2],$project->[0]->[3],$codeValidation )."
//   </tr><tr>".
//   UImodifs::makeTextInput(4,100,"Description",$args[3],$project->[0]->[4], "validate=\"not_empty|description\" msg=\"Description is Required|Enter a meaningful description!\"" )."
//   </tr><tr>".
//   UImodifs::makeSelectInput(1,20,"Project state",$args[4],$project->[0]->[5],$selState,"validate=\"not_empty\" msg=\"Project State is Required\"" ).
//     UImodifs::makeCheckBoxInput(1,25,"Control project",$args[5],$project->[0]->[6]);
//   if (!defined $project->[0]->[0] || $project->[0]->[0] eq "") {
//     $project->[0]->[7] = '0000-00-00';
//   }
//   $html .= UImodifs::makeDateInput(1,30,"User meeting date",$args[6], $project->[0]->[7]).
//     UImodifs::makeSelectInput(1,25,"Project analysis",$args[7],$project->[0]->[8],$selAnalysis,"validate=\"not_empty\" msg=\"Project Analysis is Required\"" )."
//   </tr><tr>".
//   UImodifs::makeTextAreaInput(4,100,"Comment",$args[8],$project->[0]->[9], "",1)."
//   </tr>\n";
//   $html .= UImodifs::makeFormCloseTag(4, $project->[0]->[0]);
//   return $html;
