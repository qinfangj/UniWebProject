import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';

import TextField from './elements/TextField';
import CheckBox from './elements/CheckBox';
import Select from './elements/Select';
import DatePicker from './elements/DatePicker';
import TextArea from './elements/Textarea';
import LabsList from './subcomponents/LabsList';
import ProjectStatesList from './subcomponents/ProjectStatesList';
import validators from './validators';
import * as forms from './forms.js';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class ProjectInsertForm extends React.Component {
    constructor() {
        super();
        this.table = "projects";
        this.required = ["name", "code_name"];
        this.state = {
            missing: {},
            invalid: {},
            submissionError: false,
            submissionSuccess: false,
            submissionId: null,
        };
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        newState.submissionFuture.done((insertId) => {
            this.setState({ submissionSuccess: true, submissionId: insertId });
        }).fail(() =>{
            console.warn("Uncaught form validation error");
            this.setState({ submissionError: true });
        });
    }

    getFormValues() {
        return {
            name: this._projectName.getValue(),
            person_id: this._personInCharge.getValue(),
            code_name: this._codeName.getValue(),
            description: this._description.getValue(),
            project_state_id: this._projectState.getValue(),
            isControl: this._isControl.getValue(),
            user_meeting_date: this._userMeetingDate.getValue(),
            project_analysis_id: this._projectAnalysis.getValue(),
            comment: this._comment.getValue(),
        };
    }

    /**
     * Available values for the project analysis dropdown.
     */
    getProjectAnalysesList() {
        let values = [[1,"Analysis1"], [2,"Analysis2"], [3,"Analysis3"]];
        return values;

        // optiondisplaydbOrdered($table, $args, $order, $limit): select * from table order by ..
        // sub _getProjectAnalysis {
        //     return DBIinsert::optiondisplaydbOrdered('project_analysis',['id','name' ], ['id']);
        //
        // }
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="projectName" label="Project name" required
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
                        <TextField name="codeName" label="Code name" required
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

                <TextField name="description" label="Description"
                           defaultValue = "Enter description here"
                           validator = {validators.descriptionValidator}
                           invalid = {!!this.state.invalid["description"]}
                           ref = {(c) => this._description = c}
                />

                <Form componentClass="fieldset" horizontal>
                    <Col sm={4} className={css.formCol}>

                        {/* Project state */}

                        <ProjectStatesList ref={(c) => this._projectState = c} />

                        {/* Is control */}

                        <CheckBox ref={(c) => this._isControl = c} name="isControl" label="Control Project" />

                    </Col>

                    {/* User meeting date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker name="user_meeting_date" label="User meeting date"
                                    ref={(c) => this._userMeetingDate = c}
                        />
                    </Col>

                    {/* Project analysis */}

                    <Col sm={4}>
                        <Select name="project_analysis_id" label="Project analysis"
                                options={this.getProjectAnalysesList()}
                                ref={(c) => this._projectAnalysis = c}
                        />
                    </Col>

                </Form>

                {/* Comment */}

                <TextArea name="comment" label="Comment" ref={(c) => this._comment = c} />

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default ProjectInsertForm;

