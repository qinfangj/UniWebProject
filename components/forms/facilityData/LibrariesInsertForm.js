"use strict";
import React from 'react';
import store from '../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, actions } from 'react-redux-form';

import { requestProjectsHavingASample,
         requestLibProtocols,
         requestQuantifMethods,
         requestAllMultiplexIndexes,
         requestLibAdapters,
         requestLibraryStates } from '../../actions/actionCreators/optionsActionCreators';
import { requestSamplesForProject } from '../../actions/actionCreators/secondaryOptionsActionCreators';

import * as forms from '../forms.js';
import * as feedback from '../../../utils/feedback';
import librariesModel from './formModels/librariesModel';
import fields from '../../constants/fields';

import SubmitButton from '../SubmitButton';



export class LibrariesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "libraries";
        this.modelName = "facilityDataForms.libraries";
        this.model = librariesModel;
        this.state = {
            disabled: false,
        };
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, this.onUpdateLoadSamplesOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestProjectsHavingASample();
        this.props.requestLibProtocols();
        this.props.requestQuantifMethods();
        this.props.requestAllMultiplexIndexes();
        this.props.requestLibAdapters();
        this.props.requestLibraryStates();
    }

    onUpdateLoadSamplesOptions(data) {
        this.props.requestSamplesForProject(this.modelName+'.'+fields.PROJECT_ID, data.projectId);
    }

    formatInsertData(values) {
        let insertData = forms.formatFormFieldsDefault(this.model, values);
        return insertData;
    }

    onSubmit(values) {
        let insertData = this.formatInsertData(values);
        let validation = forms.validateFormDefault(insertData);
        if (validation.isValid) {
            forms.submitForm(this.modelName, insertData, this.table);
        } else {
            feedback.warning(validation.message, "LibrariesInsertForm::onSubmit");
        }
    }

    activateForm = () => {
        this.setState({ disabled: false });
    };
    deactivateForm = () => {
        this.setState({ disabled: true });
    };

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
                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {formFields}

                    <div className="clearfix"/>

                    <SubmitButton
                        disabled={this.state.disabled}
                        activateForm={this.activateForm}
                        deactivateForm={this.deactivateForm}
                    />

                </Form>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    let formData = state.facilityDataForms.basecallings;
    let formModel = state.facilityDataForms.forms.basecallings;
    return {
        options: state.options,
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestProjectsHavingASample,
        requestLibProtocols,
        requestQuantifMethods,
        requestAllMultiplexIndexes,
        requestLibAdapters,
        requestLibraryStates,
        requestSamplesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LibrariesInsertForm);

