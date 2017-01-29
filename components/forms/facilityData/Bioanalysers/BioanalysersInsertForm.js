import React from 'react';
import formsCss from '../../forms.css';
import css from './bioanalysers.css';
import cx from 'classnames';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import DatePicker from '../../elements/DatePicker';
import validators from '../../validators';
import * as forms from '../../forms.js';
import BioanalysersSubForm from './BioanalysersSubForm';
import formStoreKeys from '../../../constants/formStoreKeys';
import fields from '../fields';
import { findForUpdateAsync } from '../../../actions/actionCreators/facilityDataActionCreators';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class BioanalysersInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "bioanalysers";
        this.form = formStoreKeys.BIOANALYSERS_INSERT_FORM;
        this.required = [];
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

    getFormValues() {
        console.debug(this._file.getValue(), btoa(this._file.getFile()))
        return {
            filename: this._file.getValue().replace(/.*[\/\\]/, ''),
            file: btoa(this._file.getFile()),
            bioanalyser_date: this._bioanalyserDate.getValue(),
            description: this._description.getValue(),
            lanes: this._lanes.getFormValues(),
        };
    }

    render() {
        return (
            <form className={css.form}>
                <forms.SubmissionErrorMessage error={this.state.submissionError} />
                <forms.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />

                <Form componentClass="fieldset" horizontal>

                    {/* Bioanalyser file */}

                    <Col sm={4} className={formsCss.formCol}>
                        <TextField form={this.form} field={fields.FILENAME} label="Bioanalyser file" type="file"
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                    {/* Bioanalyser date */}

                    <Col sm={3} className={formsCss.formCol}>
                        <DatePicker form={this.form} field={fields.BIOANALYSER_DATE} label="Bioanalyser date"
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={formsCss.formCol}>
                        <TextField form={this.form} field={fields.DESCRIPTION} label="Description"
                                   defaultValue = ""
                                   submissionError = {this.state.submissionError}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Lanes sub form */}

                    <Col sm={12} className={cx(formsCss.formCol, css.subformCol)} >
                        <BioanalysersSubForm />
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


export default BioanalysersInsertForm;

