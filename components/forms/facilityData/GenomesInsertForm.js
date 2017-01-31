import React from 'react';
import css from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { findForUpdateAsync } from '../../actions/actionCreators/facilityDataActionCreators';

import TextField from '../elements/TextField';
import Checkbox from '../elements/MyCheckbox';
import DatePicker from '../elements/DatePicker';
import validators from '../validators';
import * as forms from '../forms.js';
import * as Options from '../subcomponents/Options';
import formStoreKeys from '../../constants/formStoreKeys';
import fields from '../fields';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class GenomesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "genomes";
        this.form = formStoreKeys.GENOMES_INSERT_FORM;
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

                    {/* Organism */}

                    <Col sm={4} className={css.formCol}>
                        <Options.Taxonomies form={this.form} />
                    </Col>

                    {/* Assembly */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.ASSEMBLY} label="Assembly" form={this.form} required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Genome folder */}

                    <Col sm={4} className={css.formCol}>
                        <TextField field={fields.GENOME_FOLDER} label="Genome folder" form={this.form} required
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Url */}

                    <Col sm={8} className={css.formCol}>
                        <TextField field={fields.URL} label="URL" form={this.form}
                                   submissionError = {this.state.submissionError}
                                   defaultValue = "http://"
                        />
                    </Col>

                    {/* Downloaded date */}

                    <Col sm={4} className={css.formCol}>
                        <DatePicker field={fields.DOWNLOADED_DATE} label="Download date"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* File names */}

                    <Col sm={12} className={css.formCol}>
                        <TextField field={fields.FILES} label="File names" form={this.form}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Comment */}

                    <Col sm={10} className={css.formCol}>
                        <TextField field={fields.COMMENT} label="Comment" form={this.form}
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Is masked / is archived */}

                    <Col sm={2} className={css.formCol}>
                        <Checkbox form={this.form} field={fields.IS_MASKED} label="Masked" />
                        <Checkbox form={this.form} field={fields.IS_ARCHIVED} label="Archived" />
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


export default GenomesInsertForm;

