"use strict";
import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import css from '../forms.css';
import admincss from './adminForm.css';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';

import { Control, Form, actions} from 'react-redux-form';
import Feedback from '../../utils/Feedback';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import optionsStoreKeys from '../../constants/optionsStoreKeys';

import store from '../../../core/store';
import { getConditionalOptionsListAsync} from '../../actions/actionCreators/formsActionCreators';
import { findByIdAsync,deleteAsync,validateUserAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import adminData from './adminDataModels';
import {submit} from './submit';

import { Button,FormControl } from 'react-bootstrap/lib';

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
            isValidated: undefined,
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
        updateId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
            //state = Object.assign(state, {submissionError: false, submissionFuture: future});
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

         let isValidated = formData['isvalidated'];
         this.setState({isValidated :isValidated});

         submit(this, this.modelName, formData, this.table, this.props.updateId, this.state.isInsert);

    }

    userDelete(form, table,userId){

        //userDelete(this, this.table, this.props.updateId);
        let state = {serverError: {}};

        if (confirm("Are you sure to delete this user?")) { // Clic sur OK
            if (userId) {

                let future = store.dispatch(deleteAsync(table, userId));
                state = Object.assign(state, {submissionError: false, submissionFuture: future});
                future
                    .done((deleteId) => {
                        console.debug(200, "Delete <" + deleteId + "> recordes")
                        store.dispatch(feedbackSuccess(form, "Delete <" + deleteId + "> recordes"));
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        if (userId !== '' || userId !== undefined) {
                            this.props.router.push(currentPath.replace('/update/' + userId, '/list'));
                        }
                        store.dispatch(actions.load())
                        //hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                    })
                    .fail(() => {
                        console.warn("Uncaught form validation error");
                        store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                    });
            }
        }
    }

    userValidate(form, userId){
        let state = {serverError: {}};
        if (confirm("Are you sure that you want to activate this user?")) { // Clic sur OK
            if (userId) {

                let future = store.dispatch(validateUserAsync(userId));
                state = Object.assign(state, {submissionError: false, submissionFuture: future});
                future
                    .done((validateId) => {
                        console.debug(200, "Validated ID <" + validateId + ">");
                        store.dispatch(feedbackSuccess(form, "Validated ID <" + validateId + ">"));
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        if (userId !== '' || userId !== undefined) {

                            this.props.router.push(currentPath.replace('/update/' + userId, '/list'));

                        }
                    })
                    .fail(() => {
                        console.warn("Uncaught form validation error");
                        store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                    });
            }
        }

    }

    render() {
        let laboratoryList = this.state.laboratoryList;

        let laboratoryOptions = this.makeOptions(laboratoryList,this.formatterLabortory);

        const BSTextInput = (props) => <FormControl {...props} />;

        return (

        <Form model={this.modelName} className={css.form} onSubmit = {v => this.handleSubmit(v)}>
                <Feedback reference={this.modelName} />

                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>First Name</label>
                    <Control component={BSTextInput} model=".firstName" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>


                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>Last Name</label>
                    <Control component={BSTextInput} model=".lastName" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Login Name</label>
                    <Control component={BSTextInput} model=".login" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>Phone</label>
                    <Control component={BSTextInput} model=".phone" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>Email</label>
                    <Control component={BSTextInput} model=".email" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Address</label>
                    <Control component={BSTextInput} model=".address" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Laboratory</label>
                    <Control.select model=".laboratoryId" disabled={!this.state.isInsert} >
                        {laboratoryOptions}
                    </Control.select>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Lims Access</label>
                    <Control.select model=".role" disabled={!this.state.isInsert}>
                        <option value = "customer">customer</option>
                        <option value = "no access">no access</option>
                        <option value = "facility">facility</option>
                        <option value = "admin">admin</option>
                    </Control.select>
                </Col>


                {/* Submit */}

                <Button bsStyle="primary" className={admincss.button} type ="submit" >
                    {this.state.isInsert ? 'Submit' : 'Activate Form'}
                </Button>
                { this.state.isInsert && this.props.updateId && !this.state.isValidated ?
                    <Button bsStyle="primary" className={admincss.button} type = "button" onClick={this.userValidate.bind(this,this.modelName, this.props.updateId)}>Validate</Button>
                : null}
                { this.state.isInsert && this.props.updateId && !this.state.isValidated ?
                     <Button bsStyle="primary" className={admincss.button} type = "button" onClick={this.userDelete.bind(this,this.modelName, this.table,this.props.updateId)}>Delete</Button>
                    : null}
             </Form>



        );

    }
}


LimsUsersSubmitForm.defaultProps = {
    hasNoneValue: true,
};

export default withRouter(LimsUsersSubmitForm)
