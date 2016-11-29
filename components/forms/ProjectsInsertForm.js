import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './forms.css';

import TextField from './elements/TextField';
import CheckBox from './elements/MyCheckbox';
import DatePicker from './elements/DatePicker';
import TextArea from './elements/Textarea';
import * as Options from './subcomponents/Options';
import validators from './validators';
import * as forms from './forms.js';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class ProjectInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "projects";
        this.form = "projects";
        this.required = ["name", "code_name"];
        this.state = forms.defaultFormState;
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                console.debug(555, insertId)
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
            }
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
                        <Options.People form={this.form} ref={(c) => this._personInCharge = c} />
                    </Col>

                    {/* Code name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField name="codeName" label="Code name" required
                                   missing = {!!this.state.missing["code_name"]}
                                   invalid = {!!this.state.invalid["code_name"]}
                                   validator = {validators.codeNameValidator}
                                   placeholder = "[name]_[initials] Ex: Tcells_EG."
                                   ref = {(c) => this._codeName = c}
                                   defaultValue="code_JD"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset">

                    {/* Description */}

                    <div className={css.soloField}>
                        <TextField name="description" label="Description"
                                   defaultValue = "Enter description here"
                                   validator = {validators.descriptionValidator}
                                   invalid = {!!this.state.invalid["description"]}
                                   ref = {(c) => this._description = c}
                        />
                    </div>

                </Form>
                <Form componentClass="fieldset" horizontal>
                    <Col sm={4} className={css.formCol}>

                        {/* Project state */}

                        <Options.ProjectStates form={this.form} ref={(c) => this._projectState = c} />

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

                    <Col sm={4} className={css.formCol}>
                        <Options.ProjectAnalyses form={this.form} ref={(c) => this._projectAnalysis = c} />
                    </Col>

                </Form>
                <Form componentClass="fieldset">

                    {/* Comment */}

                    <div className={css.soloField}>
                        <TextArea name="comment" label="Comment" ref={(c) => this._comment = c} />
                    </div>

                </Form>

                {/* Submit */}

                <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                    Submit
                </Button>

            </form>
        );
    }
}


export default ProjectInsertForm;

