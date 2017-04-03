"use strict";
import React from 'react';
import { withRouter } from 'react-router';

import css from '../forms.css';
import admincss from './adminForm.css';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';

import { Control, Form, actions} from 'react-redux-form';
import * as messages from '../messages';
import dataStoreKeys from '../../constants/dataStoreKeys';

import store from '../../../core/store';
import { getOptionsListAsync} from '../../actions/actionCreators/formsActionCreators';
import { findByIdAsync } from '../../actions/actionCreators/facilityDataActionCreators';
import adminData from './adminDataModels';
import * as submit from './submit';
import { Button } from 'react-bootstrap/lib';



class ProjectSharingSubmitForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = this.props.table;
        this.state = {
            serverError: {},
            submissionError: false,
            submissionSuccess: false,
            submissionId: undefined,
            projectList:[],
            peopleList:[]
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
        let projectTable = "projects";
        let projectStoreKey = dataStoreKeys.PROJECTS;
        let peopleTable = "people";
        let peopleStoreKey = dataStoreKeys.PEOPLE;

        let projectList = store.getState().forms[projectStoreKey];
        let peopleList = store.getState().forms[peopleStoreKey];

        if (!projectList) {
            let future = store.dispatch(getOptionsListAsync(projectTable, projectStoreKey));
            future
                .done((data) => {

                    this.setState({
                        projectList: data
                    });

                })

        }else{
            this.setState({
                projectList
            });
        }

        if (!peopleList) {
            let future = store.dispatch(getOptionsListAsync(peopleTable,peopleStoreKey));
            future
                .done((data) => {

                    this.setState({
                        peopleList: data
                    });

                })

        }else{
            this.setState({
                peopleList
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

    formatterProject(v) { return [v.id, v.lastName +" - "+ v.name]; }
    formatterPeople(v) { return [v.id, v.lastName +" - "+ v.firstName]; }

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
        submit.submit(this, values, this.table, this.props.updateId, this.state.isInsert);
    }

    render() {
        let projectList = this.state.projectList;
        let projectOptions = this.makeOptions(projectList,this.formatterProject);

        let peopleList = this.state.peopleList;
        let peopleOptions = this.makeOptions(peopleList,this.formatterPeople);
        return (

            <Form model={this.modelName} className={css.form} onSubmit={(v) => this.handleSubmit(v)}>
                <messages.SubmissionErrorMessage error={this.state.submissionError} />
                <messages.SubmissionSuccessfulMessage success={this.state.submissionSuccess} id={this.state.submissionId} />
                <messages.ServerErrorMessage error={this.state.serverError} />

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>Project:</label>
                    <Control.select model=".projectId" disabled={!this.state.isInsert}>
                        {projectOptions}
                    </Control.select>
                </Col>

                <Col sm={6} className={css.formCol}>
                    <label className={admincss.label}>People:</label>
                    <Control.select model=".personId" disabled={!this.state.isInsert}>
                        {peopleOptions}
                    </Control.select>
                </Col>

                <Col sm={12} className={css.formCol}>
                    <label className={admincss.label}>Description:</label>
                    <Control.text model=".description" disabled={!this.state.isInsert} className={admincss.input}/>
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


//export default ProjectSharingSubmitForm;
export default withRouter(ProjectSharingSubmitForm)