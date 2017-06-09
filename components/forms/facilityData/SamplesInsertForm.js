"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import formsCss from '../forms.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';

import { feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import { requestAllProjects,
         requestTaxonomies,
         requestSampleTypes,
         requestQuantifMethods } from '../../actions/actionCreators/optionsActionCreators';

import * as forms from '../forms.js';
import formNames from '../../constants/formNames';
import samplesModel from './formModels/samplesModel';

import Button from 'react-bootstrap/lib/Button';
import Feedback from '../../utils/Feedback';



class SamplesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "samples";
        this.form = formNames.SAMPLES_INSERT_FORM;
        this.modelName = "facilityDataForms.samples";
        this.model = samplesModel;
        this.state = {
            disabled: false,
        };
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, null);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestAllProjects();
        this.props.requestTaxonomies();
        this.props.requestSampleTypes();
        this.props.requestQuantifMethods();
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

    render() {
        let formFields = forms.makeFormFields(this.modelName, this.model, this.state.disabled, this.props.options);

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
    let options = forms.optionsFromModel(state, samplesModel);
    let formData = state.facilityDataForms.samples;
    let formModel = state.facilityDataForms.forms.samples;
    return {
        options: options,
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        feedbackWarning,
        requestAllProjects,
        requestTaxonomies,
        requestSampleTypes,
        requestQuantifMethods
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(SamplesInsertForm);

