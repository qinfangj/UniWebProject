"use strict";
import React from 'react';
import css from '../forms.css';
import admincss from './adminForm.css';
import { withRouter } from 'react-router';
import store from '../../../core/store';
import tableNames from '../../tables/tableNames';
import optionsStoreKeys from '../../constants/optionsStoreKeys';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    requestAllProjects,
    requestAllPeople,
    requestLaboratories,
    requestReadLengths,
    requestRunTypes } from '../../actions/actionCreators/optionsActionCreators';

import { deleteAsync, validateUserAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';

import * as submit from './submit';
import * as forms from '../forms';
import adminData from './adminDataModels';
import inputTypes from '../../forms/inputTypes';

import Feedback from '../../utils/Feedback';
import { Control, Form, actions, Errors} from 'react-redux-form';
import { Button, Col, FormControl } from 'react-bootstrap/lib';



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
            runtypeList: [],
            readlengthList: [],
            projectList: [],
            peopleList: [],
            laboratoryList: [],
            isValidated: undefined,
            username: "",
        };
        this.state.isInsert = this.props.updateId === '' || this.props.updateId === undefined;
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId);

        if (this.table === tableNames.RUN_TYPES_LENGTHS) {
            store.dispatch(requestRunTypes());
            store.dispatch(requestReadLengths());
        } else if (this.table === tableNames.PROJECT_SHARINGS) {
            store.dispatch(requestAllProjects());
            store.dispatch(requestAllPeople());
        } else if (this.table === tableNames.USERS) {
            store.dispatch(requestLaboratories());
        }
    }

    handleSubmit(values){
        if (this.table === tableNames.USERS){
            let formData = Object.assign({}, values);
            //change submit data' key: 'login' -> 'username'
            Object.defineProperty(formData, 'username',
                Object.getOwnPropertyDescriptor(formData, 'login'));
            delete formData['login'];

            let isValidated = formData['isvalidated'];
            this.setState({isvalidated: isValidated});  // does it even do anything??
            submit.submit(this, this.modelName, formData, this.table, this.props.updateId, this.state.isInsert);
        } else {
            console.log(values);
            submit.submit(this, this.modelName, values, this.table, this.props.updateId, this.state.isInsert);
        }
    }

    userDelete(form, table, userId){

        //userDelete(this, this.table, this.props.updateId);

        if (confirm("Are you sure to delete this user?")) { // Click on OK
            if (userId) {

                let future = store.dispatch(deleteAsync(table, userId));
                future
                    .done((deleteId) => {
                        console.debug(200, "Delete <" + deleteId + "> records")
                        store.dispatch(feedbackSuccess(form, "Delete <" + deleteId + "> records"));
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        if (userId !== '' || userId !== undefined) {
                            this.props.router.push(currentPath.replace('/update/' + userId, '/list'));
                        }
                        store.dispatch(actions.load())  // does nothing?
                        //hashHistory.push(currentPath.replace('/new', '/list').replace(/\/update.*$/g, '/list'));
                    })
                    .fail((err) => {
                        console.warn("Uncaught form validation error");
                        store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                    });
            }
        }
    }

    userValidate(form){
        if (confirm("Are you sure that you want to activate this user?")) { // Clic sur OK
            if (this.state.username) {
                let future = store.dispatch(validateUserAsync({username:this.state.username}));
                future
                    .done((validateId) => {
                        console.debug(200, "Validated ID <" + validateId + ">");
                        store.dispatch(feedbackSuccess(form, "Validated user <" + this.state.username + ">"));
                        let currentPath = window.location.pathname + window.location.hash.substr(2);
                        if (this.props.updateId !== '' || this.props.updateId !== undefined) {

                            this.props.router.push(currentPath.replace('/update/' + this.props.updateId, '/list'));

                        }
                    })
                    .fail((err) => {
                        console.warn("Uncaught form validation error");
                        store.dispatch(feedbackError(form, "Uncaught form validation error", err));
                    });
            }
        }

    }

    makeOptions(options, hasNoneValue = true) {
        let opts = [...options];
        if (hasNoneValue) {
            opts.unshift(["", '-']);
        }
        let optionList = opts.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        });
        return optionList;
    }

    makeInput(s) {
        let input;
        if (s.type === inputTypes.CHECKBOX) {
            input =
                <Control.checkbox
                    id= {s.name}
                    model={".".concat(s.name)}
                    disabled={!this.state.isInsert}
                    className={admincss.input}
                />
        } else if (s.type === inputTypes.TEXT) {
            const BSTextInput = (props) => <FormControl  {...props} />;
            input = <div>
                        <Control
                            id={s.name}
                            className={admincss.input}
                            component={BSTextInput}
                            model={".".concat(s.name)}
                            disabled={!this.state.isInsert}
                            required = {s.required}
                        />
                        <Errors
                            className = {admincss.errors}
                            model={".".concat(s.name)}
                            show="touched"
                        />
                    </div>
        } else if (s.type === inputTypes.DROPDOWN) {
            let options;
            if (s.name ==="runTypeId") {
                let opts = this.props.options[optionsStoreKeys.RUN_TYPES];
                opts.sort();
                options = this.makeOptions(opts);
            } else if (s.name ==="readLengthId") {
                let opts = this.props.options[optionsStoreKeys.READ_LENGTHS];
                opts.sort((a,b) => parseInt(a[1]) < parseInt(b[1]) ? -1 : 1);
                options = this.makeOptions(opts);
            } else if (s.name === "projectId") {
                let opts = this.props.options[optionsStoreKeys.PROJECTS_ALL];
                options = this.makeOptions(opts);
            } else if (s.name === "personId") {
                let opts = this.props.options[optionsStoreKeys.PEOPLE];
                options = this.makeOptions(opts);
            } else if (s.name === "laboratoryId"){
                let opts = this.props.options[optionsStoreKeys.LABORATORIES];
                options = this.makeOptions(opts);
            } else if (s.name === "role" ){
                let roleList = [
                                {value: "no_access", name: "no access" },
                                {value: "customer", name: "customer" },
                                {value: "facility", name: "facility" },
                                {value: "admin", name: "admin"}
                               ];
                options = this.makeOptions(roleList.map(v => [v.value, v.name]), false);
            }

            const BSSelect = (props) => <FormControl componentClass="select" {...props} />;

            input = <div>
                        <Control.select id={s.name}
                                        model={".".concat(s.name)}
                                        component={BSSelect}
                                        disabled={!this.state.isInsert}
                                        //required={s.required}
                                        validators= {{
                                            isRequired: (s.required) ? (val) => val !== "" : null
                                        }}
                        >
                                {options}
                        </Control.select>
                        <Errors
                            className={admincss.errors}
                            model={".".concat(s.name)}
                            show="touched"
                            messages={{
                                isRequired: 'Please select an option.',
                            }}
                        />
                    </div>
        }

        return input;
    }

    render() {
        let formFields = adminData[this.props.table].fields;
        return (
            <Form model={this.modelName} className={css.form} onSubmit={(v) => {this.handleSubmit(v)}}>

                <Feedback reference={this.modelName} />

                {
                    formFields.map((s) => {

                        return (
                            <Col sm={s.size} className={css.formCol} key={s.name}>
                                <label className={admincss.label}>{s.label}</label>
                                {this.makeInput(s)}
                            </Col>
                        )

                    })

                }
                <div className="clearfix"/>
                {/*<Col sm={6} className={css.formCol}>*/}
                    <Button bsStyle="primary" className={admincss.button} type="submit" >
                        {this.state.isInsert ? 'Submit' : 'ActivateForm'}
                    </Button>

                { this.table === tableNames.USERS && this.state.isInsert && this.props.updateId && !this.state.isValidated ?
                    <Button bsStyle="primary" className={admincss.button} type = "button" onClick={this.userValidate.bind(this,this.modelName)}>Validate</Button>
                    : null}
                { this.table === tableNames.USERS && this.state.isInsert && this.props.updateId && !this.state.isValidated ?
                    <Button bsStyle="primary" className={admincss.button} type = "button" onClick={this.userDelete.bind(this,this.modelName, this.table,this.props.updateId)}>Delete</Button>
                    : null}
                {/*</Col>*/}
            </Form>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        options: state.options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestAllProjects,
        requestAllPeople,
        requestLaboratories,
        requestReadLengths,
        requestRunTypes
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommonAdminForms));

