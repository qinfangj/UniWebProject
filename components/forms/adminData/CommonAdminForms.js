"use strict";
import React from 'react';
import { withRouter } from 'react-router';

import { Control, Form, actions} from 'react-redux-form';
import admincss from './adminForm.css';
import css from '../forms.css';
import * as messages from '../messages';
import * as submit from './submit';

import store from '../../../core/store';
import { findByIdAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import adminData from './adminDataModels';

/* React-bootstrap */
import { Button, Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap/lib';



class CommonAdminForms extends React.Component {
    constructor(props) {
        super(props);

        this.table = this.props.table;
        const modelName = "adminForms.";
        this.modelName = modelName.concat(adminData[this.props.table].model);

        this.state = {
            serverError: {},
            submissionError: false,
            submissionSuccess: false,
            submissionId: undefined,
        };
        this.state.isInsert = this.props.updateId === '' || this.props.updateId === undefined;
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

    handleSubmit(values){
        submit.submit(this, values, this.table, this.props.updateId, this.state.isInsert);
    }


    makeInput(s) {
        let input;
        if (s.type === "Boolean") {
            input =
                <Control.checkbox
                    model={".".concat(s.name)}
                    disabled={!this.state.isInsert}
                    className={admincss.input}
                />
        } else {
            // Use React-bootstrap FormControl as custom Control component:
            // https://davidkpiano.github.io/react-redux-form/docs/guides/custom-controls.html
            // First we map the react-redux forms props to the react-bootstrap props:
            const BSTextInput = (props) => <FormControl {...props} />;
            // Then we just pass this in the 'component' prop of react-redux-forms' Control.
            input =
                <Control
                    className={admincss.input}
                    component={BSTextInput}
                    model={".".concat(s.name)}
                    disabled={!this.state.isInsert}
                    required={s.required}
                />;
        }
        return input;
    }

    render() {
        let formFields = adminData[this.props.table].fields;

        return (
            <Form model={this.modelName} className={css.form} onSubmit={(v) => {this.handleSubmit(v)}}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                {
                    formFields.map((s) => {

                        return (
                            <Col sm={s.size} className={css.formCol} key={s.name}>
                                <label className={admincss.label}>{s.label}:</label>
                                {this.makeInput(s)}
                            </Col>
                        )

                    })

                }
                <div className="clearfix"/>
                <Col sm={6} className={css.formCol}>
                    <Button bsStyle="primary" className={admincss.button} type="submit" >
                        {this.state.isInsert ? 'Submit':'ActivateForm'}
                    </Button>
                </Col>
            </Form>
        );
    }
}

export default withRouter(CommonAdminForms)
