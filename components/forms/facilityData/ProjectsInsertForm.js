import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import { findForUpdateAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import TextArea from '../elements/Textarea';
import * as Options from '../subcomponents/Options';
import validators from '../validators';
import * as forms from '../forms.js';
import fields from './fields';
import formStoreKeys from '../../constants/formStoreKeys';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class ProjectInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "projects";
        this.form = formStoreKeys.PROJECTS_INSERT_FORM;
        this.required = [fields.NAME, fields.CODE_NAME];
        this.state = forms.defaultFormState;
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentDidMount() {
        if (this.props.updateId) {
            store.dispatch(findForUpdateAsync(this.table, this.props.updateId, this.form));
        }
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                console.debug(200, "Inserted ID <"+insertId+">");
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
        }
    }

    getFormValues() {
        let formData = store.getState().common.forms[this.form];
        return {
            id: formData[fields.ID],
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
                        <TextField storeKey={fields.NAME} label="Project name" form={this.form} required
                                   ref = {(c) => this._projectName = c}
                        />
                    </Col>

                    {/* Person in charge */}

                    <Col sm={4} className={css.formCol}>
                        <Options.People form={this.form} ref={(c) => this._personInCharge = c} />
                    </Col>

                    {/* Code name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField storeKey={fields.CODE_NAME} label="Code name" form={this.form} required
                                   validator = {validators.codeNameValidator}
                                   placeholder = "[name]_[initials] Ex: Tcells_EG."
                                   ref = {(c) => this._codeName = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={css.formCol}>
                        <TextField storeKey={fields.DESCRIPTION} label="Description" form={this.form}
                                   validator = {validators.descriptionValidator}
                                   ref = {(c) => this._description = c}
                                   defaultValue = "Enter description here"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>
                    <Col sm={4} className={css.formCol}>

                        {/* Project state */}

                        <Options.ProjectStates form={this.form} ref={(c) => this._projectState = c} />

                        {/* Is control */}

                        <Checkbox ref={(c) => this._isControl = c} name={fields.IS_CONTROL} label="Control Project" />

                    </Col>

                    {/* User meeting date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker name={fields.USER_MEETING_DATE} label="User meeting date"
                                    ref={(c) => this._userMeetingDate = c}
                        />
                    </Col>

                    {/* Project analysis */}

                    <Col sm={4} className={css.formCol}>
                        <Options.ProjectAnalyses form={this.form} ref={(c) => this._projectAnalysis = c} />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea name={fields.COMMENT} form={this.form} label="Comment" ref={(c) => this._comment = c} />
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


export default ProjectInsertForm;

