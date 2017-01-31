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
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class ProjectInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "projects";
        this.form = formStoreKeys.PROJECTS_INSERT_FORM;
        this.state = forms.defaultFormState;
        forms.initForm(this.form);
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        if (this.props.updateId) {
            store.dispatch(findForUpdateAsync(this.table, this.props.updateId, this.form));
        }
    }

    onSubmit() {
        let {submissionError, submissionFuture} = forms.submit(this.form, this.table, null);
        this.setState({ submissionError });
        if (!submissionError) {
            submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                this.setState({ submissionError: true });
            });
        }
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Project name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.NAME} label="Project name" form={this.form} required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Person in charge */}

                    <Col sm={4} className={css.formCol}>
                        <Options.People form={this.form} />
                    </Col>

                    {/* Code name */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.CODE_NAME} label="Code name" form={this.form} required
                                   validator = {validators.codeNameValidator}
                                   submissionError = {this.state.submissionError}
                                   placeholder = "[name]_[initials] Ex: Tcells_EG."
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={css.formCol}>
                        <TextField field={fields.DESCRIPTION} label="Description" form={this.form}
                                   validator = {validators.descriptionValidator}
                                   submissionError = {this.state.submissionError}
                                   defaultValue = "Enter description here"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>
                    <Col sm={4} className={css.formCol}>

                        {/* Project state */}

                        <Options.ProjectStates form={this.form} />

                        {/* Is control */}

                        <Checkbox form={this.form} field={fields.IS_CONTROL} label="Control Project" />

                    </Col>

                    {/* User meeting date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker form={this.form} field={fields.USER_MEETING_DATE} label="User meeting date" />
                    </Col>

                    {/* Project analysis */}

                    <Col sm={4} className={css.formCol}>
                        <Options.ProjectAnalyses form={this.form} />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={12} className={css.formCol}>
                        <TextArea field={fields.COMMENT} form={this.form} label="Comment" />
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

