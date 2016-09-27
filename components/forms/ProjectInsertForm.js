import React from 'react';
import css from './forms.css';

import TextField from './TextField';
import * as validators from './validators';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class ProjectInsertForm extends React.Component {
    constructor() {
        super();
        this.state = {
            projectName: null,
            personInCharge: null,
            codeName: null,
            description: null,
            projectState: null,
            userMeetingDate: null,
            projectAnalysis: null,
            comments: null,
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <form className={css.form}>
                <Form componentClass="fieldset" horizontal>

                {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                    <TextField name="projectName" visibleName="Project name" required />
                    </Col>

                    {/* Person in charge */}

                    <Col sm={4} className={css.formCol}>
                    <FormGroup controlId="formBasicText" >
                        <ControlLabel>Person in charge</ControlLabel>
                        <FormControl componentClass="select" placeholder="Person in charge">
                            <option value="select">select</option>
                            <option value="other">...</option>
                        </FormControl>
                    </FormGroup>
                    </Col>

                    {/* Code name */}

                    <Col sm={4}>
                    <TextField name="codeName" visibleName="Code name" required
                               validator = {validators.codeNameValidator}
                               helpMessage = "Code name must be one word followed by an underscore, followed by PI initials."
                    />
                    </Col>

                </Form>

                {/* Description */}

                <TextField name="description" visibleName="Description" required />

                {/* Project state */}

                <FormGroup controlId="projectState" >
                    <ControlLabel>Project state</ControlLabel>
                    <FormControl componentClass="select" placeholder="Project state">
                        <option value="none">...</option>
                        <option value="select">select</option>
                        <option value="other">...</option>
                    </FormControl>
                    <Checkbox>
                        Control Project
                    </Checkbox>
                </FormGroup>

                {/* User meeting date */}

                <FormGroup controlId="userMeetingDate" >
                    <ControlLabel>User meeting date</ControlLabel>
                    <FormControl
                        type="date"
                        placeholder="User meeting date"
                        onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>

                {/* Project analysis */}

                <FormGroup controlId="projectAnalysis" >
                    <ControlLabel>Project analysis</ControlLabel>
                    <FormControl componentClass="select" placeholder="Project analysis">
                        <option value="none">...</option>
                        <option value="select">select</option>
                        <option value="other">...</option>
                    </FormControl>
                </FormGroup>

                {/* Comments */}

                <FormGroup controlId="comments">
                    <ControlLabel>Comments</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Comments" />
                </FormGroup>

                <Button action="submit" bsStyle="primary">Submit</Button>

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
