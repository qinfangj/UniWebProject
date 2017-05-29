"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import formsCss from '../forms.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';

import { feedbackWarning } from '../../actions/actionCreators/feedbackActionCreators';
import { requestTaxonomies } from '../../actions/actionCreators/optionsActionCreators';

import * as forms from '../forms.js';
import formNames from '../../constants/formNames';
import genomesModel from './formModels/genomesModel';

import Button from 'react-bootstrap/lib/Button';
import Feedback from '../../utils/Feedback';



class GenomesInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "genomes";
        this.form = formNames.GENOMES_INSERT_FORM;
        this.modelName = "facilityDataForms.genomes";
        this.model = genomesModel;
        this.state = {
            disabled: false,
        };
    }


    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId, null);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestTaxonomies();
    }

    formatInsertData(values) {
        let insertData = forms.formatFormFieldsDefault(this.model, values);
        return insertData;
    }

    validate(insertData) {
        return {
            isValid: true,
            message: "",
        }
    }

    onSubmit(values) {
        let insertData = this.formatInsertData(values);
        let validation = this.validate(insertData);
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
    let options = forms.optionsFromModel(state, genomesModel);
    let formData = state.facilityDataForms.genomes;
    let formModel = state.facilityDataForms.forms.genomes;
    return {
        options: options,
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        feedbackWarning,
        requestTaxonomies,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(GenomesInsertForm);

