"use strict";
import React from 'react';
import { Control, Form, actions} from 'react-redux-form';
import admincss from '../adminForm.css';
import css from '../forms.css';
import cx from 'classnames';
import * as messages from '../messages';

import store from '../../../core/store';
import { insertAsync } from '../../actions/actionCreators/facilityDataActionCreators';

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

        if (this.props.updateId ==='' || this.props.updateId ==undefined) {
            this.state.isInsert= true;
        }
    }



    handleSubmit(values){
        let state = {serverError: {}};
        var formData = Object.assign({}, values);
        console.info(JSON.stringify(formData, null, 2));
        let fields = Object.keys(formData);
        let table = this.props.table;

         Object.keys(formData).forEach(function(key,index) {
         // key: the name of the object key
         // index: the ordinal position of the key within the object
             if (adminData[table].fields[index].type ==="Int") {
                 formData[key]= parseInt(formData[key]);
             } else if (adminData[table].fields[index].type ==="Boolean"){
                 formData[key] = !!parseInt(formData[key]);
             }
         });
         console.log(formData);

        let future = store.dispatch(insertAsync(this.table, formData));
        state = Object.assign(state, {submissionError: false, submissionFuture: future});
        future
            .done((insertId) => console.debug(200, "Inserted ID <"+insertId+">"))
            .fail(() => console.warn("Uncaught form validation error"));

        let {submissionError, submissionFuture} =state;
        if (submissionError) {
            this.setState({ submissionError, serverError: {} });
        } else {
            submissionFuture.done((insertId) => {
                this.setState({ submissionSuccess: true, submissionId: insertId, submissionError: false, serverError: {} });
            }).fail((err) =>{
                this.setState({ serverError: err, submissionError: false, submissionSuccess: false });
            });
        }

    }

    render() {
        let modelName= "adminForms.";
        modelName=modelName.concat(adminData[this.props.table].model);
        let formFields = adminData[this.props.table].fields;

        return (


            <Form model={modelName} className={css.form} onSubmit={(v) => {this.handleSubmit(v)}}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                    {
                        formFields.map((s)=> {

                             return (
                                 <Col sm={s.size} className={css.formCol} key={s.name}>
                                     <label className={admincss.label}>{s.label}:</label>
                                     <Control.text model={".".concat(s.name)}  disabled={!this.state.isInsert} className={admincss.input} required={s.required}/>
                                 </Col>
                             )

                         })
                     }

                <Col sm={6} className={css.formCol}>
                    <button type="submit"  className={admincss.button} style={{float:'center'}}>
                        {this.state.isInsert ? 'Submit':'ActivateForm'}
                    </button>
                </Col>
            </Form>
        );
    }
}

export default CommonAdminForms


