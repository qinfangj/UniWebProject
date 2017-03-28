"use strict";
import React from 'react';
import css from '../forms.css';
import admincss from '../adminForm.css';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';

import { Control, Form, actions} from 'react-redux-form';
import * as messages from '../messages';
import dataStoreKeys from '../../constants/dataStoreKeys';

import store from '../../../core/store';
import { getConditionalOptionsListAsync} from '../../actions/actionCreators/formsActionCreators';
import { insertAsync,findByIdAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import adminData from './AdminDataConstants';

import { dateNow, parseDateString } from '../../../utils/time';
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
            laboratoryList: []
        };

        const modelName = "adminForms.";
        this.modelName = modelName.concat(adminData[this.props.table].model);

        if (this.props.updateId ==='' || this.props.updateId ==undefined) {
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
        let suffix = "lab";
        let laboratoryStoreKey = dataStoreKeys.PEOPLE;
        let laboratoryList = store.getState().forms[laboratoryStoreKey];


        if (!laboratoryList) {
            let future = store.dispatch(getConditionalOptionsListAsync(laboratoryTable, suffix, laboratoryStoreKey));
            future
                .done((data) => {

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
                    formData[key] = !!parseInt(formData[key]);
                }
            }
        });

        if (formData.id && formData.id !== 0) {
            formData.updatedAt = dateNow();
            if (formData.createdAt) {
                formData.createdAt = parseDateString(formData.createdAt);
            }
        }

        console.log(formData);
        return formData
    }

    handleSubmit(values){

        let state = {serverError: {}};
        var formData = Object.assign({}, values);
        console.info(JSON.stringify(formData, null, 2));


        if (!this.state.isInsert) {
            this.setState({isInsert:true});
        } else {
            var formatFormData = this.formatFormData(formData);
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
        let laboratoryList=this.state.laboratoryList;

        let laboratoryOptions =this.makeOptions(laboratoryList,this.formatterLabortory);

        return (

            <Form model={this.modelName} className={css.form} onSubmit={(v) => this.handleSubmit(v)}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Login Name:</label>
                    <Control.text model=".username">
                    </Control.text>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Lims Access:</label>
                    <Control.select model=".role">
                        <option selected="selected"></option>
                        <option value = "customer">customer</option>
                        <option value = "no access">no access</option>
                        <option value = "facility">facility</option>
                        <option value = "admin">admin</option>
                    </Control.select>
                </Col>

                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>First Name:</label>
                    <Control.text model=".firstName" disabled={!this.state.isInsert} className={admincss.input}/>
                </Col>


                <Col sm={3} className={css.formCol}>
                    <label className={admincss.label}>Last Name:</label>
                    <Control.text model=".lastName" disabled={!this.state.isInsert} className={admincss.input}/>
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
                    <Control.select model=".personId">
                        {laboratoryOptions}
                    </Control.select>
                </Col>

                {/* Submit */}


                <Button bsStyle="primary" className={admincss.button} type="submit" style={{float: 'center'}}>
                    {this.state.isInsert ? 'Submit' : 'ActivateForm'}
                </Button>


            </Form>
        );
    }
}


ProjectSharingSubmitForm.defaultProps = {
    hasNoneValue: true,
};


export default LimsUsersSubmitForm;