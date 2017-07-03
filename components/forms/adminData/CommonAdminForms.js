"use strict";
import React from 'react';
import css from '../forms.css';
import admincss from './adminForm.css';
import { withRouter } from 'react-router';
import store from '../../../core/store';
import tableNames from '../../tables/tableNames';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import { getOptionsListAsync,getConditionalOptionsListAsync} from '../../actions/actionCreators/formsActionCreators';

import * as submit from './submit';
import adminData from './adminDataModels';
import constants from '../../constants/constants';
import { Control, Form, actions, Errors} from 'react-redux-form';
import { findByIdAsync,deleteAsync,validateUserAsync} from '../../actions/actionCreators/facilityDataActionCreators';
import { feedbackError, feedbackSuccess, feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import Feedback from '../../utils/Feedback';
import inputTypes from '../../forms/inputTypes';


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


    //if updatedId has value fetch the data from backend
    //otherwise show empty insert form
    newOrUpdate(table,updateId){
        //let state = {serverError: {}};
        let currentPath = window.location.pathname + window.location.hash.substr(2);
        // if (currentPath.endsWith('/new')) {
        //     store.dispatch(actions.reset(this.modelName));

        if (this.props.updateId) {

                let future = store.dispatch(findByIdAsync(table, updateId));

                future
                    .done((data) => {
                        console.log(data);
                        this.setState({username: data.login});
                        store.dispatch(actions.merge(this.modelName, data));
                        // Need to reset validaity manually because of a bug in RRF:
                        // https://github.com/davidkpiano/react-redux-form/issues/836
                        store.dispatch(actions.resetValidity(this.modelName));
                    });

        }
        else {
            //empty the admin forms
            store.dispatch(actions.reset(this.modelName));
        }

    }

    componentWillMount() {

        this.newOrUpdate(this.table,this.props.updateId);

        if (this.table === tableNames.RUN_TYPES_LENGTHS) {
            let runtypeList = store.getState().options[optionsStoreKeys.RUN_TYPES];
            let readlengthList = store.getState().options[optionsStoreKeys.READ_LENGTHS];

            if (!runtypeList) {
                let future = store.dispatch(getOptionsListAsync(tableNames.RUN_TYPES, optionsStoreKeys.RUN_TYPES));
                future
                    .done((data) => {
                        this.setState({
                            runtypeList: data
                        });
                    })
            } else {
                this.setState({
                    runtypeList
                });
            }

            if (!readlengthList) {
                let future = store.dispatch(getOptionsListAsync(tableNames.READ_LENGTHS, optionsStoreKeys.READ_LENGTHS));
                future
                    .done((data) => {
                        this.setState({
                            readlengthList: data
                        });
                    })
            } else {
                this.setState({
                    readlengthList
                });
            }
        }

        if (this.table === tableNames.PROJECT_SHARINGS) {
            let projectList = store.getState().options[optionsStoreKeys.PROJECTS];
            let peopleList = store.getState().options[optionsStoreKeys.PEOPLE];

            if (!projectList) {
                let future = store.dispatch(getOptionsListAsync(tableNames.PROJECTS, optionsStoreKeys.PROJECTS));
                future
                    .done((data) => {
                        this.setState({
                            projectList: data
                        });
                    })
            } else {
                this.setState({
                    projectList
                });
            }

            if (!peopleList) {
                let future = store.dispatch(getOptionsListAsync(tableNames.PEOPLE, optionsStoreKeys.PEOPLE));
                future
                    .done((data) => {
                        this.setState({
                            peopleList: data
                        });
                    })
            } else {
                this.setState({
                    peopleList
                });
            }
        }

        if (this.table === tableNames.USERS) {
            let laboratoryList = store.getState().options[optionsStoreKeys.LABORATORIES];
            if (!laboratoryList) {
                let future = store.dispatch(getConditionalOptionsListAsync(tableNames.PEOPLE, "labs", optionsStoreKeys.PEOPLE));
                future
                    .done((data) => {
                        this.setState({
                            laboratoryList: data
                        });
                    })
            } else {
                this.setState({
                    laboratoryList
                });
            }

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

    userDelete(form, table,userId){

        //userDelete(this, this.table, this.props.updateId);
        let state = {serverError: {}};

        if (confirm("Are you sure to delete this user?")) { // Clic sur OK
            if (userId) {

                let future = store.dispatch(deleteAsync(table, userId));
                future
                    .done((deleteId) => {
                        console.debug(200, "Delete <" + deleteId + "> recordes")
                        store.dispatch(feedbackSuccess(form, "Delete <" + deleteId + "> recordes"));
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
        let state = {serverError: {}};
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

    makeOptions(list,formatter) {
        let options = list.map(v => formatter(v));

        if (this.props.hasNoneValue) {
            options.unshift(["", '-']);
        }

        let optionList = options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        });
        return optionList;
    }

    formatterRuntypes(v) { return [v.id, v.name]; }
    formatterReadLengths(v) { return [v.id, v.length]; }
    formatterProject(v) { return [v.id, v.lastName +" - "+ v.name]; }
    formatterPeople(v) { return [v.id, v.lastName +" - "+ v.firstName]; }
    formatterLabortory(v) { return [v.id, v.lastName + "  " + v.firstName]; }


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
            // Use React-bootstrap FormControl as custom Control component:
            // https://davidkpiano.github.io/react-redux-form/docs/guides/custom-controls.html
            // First we map the react-redux forms props to the react-bootstrap props:
            const BSTextInput = (props) => <FormControl  {...props} />;
            // Then we just pass this in the 'component' prop of react-redux-forms' Control.
            //const isRequired = s.required? (val) => val && val.length : null;

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
                options = this.makeOptions(this.state.runtypeList, this.formatterRuntypes);
            } else if (s.name ==="readLengthId") {
                options = this.makeOptions(this.state.readlengthList, this.formatterReadLengths);
            } else if (s.name === "projectId") {
                options = this.makeOptions(this.state.projectList, this.formatterProject);
            } else if (s.name === "personId") {
                options = this.makeOptions(this.state.peopleList, this.formatterPeople);
            } else if (s.name === "laboratoryId"){
                options = this.makeOptions(this.state.laboratoryList, this.formatterLabortory);
            } else if (s.name === "role" ){
                let roleList = [
                                {value: "customer", name:"customer" },
                                {value: "no_access", name: "no access" },
                                {value:"facility", name:"facility" },
                                {value: "admin", name: "admin"}
                                ];

                options = this.makeOptions(roleList, function(v){return [v.value, v.name]});
                //console.log(options);

            }

            const BSSelect = (props) => <FormControl componentClass= "select" {...props} />;

            input = <div>
                        <Control.select id={s.name}
                                        model={".".concat(s.name)}
                                        component={BSSelect}
                                        disabled={!this.state.isInsert}
                                        //required={s.required}
                                        validators= {{
                                            isRequired:(s.required)? (val)=> val !== "" : null}}
                        >

                                {options}
                        </Control.select>
                        <Errors
                            className = {admincss.errors}
                            model={".".concat(s.name)}
                            show="touched"
                            messages={{
                                isRequired: 'Please select an option for this field.',
                            }}
                        />
                    </div>
        }

        return input;
    }

    render() {
        let formFields = adminData[this.props.table].fields;
        // let feedbackStatus = this.state.submissionError ? constants.SUBMISSION_ERROR :
        //                     (this.state.submissionSuccess ? constants.SUBMISSION_SUCCESS :
        //                     (Object.keys(this.state.serverError).length > 0 ? constants.SERVER_ERROR : ""));
        // let error = this.state.serverError;
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

CommonAdminForms.defaultProps = {
    hasNoneValue: true,
};

export default withRouter(CommonAdminForms)
