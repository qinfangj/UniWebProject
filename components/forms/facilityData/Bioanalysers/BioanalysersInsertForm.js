"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import formsCss from '../../forms.css';
import RestService from '../../../../utils/RestService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import { feedbackWarning } from '../../../actions/actionCreators/feedbackActionCreators';

import formNames from '../../../constants/formNames';
import downloadPdf from '../../../../utils/downloadPdf';
import bioanalysersModel from '../formModels/bioanalysersModel';
import * as forms from '../../forms.js';
import fields from '../../../constants/fields';

import LanesSubForm from './LanesSubForm';
import { Form } from 'react-redux-form';
import { Col, Button } from 'react-bootstrap/lib';
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
            bioanalyserUrl: null,
        }
    }

    componentWillMount() {
        forms.newOrUpdate(this.modelName, this.table, this.props.updateId, this.onUpdateLoadLibsOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
            RestService.bioanalyserPdf(this.props.updateId).then((b64) => {
                // let blob = b64.replace(/^[^,]+,/, '');
                // let blob = b64.replace("data:application/pdf;base64,", "");
                // blob = blob.replace(/\s/g, '');
                let blob = atob(b64);
                console.log(blob.slice(0,200));
                let file = new Blob([blob], {type: 'application/pdf'});

                // let URL = window.URL || window.webkitURL;
                // let downloadUrl = URL.createObjectURL(file);
                // let downloadLink      = document.createElement('a');
                // downloadLink.target   = '_blank';
                // downloadLink.download = "bioanlyser.pdf";
                // // set object URL as the anchor's href
                // downloadLink.href = downloadUrl;
                // // append the anchor to document body
                // document.body.append(downloadLink);
                // // fire a click event on the anchor
                // downloadLink.click();
                // // cleanup: remove element and revoke object URL
                // document.body.removeChild(downloadLink);
                // URL.revokeObjectURL(downloadUrl);

                let fileURL = window.URL.createObjectURL(file);
                this.setState({ bioanalyserUrl: fileURL })
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

    getPdf() {
        RestService.bioanalyserPdf(this.props.updateId).then((blob) => downloadPdf(blob));
    }

    getPdf2() {
        let file = this.fileInput.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            downloadPdf(file);
        };
    }

    testFileInput() {
        let file = this.fileInput.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result.slice(200));
            // downloadPdf(file);
            // window.open(file)
        };
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
        if (this.fileInput.files.length > 0) {
            let file = this.fileInput.files[0];
            let reader = new FileReader();
            reader.readAsBinaryString(file);  // encode to base64
            reader.onload = () => {
                let insertData = this.formatInsertData(values);
                let validation = forms.validateFormDefault(insertData);
                if (validation.isValid) {
                    insertData.file = btoa(reader.result);  // application/pdf
                    insertData.filename = this.fileInput.value;
                    forms.submitForm(this.modelName, insertData, this.table, this.form);
                } else {
                    this.props.feedbackWarning(this.form, validation.message);
                }
            }
        } else {
            this.props.feedbackWarning(this.form, "Bioanalyser file is required");
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
        if (this.state.bioanalyserUrl) {
            let filename = this.props.formData["filename"];
            downloadLink = <a href={this.state.bioanalyserUrl}>{filename}</a>
        }
        console.log(333, downloadLink, this.state.bioanalyserUrl)

        return (
            <div>

                <Feedback reference={this.form} />

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    <Col sm={4}>
                        <label style={{paddingTop: "7px"}}>
                            {this.props.updateId ? "Replace bioanalyser file" : "Bioanalyser file"}
                        </label>
                        {downloadLink}
                        <input
                            type="file" required disabled={this.state.disabled}
                            ref = {c => {this.fileInput = c;}}
                        />
                    </Col>

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

                    <Button onClick={this.testFileInput.bind(this)}>Test file input</Button>
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
        feedbackWarning,
        requestLibrariesForProject,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(BioanalysersInsertForm);

