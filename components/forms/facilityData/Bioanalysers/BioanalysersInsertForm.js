"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import formsCss from '../../forms.css';
import RestService from '../../../../utils/RestService';

import store from '../../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { feedbackWarning } from '../../../actions/actionCreators/feedbackActionCreators';

import formNames from '../../../constants/formNames';
import downloadPdf from '../../../../utils/downloadPdf';
import bioanalysersModel from '../formModels/bioanalysersModel';
import * as forms from '../../forms.js';

import LanesSubForm from './LanesSubForm';
import { Form } from 'react-redux-form';
import Button from 'react-bootstrap/lib/Button';
import Feedback from '../../../utils/Feedback';


class BioanalysersInsertForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "bioanalysers";
        this.form = formNames.BIOANALYSERS_INSERT_FORM;
        this.modelName = "facilityDataForms.bioanalysers";
        this.model = bioanalysersModel;
        this.state = {
            disabled: false,
        }
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, null);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
    }

    getPdf() {
        RestService.bioanalyserPdf(this.props.updateId).then((blob) => downloadPdf(blob));
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

    // formatLanesForSubmit() {
    //     let values = this.props.lanesValues;
    //     let lanesInfo = this.props.lanesInfo.map((lane) => {
    //         let laneNb = lane.laneNb;
    //         return {
    //             id: lane.id,
    //             laneNb: laneNb,
    //             projectId: values[fields.PROJECT_ID +"_"+ laneNb],   // cannot use just lane.projectId in case of new insert
    //             libraryId: values[fields.LIBRARY_ID +"_"+ laneNb],   // same
    //             comment: lane.comment || "",
    //         };
    //     });
    //     return lanesInfo;
    // }

    // /**
    //  * Use this to add lanes info - nothing to validate there anyway.
    //  */
    // formatFormData(formData) {
    //     let lanesInfo = this.formatLanesForSubmit();
    //     formData["lanes"] = lanesInfo;
    //     formData["file"] = btoa(formData[fields.BIOANALYSER_FILE].file);
    //     formData["filename"] = formData[fields.BIOANALYSER_FILE].filename;
    //     return formData;
    // }

    render() {
        let pdfName = this.props.pdf ? this.props.pdf.filename : "";
        let pdf = this.props.updateId ?
            <span>{"Current file: "}<a href="javascript:void(0);"
                                       onClick={this.getPdf.bind(this)}>{pdfName}</a>
            </span> : null;

        let formFields = forms.makeFormFields(this.modelName, this.model, this.state.disabled, this.props.options);

        return (
            <div>

                <Feedback reference={this.form} />

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {formFields}

                    {/* Lanes sub form */}

                    <LanesSubForm disabled={this.state.disabled}/>

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


// const mapStateToProps = (state, ownProps) => {
//     let thisFrom = formNames.BIOANALYSERS_INSERT_FORM;
//     let subForm = formNames.BIOANALYSERS_LANES_INSERT_FORM;
//     let pdf = state.forms[thisFrom][fields.BIOANALYSER_FILE];
//     let lanesInfo = state.forms[thisFrom]["lanes"] || [];
//     let lanesValues = state.forms[subForm] || {};
//     return {
//         lanesInfo: lanesInfo,
//         lanesValues: lanesValues,
//         pdf: pdf,
//     };
// };

const mapStateToProps = (state) => {
    let formData = state.facilityDataForms.bioanalysers;
    let formModel = state.facilityDataForms.forms.bioanalysers;
    return {
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        feedbackWarning,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(BioanalysersInsertForm);

