import React from 'react';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { findForUpdateAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import TextArea from '../elements/Textarea';
import * as Options from '../subcomponents/Options';
import * as SecondaryOptions from '../subcomponents/SecondaryOptions';
import * as forms from '../forms.js';
import validators from '../validators';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from './fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class UserRequestsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "user_requests";
        this.form = formStoreKeys.USER_REQUESTS_INSERT_FORM;
        this.state = forms.defaultFormState;
        this.projectsFormKey = this.form + formStoreKeys.suffixes.PROJECTS;
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

                    {/* Project */}

                    <Col sm={5} className={css.formCol}>
                        {Options.ProjectsWithSamples(this.form, this.projectsFormKey)}
                    </Col>

                    {/* Sample */}

                    <Col sm={3} className={css.formCol}>
                        <SecondaryOptions.ProjectSamples form={this.form}
                            referenceField={this.projectsFormKey}
                        />
                    </Col>

                    {/* Insert size */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field={fields.INSERT_SIZE_MIN} label="Insert size min" form={this.form}
                                   validator = {validators.integerValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>
                    <Col sm={2} className={css.formCol}>
                        <TextField field={fields.INSERT_SIZE_MAX} label="Insert size max" form={this.form}
                                   validator = {validators.integerValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Library type */}

                    <Col sm={2} className={css.formCol}>
                        <Options.LibProtocols form={this.form}
                        />
                    </Col>

                    {/* Multiplexing group */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field={fields.MULTIPLEXING_GROUP} label="Multiplexing group" form={this.form} required
                                   validator = {validators.shortStringValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Run request */}

                    <Col sm={2} className={css.formCol}>
                        <Options.RunTypesLengths suffix="all" form={this.form}
                        />
                    </Col>

                    {/* Number of lanes */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field={fields.NB_LANES} label="Nb of lanes" form={this.form} required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Multiplex# */}

                    <Col sm={2} className={css.formCol}>
                        <TextField field={fields.MULTIPLEX_NB} label="Multiplex#" form={this.form} required
                                   validator={validators.integerValidator}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Is QC lib */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox form={this.form} field={fields.WITH_LIB_QC} label="is QC"/>
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextArea field={fields.COMMENT} label="Comment" form={this.form}
                                  submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Is discarded / is done */}

                    <Col sm={2} className={cx(css.formCol, css.centerCheckbox)}>
                        <Checkbox form={this.form} field={fields.IS_TRASHED} label="Discarded"/>
                        <Checkbox form={this.form} field={fields.IS_FULFILLED} label="DONE"/>
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


export default UserRequestsInsertForm;

