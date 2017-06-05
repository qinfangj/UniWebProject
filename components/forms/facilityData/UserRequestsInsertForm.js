"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import formsCss from '../forms.css';

import store from '../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, actions } from 'react-redux-form';

import { feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import { requestProjectsHavingASample,
         requestRunsTypesLengths,
         requestLibProtocols } from '../../actions/actionCreators/optionsActionCreators';
import { requestSamplesForProject } from '../../actions/actionCreators/secondaryOptionsActionCreators';

import * as forms from '../forms.js';
import fields from '../../constants/fields';
import formNames from '../../constants/formNames';
import userRequestsModel from './formModels/userRequestsModel';

import Button from 'react-bootstrap/lib/Button';
import Feedback from '../../utils/Feedback';



class UserRequestsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "user_requests";
        this.form = formNames.USER_REQUESTS_INSERT_FORM;
        this.modelName = "facilityDataForms.user_requests";
        this.model = userRequestsModel;
        this.state = {
            disabled: false,
        };
    }

    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId, this.onUpdateLoadSamplesOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestProjectsHavingASample();
        this.props.requestRunsTypesLengths();
        this.props.requestLibProtocols();
    }

    onUpdateLoadSamplesOptions(data) {
        this.props.requestSamplesForProject(this.modelName+'.'+fields.PROJECT_ID, data.projectId);
    }

    onSubmit(values) {
        let insertData = forms.formatFormFieldsDefault(this.model, values);
        let validation = forms.validateFormDefault(insertData);
        if (validation.isValid) {
            forms.submitForm(this.modelName, insertData, this.table, this.form);
        } else {
            this.props.feedbackWarning(this.form, validation.message);
        }
    }

    activateForm() {
        this.setState({ disabled: false });
    }
    deactivateForm() {
        this.setState({ disabled: true });
    }

    /**
     * Change the samples options list when the project changes.
     **/
    onProjectChange(model, value) {
        store.dispatch(actions.change(model, value));
        this.props.requestSamplesForProject(model, value);
    }

    render() {
        let changeActions = {[fields.PROJECT_ID]: this.onProjectChange.bind(this)};
        let formFields = forms.makeFormFields(this.modelName, this.model, this.state.disabled, this.props.options, changeActions);

        return (
            <div>

                <Feedback reference={this.form} />

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {formFields}

                    <div className="clearfix"/>

                    {/* Submit */}

                    {this.state.disabled ?
                        <Button bsStyle="primary" onClick={this.activateForm.bind(this)} className={formsCss.submitButton}>
                            Activate form
                        </Button>
                        :
                        <div>
                            <Button bsStyle="danger" onClick={this.deactivateForm.bind(this)} className={formsCss.submitButton}>
                                Cancel
                            </Button>
                            <Button bsStyle="primary" type="submit" className={formsCss.submitButton}>
                                Submit
                            </Button>
                        </div>
                    }

                </Form>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    let options = forms.optionsFromModel(state, userRequestsModel);
    let formData = state.facilityDataForms.user_requests;
    let formModel = state.facilityDataForms.forms.user_requests;
    return {
        options: options,
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        feedbackWarning,
        requestProjectsHavingASample,
        requestRunsTypesLengths,
        requestSamplesForProject,
        requestLibProtocols,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(UserRequestsInsertForm);

