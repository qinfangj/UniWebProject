"use strict";
import React from 'react';
import formsCss from '../../forms.css';
import css from './bioanalysers.css';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import DatePicker from '../../elements/DatePicker';
import * as forms from '../../forms.js';
import BioanalysersSubForm from './BioanalysersSubForm';

import formNames from '../../../constants/formNames';
import fields from '../../fields';
import { findForUpdateAsync,deleteAsync} from '../../../actions/actionCreators/facilityDataActionCreators';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import SubmissionFeedback from '../../SubmissionFeedback';
import { formSubmissionSuccess, formSubmissionError, formServerError } from '../../../actions/actionCreators/formsActionCreators';
import { resetForm } from '../../../actions/actionCreators/formsActionCreators';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';


class BioanalysersInsertForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "bioanalysers";
        this.form = formNames.BIOANALYSERS_INSERT_FORM;
        //this.required = [];
        this.state = {isInsert: this.props.updateId === '' || this.props.updateId === undefined}
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

    /**
     * Use this to add lanes info - nothing to validate there anyway.
     */
    formatFormData(formData) {
        formData["lanes"] = this._lanes.getFormValues();
        console.log(this._lanes.getFormValues());
        console.log(this._file);
        //console.log(this._file.getFile());
        //formData["file"] = btoa(this._file.getFile());

        //formData["filename"] = (this._file.getValue() || "").replace(/.*[\/\\]/, '');

        console.debug(formData);
        return formData;
    }

    onSubmit() {
        if (!this.state.isInsert){
            this.setState({isInsert: true});
        }
        else {
            forms.submit(this.form, this.table, this.formatFormData.bind(this));
        }
    }

    bioanalyserDelete(){

        //userDelete(this, this.table, this.props.updateId);
        //let state = {serverError: {}};
        let submissionFuture = null;
        if (confirm("Are you sure to delete this user?")) { // Clic sur OK
            if (this.props.updateId) {

                let submissionFuture = store.dispatch(deleteAsync(this.table, this.props.updateId));

                submissionFuture
                    .done((deleteId) => {
                        // Signal that it was a success
                        console.debug(200, "DeleteId ID <"+deleteId+">");
                        // Clear the form data in store
                        store.dispatch(formSubmissionSuccess(this.form, "Inserted ID <"+deleteId+">"));
                        store.dispatch(resetForm(this.form));
                        // Redirect to table by replacing '/new' by '/list' in the router state
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                    })
                    .fail((err) => {
                        console.warn("Uncaught form validation error");
                        store.dispatch(formServerError(this.form, err, "Uncaught form validation error"));
                    });
            }
        }
    }

    render() {

        return (
            <form className={css.form}>

                <SubmissionFeedback form={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Bioanalyser file */}
                    { !this.props.updateId ?
                        <Col sm={6} className={formsCss.formCol}>
                            <TextField
                                form={this.form}
                                field={fields.FILENAME}
                                label="Bioanalyser file"
                                type="file"
                                ref = {(c) => this._file = c}
                            />
                        </Col>:
                        <Col sm={6} className={formsCss.formCol}>
                            <ControlLabel>Bioanalyser file</ControlLabel>
                            <div>
                                <a href={`/bioanalysers/pdf/${this.props.updateId}/${store.getState().forms[this.form].filename}`}>
                                {store.getState().forms[this.form].filename}</a>
                            </div>
                        </Col>
                    }
                    {/* Bioanalyser date */}

                    <Col sm={6} className={formsCss.formCol}>
                        <DatePicker
                            form={this.form}
                            field={fields.BIOANALYSER_DATE}
                            label="Bioanalyser date"
                            disabled={!this.state.isInsert}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Description */}

                    <Col sm={12} className={formsCss.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.DESCRIPTION}
                            label="Description"
                            disabled={!this.state.isInsert}
                        />
                    </Col>

                </Form>
                <Form componentClass="fieldset" horizontal>

                    {/* Lanes sub form */}
                    <BioanalysersSubForm ref={(c) => this._lanes = c} disabled={!this.state.isInsert}/>

                </Form>

                {/* Submit */}

                <Button action="submit" bsStyle="primary" className={css.button} onClick={this.onSubmit.bind(this)}>
                    {this.state.isInsert ? 'Submit':'ActivateForm'}
                </Button>
                { this.state.isInsert && this.props.updateId ?
                    <Button bsStyle="primary"  className={css.button} type = "button" onClick={this.bioanalyserDelete.bind(this)}>Delete</Button>
                    : null}

            </form>
        );
    }
}


export default BioanalysersInsertForm;

