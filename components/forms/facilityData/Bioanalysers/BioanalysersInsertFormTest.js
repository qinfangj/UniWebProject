"use strict";
import React from 'react';
import { Control, Field, Form, actions} from 'react-redux-form';

import formsCss from '../../forms.css';
import css from './bioanalysers.css';
import cx from 'classnames';
import store from '../../../../core/store';

import TextField from '../../elements/TextField';
import DatePicker from '../../elements/DatePicker';
import * as forms from '../../forms.js';
import BioanalysersSubForm from './BioanalysersSubForm';
import formNames from '../../../constants/formNames';
import BioanalysersSubFormTest from './BioanalysersSubFormTest';

import fields from '../../fields';
import { findForUpdateAsync,findByIdAsync } from '../../../actions/actionCreators/facilityDataActionCreators';

//import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
//import SubmissionFeedback from '../../SubmissionFeedback';



class BioanalysersInsertFormTest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "bioanalysers";
        this.form = formNames.BIOANALYSERS_INSERT_FORM;
        this.modelName = "bioanalysersForms.insertForm";
        this.required = [];
        this.state = {
            lanesInfo: [{id:0, projectId: undefined, libraryId:undefined,comment:''}]
        };
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    newOrUpdate(table,updateId) {
        //let state = {serverError: {}};
        if (this.props.updateId) {

            let future = store.dispatch(findByIdAsync(table, updateId));

            future
                .done((data) => {
                    console.log(data);
                    store.dispatch(actions.merge(this.modelName, data));
                });

        } else {
            //empty the admin forms
            store.dispatch(actions.reset(this.modelName));
        }
    }

    componentWillMount() {
        if (this.props.updateId) {
            //store.dispatch(findForUpdateAsync(this.table, this.props.updateId, this.form));
            this.newOrUpdate(this.table,this.props.updateId);
        }
    }

    /**
     * Use this to add lanes info - nothing to validate there anyway.
     */
    formatFormData(formData) {
        formData["lanes"] = this._lanes.getFormValues();
        //formData["file"] = btoa(this._file.getFile());
        //formData["filename"] = (this._file.getValue() || "").replace(/.*[\/\\]/, '');
        console.debug(formData);
        return formData;
    }

    onSubmit(v) {
        forms.submit(this.form, this.table, this.formatFormData.bind(this));
    }

    render() {
        let BSDatePicker = (props) => <FormControl type="date" {...props} />

        let BSTextFieldDescription = (props) => <FormControl {...props} />

        return (
            <Form model="bioanalysersForms.insertForm" className={css.form} onSubmit={(v) => this.onSubmit(v)}>

                <Col sm={6} className={formsCss.formCol}>
                    <label>File:</label>
                    <Control.file model=".filename" />

                </Col>

                <Col sm={6} className={formsCss.formCol}>
                    <label>Date:</label>
                    <Control
                        model=".bioanalyserDate"
                        component={BSDatePicker}
                    />
                </Col>

                {/* Description */}

                <Col sm={12} className={formsCss.formCol}>
                    <label>Description:</label>
                    <Control component={BSTextFieldDescription} model=".description" />
                </Col>

                {/* Lanes sub form */}
                <BioanalysersSubFormTest  ref={(c) => this._lanes = c} />

                {/* Submit */}

                <Button type="submit" bsStyle="primary" className={css.submitButton}>
                    Submit
                </Button>
            </Form>

        );
    }
}


export default BioanalysersInsertFormTest;

