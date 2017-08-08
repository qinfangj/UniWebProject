"use strict";
import React from 'react';
import css from './bioanalysers.css';
import RestService from '../../../../utils/RestService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';

import formNames from '../../../constants/formNames';
import bioanalysersModel from '../formModels/bioanalysersModel';
import * as forms from '../../forms.js';

import LanesSubForm from './lanesSubForm';
import { Form } from 'react-redux-form';
import { Col } from 'react-bootstrap/lib';
import SubmitButton from '../../SubmitButton';
import * as feedback from '../../../../utils/feedback';


class BioanalysersInsertForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.table = "bioanalysers";
        this.modelName = "facilityDataForms.bioanalysers";
        this.model = bioanalysersModel;
        this.state = {
            disabled: false,
            bioanalyserUrl: null,
        };
        this.activateForm = this.activateForm.bind(this);
        this.deactivateForm = this.deactivateForm.bind(this);
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, this.onUpdateLoadLibsOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });

            /*
             * Load new PDF storage format (formDataUrl) directly for display,
             * or receive a old Blob and make a formDataUrl from it.
             */
            RestService.bioanalyserPdf(this.props.updateId).then((b64orBlob) => {
                console.log(b64orBlob.slice(0, 100))
                if (b64orBlob.slice(0,100).startsWith("data:application/pdf;base64")) {
                    console.log("New format, load directly")
                    this.setState({ bioanalyserUrl: b64orBlob })
                } else {
                    console.log("Old format, convert to BLOB")
                    // convert downloaded data to a Blob
                    console.log(b64orBlob.data)
                    let blob = new Blob([b64orBlob.data], { type: 'application/pdf' });
                    // create an object URL from the Blob
                    let URL = window.URL || window.webkitURL;
                    let downloadUrl = URL.createObjectURL(blob);
                    this.setState({ bioanalyserUrl: downloadUrl })
                }
            });
        }
    }

    /**
     * When the update *data* comes, trigger the action to get libraries options lists
     * corresponding to the received projectIds (see newOrUpdate in componentWillMount).
     */
    onUpdateLoadLibsOptions(data) {
        for (let laneNb of Object.keys(data.lanes)) {
            let lane = data.lanes[laneNb];
            let projectModelName = `${this.modelName}.lanes[${laneNb}].projectId`;
            this.props.requestLibrariesForProject(projectModelName, lane.projectId);
        }
    }

    /**
     * Cast numeric values before we can submit. RRF apparently uses only strings and booleans.
     * Transform lanes object into an array of lanes, and add `laneNb` property.
     */
    formatInsertData(values) {
        let insertData = forms.formatFormFieldsDefault(bioanalysersModel, values);
        // Transform lanes object into an array of lanes, add laneNb
        let lanes = [];
        for (let laneNb of Object.keys(insertData.lanes)) {
            let lane = insertData.lanes[laneNb];
            lane.id = lane.id || 0;
            lane.laneNb = parseInt(laneNb);
            lane.projectId = parseInt(lane.projectId);
            lane.libraryId = parseInt(lane.libraryId);
            lanes.push(lane);
        }
        insertData.lanes = lanes;
        return insertData;
    }

    onSubmit(values) {
        if (!values.lanes || Object.keys(values.lanes).length === 0) {
            feedback.warning("At least one lane is required.", "BioanalysersInsertForm::onSubmit");
        } else if (this.fileInput.files.length === 0) {
            feedback.warning("Bioanalyser file is required", "BioanalysersInsertForm::onSubmit");
        } else {
            let file = this.fileInput.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let insertData = this.formatInsertData(values);
                let validation = forms.validateFormDefault(insertData);
                if (validation.isValid) {
                    insertData.file = reader.result;
                    insertData.filename = this.fileInput.value;
                    forms.submitForm(this.modelName, insertData, this.table);
                } else {
                    feedback.warning(validation.message, "RunsInsertForm::onSubmit");
                }
            }
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
        let downloadLink = null;
        let embeddedPdf = null;
        if (this.state.bioanalyserUrl && this.props.formData["filename"]) {
            let filename = this.props.formData["filename"].split("\\").slice(-1)[0];
            downloadLink = <a className={css.bioanalyserUrl} href={this.state.bioanalyserUrl}>{filename}</a>;
            embeddedPdf = (
                <object className={css.pdfPreview} data={this.state.bioanalyserUrl} type="application/pdf" width="600px" height="300px">
                    <embed src={this.state.bioanalyserUrl}>
                    </embed>
                </object>
            );
        }

        return (
            <div>

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {/* File input */}

                    <Col sm={5}>
                        <label style={{paddingTop: "7px"}}>
                            {this.props.updateId ? "Replace bioanalyser file " : "Bioanalyser file"}
                        </label>
                        {downloadLink}
                        <input
                            type="file" required disabled={this.state.disabled}
                            ref = {c => {this.fileInput = c;}}
                        />
                        {embeddedPdf}
                    </Col>

                    {/* If update, make space for the file name and pdf viewer */
                        this.props.updateId ? <div className="clearfix"/> : null
                    }

                    {formFields}

                    {/* Lanes sub form */}

                    <LanesSubForm disabled={this.state.disabled}/>

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
    let formData = state.facilityDataForms.bioanalysers;
    let formModel = state.facilityDataForms.forms.bioanalysers;
    return {
        formData: formData,
        formModel: formModel,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestLibrariesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(BioanalysersInsertForm);

