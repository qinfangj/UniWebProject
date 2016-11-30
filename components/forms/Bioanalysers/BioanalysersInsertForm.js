import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import formsCss from '../forms.css';
import css from './bioanalysers.css';
import cx from 'classnames';

import TextField from '../elements/TextField';
import DatePicker from '../elements/DatePicker';
import * as Options from '../subcomponents/Options';
import validators from '../validators';
import * as forms from '../forms.js';
import BioanalysersSubForm from './BioanalysersSubForm';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';



class BioanalysersInsertForm extends React.Component {
    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.table = "bioanalysers";
        this.form = "bioanalysers";
        this.required = [];
        this.state = forms.defaultFormState;
    }

    onSubmit() {
        let formData = this.getFormValues();
        let newState = forms.submit(this.table, formData, this.required, null);
        this.setState(newState);
        if (!newState.submissionError) {
            newState.submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId });
            }).fail(() =>{
                console.warn("Uncaught form validation error");
                this.setState({ submissionError: true });
            });
            }
    }

    getFormValues() {
        return {
            filename: this._fileName.getValue(),
            bioanalyser_date: this._bioanalyserDate.getValue(),
            description: this._description.getValue(),
            lanes: null,
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
                        <TextField name="filename" label="Bioanalyser file" type="file"
                                   ref = {(c) => this._fileName = c}
                        />
                    </Col>

                    {/* Bioanalyser date */}

                    <Col sm={3} className={formsCss.formCol}>
                        <DatePicker name="bioanalyser_date" label="Bioanalyser date"
                                    ref={(c) => this._bioanalyserDate = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={formsCss.formCol}>
                        <TextField name="description" label="Description"
                                   defaultValue = ""
                                   ref = {(c) => this._description = c}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Lanes sub form */}

                    <Col sm={12} className={cx(formsCss.formCol, css.subformCol)} >
                        <BioanalysersSubForm ref={(c) => this._lanes = c} />
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

