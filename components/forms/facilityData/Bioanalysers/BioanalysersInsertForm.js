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
import { findForUpdateAsync } from '../../../actions/actionCreators/facilityDataActionCreators';

import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Feedback from '../../../utils/Feedback';


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
        formData["file"] = btoa(formData[fields.BIOANALYSER_FILE].file);
        formData["filename"] = formData[fields.BIOANALYSER_FILE].filename;
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

    render() {
        let formData = store.getState().forms[this.form][fields.BIOANALYSER_FILE];
        let updateFilename = formData ? ` (${formData.filename})` : "";

        return (
            <form className={css.form}>

                <Feedback reference={this.form} />

                <Form componentClass="fieldset" horizontal>

                    {/* Bioanalyser file */}

                    <Col sm={6} className={formsCss.formCol}>
                        <TextField
                            form={this.form}
                            field={fields.BIOANALYSER_FILE}
                            label={"Bioanalyser file" + updateFilename}
                            type="file"
                            disabled={!this.state.isInsert}
                        />
                    </Col>


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
                    {this.state.isInsert ? 'Submit' : 'Activate Form'}
                </Button>

            </form>
        );
    }
}


export default BioanalysersInsertForm;

