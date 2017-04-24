"use strict";
import React from 'react';
import { withRouter } from 'react-router';

import css from '../forms.css';
import admincss from './adminForm.css';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';

import { Control, Form, actions} from 'react-redux-form';
import * as messages from '../messages';
import optionsStoreKeys from '../../constants/optionsStoreKeys';

import store from '../../../core/store';
import { getConditionalOptionsListAsync} from '../../actions/actionCreators/formsActionCreators';
import { findByIdAsync,deleteAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import adminData from './adminDataModels';
import {submit} from './submit';

import { Button } from 'react-bootstrap/lib';

class LimsUsersSubmitForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = this.props.table;
        this.state = {
            serverError: {},
            submissionError: false,
            submissionSuccess: false,
            submissionId: undefined,
            laboratoryList: [],
        };

        const modelName = "adminForms.";
        this.modelName = modelName.concat(adminData[this.props.table].model);

        if (this.props.updateId === '' || this.props.updateId === undefined) {
            this.state.isInsert = true;
        }else{
            this.state.isInsert = false;
        }

    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };


    componentWillMount() {
        let laboratoryTable = "people";
        let suffix = "labs";
        let laboratoryStoreKey = optionsStoreKeys.PEOPLE;
        let laboratoryList = store.getState().forms[laboratoryStoreKey];


        if (!laboratoryList) {
            let future = store.dispatch(getConditionalOptionsListAsync(laboratoryTable, suffix, laboratoryStoreKey));
            future
                .done((data) => {
                    //console.log(data);

                    this.setState({
                        laboratoryList: data
                    });

                })

        }else{
            this.setState({
                laboratoryList
            });
        }


        this.newOrUpdate(this.table,this.props.updateId);

    }

    componentWillReceiveProps() {

        this.newOrUpdate(this.table,this.props.updateId);

    }

    //if updatedId has value fetch the data from backend
    //otherwise show empty insert form
    newOrUpdate(table,updateId){
        let state = {serverError: {}};
        if (this.props.updateId) {

            let future = store.dispatch(findByIdAsync(table, updateId));
            state = Object.assign(state, {submissionError: false, submissionFuture: future});
            let model= adminData[table].model;

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

    formatterLabortory(v) { return [v.id, v.lastName + "  " + v.firstName]; }


    makeOptions(list,formatter) {

        let options = list.map(v => formatter(v));
        if (this.props.hasNoneValue) {
            options.unshift([-1, '-']);
        }
        let results = options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        });

        return results;
    }

    handleSubmit(values){
        let formData = Object.assign({}, values);
        //change submit data' key: 'login' -> 'username'
         Object.defineProperty(formData, 'username',
             Object.getOwnPropertyDescriptor(formData, 'login'));
         delete formData['login'];

         submit(this, formData, this.table, this.props.updateId, this.state.isInsert);

    }

    userDelete(component,table,userId){
        console.log(userId);
        //userDelete(this, this.table, this.props.updateId);
        let state = {serverError: {}};

        if (userId) {

            let future = store.dispatch(deleteAsync(table, userId));
            state = Object.assign(state, {submissionError: false, submissionFuture: future});
            future
                .done((deleteId) => console.debug(200, "Delete ID <" + deleteId + ">"))
                .fail(() => console.warn("Uncaught form validation error"));

            let {submissionError, submissionFuture} =state;
            if (submissionError) {
                component.setState({submissionError, serverError: {}});
            } else {
                submissionFuture.done((insertId) => {
                    component.setState({
                        submissionSuccess: true,
                        submissionId: insertId,
                        submissionError: false,
                        serverError: {}
                    });
                    let currentPath = window.location.pathname + window.location.hash.substr(2);
                    if (userId !== '' || userId !== undefined) {

                        component.props.router.push(currentPath.replace('/update/'+ userId, '/list'));

                    }
                }).fail((err) => {
                    component.setState({serverError: err, submissionError: false, submissionSuccess: false});
                });
            }
        }
    }

    render() {
        let laboratoryList = this.state.laboratoryList;

        let laboratoryOptions = this.makeOptions(laboratoryList,this.formatterLabortory);

        return (

        <Form model={this.modelName} className={css.form} onSubmit = {v => this.handleSubmit(v)}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>First Name:</label>
                    <Control.text model=".firstName" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>


                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>Last Name:</label>
                    <Control.text model=".lastName" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Login Name:</label>
                    <Control.text model=".login" disabled={!this.state.isInsert} className={admincss.input}>
                    </Control.text>
                </Col>

                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>Phone:</label>
                    <Control.text model=".phone" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>Email:</label>
                    <Control.text model=".email" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Address:</label>
                    <Control.text model=".address" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Laboratory:</label>
                    <Control.select model=".laboratoryId" disabled={!this.state.isInsert} >
                        {laboratoryOptions}
                    </Control.select>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Lims Access:</label>
                    <Control.select model=".role" disabled={!this.state.isInsert}>
                        <option value = "customer">customer</option>
                        <option value = "no access">no access</option>
                        <option value = "facility">facility</option>
                        <option value = "admin">admin</option>
                    </Control.select>
                </Col>


                                {/* Submit */}


                <Button bsStyle="primary" className={admincss.button} type ="submit" >
                    {this.state.isInsert ? 'Submit' : 'ActivateForm'}
                </Button>
                {this.state.isInsert && this.props.updateId ?
                 <Button bsStyle="primary" className={admincss.button} type = "button" onClick={this.userDelete.bind(this,this.table,this.props.updateId)}>Delete</Button> : null}
            </Form>



        );

    }
}


LimsUsersSubmitForm.defaultProps = {
    hasNoneValue: true,
};

export default withRouter(LimsUsersSubmitForm)
