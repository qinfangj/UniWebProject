"use strict";
import React from 'react';
import { Control, Form, actions} from 'react-redux-form';
import admincss from '../adminForm.css';
import css from '../forms.css';
import * as messages from '../messages';

import store from '../../../core/store';
import { insertAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import { findByIdAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import { Button } from 'react-bootstrap/lib';

import { dateNow, parseDateString } from '../../../utils/time';
import Col from 'react-bootstrap/lib/Col';
import adminData from './AdminDataConstants';


class CommonAdminForms extends React.Component {
    constructor(props) {
        super(props);

        this.table = this.props.table;

        this.state = {
            serverError: {},
            submissionError: false,
            submissionSuccess: false,
            submissionId: undefined,
        };

        const modelName = "adminForms.";
        this.modelName = modelName.concat(adminData[this.props.table].model);

        if (this.props.updateId === '' || this.props.updateId === undefined) {
            this.state.isInsert = true;
        } else {
            this.state.isInsert = false;
        }
    }
    //if updatedId has value fetch the data from backend
    //otherwise show empty insert form
    newOrUpdate(table,updateId){
        //let state = {serverError: {}};
        if (this.props.updateId) {

            let future = store.dispatch(findByIdAsync(table, updateId));
            //state = Object.assign(state, {submissionError: false, submissionFuture: future});
            //let model= adminData[table].model;

            future
                .done((data) => {
                    console.log(data);
                    store.dispatch(actions.merge(this.modelName,data));
                });

        } else {
            //empty the admin forms
            store.dispatch(actions.reset(this.modelName));
        }
    }

    componentWillMount() {
        this.newOrUpdate(this.table,this.props.updateId);
    }
    componentWillReceiveProps() {
       this.newOrUpdate(this.table,this.props.updateId);
    }

    //Format adminFormData as the adminFormConstants defined before submission
    formatFormData(formData) {
        let table = this.props.table;

        Object.keys(formData).forEach(function (key, index) {
            // key: the name of the object key
            // index: the ordinal position of the key within the object

            if (adminData[table].fields[index]) {
                if (adminData[table].fields[index].type === "Int") {
                    formData[key] = parseInt(formData[key]);
                } else if (adminData[table].fields[index].type === "Boolean") {
                    let formDataKey = JSON.parse(formData[key]);
                    if (typeof (formDataKey ) === "number") {
                        formData[key] = !!parseInt(formDataKey);
                    } else {
                        formData[key] = formDataKey;
                    }
                }
            }
        });


        if (formData.id && formData.id !== 0) {
            formData.updatedAt = dateNow();
            if (formData.createdAt) {
                formData.createdAt = parseDateString(formData.createdAt);
            }
        }

        //console.log(formData);
        return formData
    }

    handleSubmit(values){

        let state = {serverError: {}};
        let formData = Object.assign({}, values);
        console.info(JSON.stringify(formData, null, 2));

        if (!this.state.isInsert) {
            this.setState({isInsert:true});
        } else {

            let formatFormData = this.formatFormData(formData);

            let future = store.dispatch(insertAsync(this.table, formatFormData));
            state = Object.assign(state, {submissionError: false, submissionFuture: future});
            future
                .done((insertId) => console.debug(200, "Inserted ID <" + insertId + ">"))
                .fail(() => console.warn("Uncaught form validation error"));

            let {submissionError, submissionFuture} =state;
            if (submissionError) {
                this.setState({submissionError, serverError: {}});
            } else {
                submissionFuture.done((insertId) => {
                    this.setState({
                        submissionSuccess: true,
                        submissionId: insertId,
                        submissionError: false,
                        serverError: {}
                    });
                }).fail((err) => {
                    this.setState({serverError: err, submissionError: false, submissionSuccess: false});
                });
            }
        }
    }

    render() {
        let formFields = adminData[this.props.table].fields;

        return (
            <Form model={this.modelName} className={css.form} onSubmit={(v) => {this.handleSubmit(v)}}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                    {
                        formFields.map((s)=> {

                            return (
                                <Col sm={s.size} className={css.formCol} key={s.name}>
                                    <label className={admincss.label}>{s.label}:</label>
                                    <Control.text model={".".concat(s.name)} disabled={!this.state.isInsert} className={admincss.input} required={s.required}/>
                                </Col>
                            );

                        })
                    }

                <Col sm={6} className={css.formCol}>
                    <Button bsStyle="primary" className={admincss.button} type="submit" style={{float:'center'}}>
                        {this.state.isInsert ? 'Submit':'ActivateForm'}
                    </Button>
                </Col>
            </Form>
        );
    }
}

export default CommonAdminForms


