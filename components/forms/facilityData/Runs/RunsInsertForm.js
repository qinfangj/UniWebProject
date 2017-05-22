"use strict";
import React from 'react';
import formsCss from '../../forms.css';
import css from './runs.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-redux-form';
import { requestInstruments,
         requestFlowcellTypes,
         requestRunsTypesLengths,
         requestSequencingKitVersions } from '../../../actions/actionCreators/optionsActionCreators';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import * as forms from '../../forms.js';
import LanesSubForm from './LanesSubForm';
import formNames from '../../../constants/formNames';
import runsModel from './runsModel';
import Feedback from '../../../utils/Feedback';
import {Button, Alert} from 'react-bootstrap/lib';


class RunsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "runs";  // db table for insert
        this.form = formNames.RUNS_INSERT_FORM;  // for the feedback
        this.modelName = "facilityDataForms.runs";  // to track form data
        this.state = {
            disabled: false,
        };
    }

    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId, this.onUpdateLoadLibsOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestInstruments();
        this.props.requestSequencingKitVersions();
        this.props.requestRunsTypesLengths();
        this.props.requestFlowcellTypes();
    }

    /**
     * When the update *data* comes, trigger the action to get libraries options lists
     * corresponding to the received projectIds (see newOrUpdate2 in componentWillMount).
     */
    onUpdateLoadLibsOptions(data) {
      for (let laneNb of Object.keys(data.lanes)) {
          let libs = this.props.formData.lanes[laneNb].libs;
          for (let k=0; k < libs.length; k++) {
              let projectModelName = `${this.modelName}.lanes[${laneNb}].libs[${k}].projectId`;
              this.props.requestLibrariesForProject(projectModelName, libs[k].projectId);
          }
      }
    }

    /**
     * Cast numeric values before we can submit. RRF apparently uses only strings and booleans.
     */
    formatInsertData(values) {
        let insertData = _.cloneDeep(values);  // because `values` is immutable
        insertData.gaRunNb = parseInt(insertData.gaRunNb);
        for (let laneNb of Object.keys(insertData.lanes)) {
            insertData.lanes[laneNb].laneNb = parseInt(laneNb);
            for (let k in insertData.lanes[laneNb].libs) {
                let lib = insertData.lanes[laneNb].libs[k];
                lib.projectId = parseInt(lib.projectId);
                lib.libraryId = parseInt(lib.libraryId);
                lib.quantityLoaded = parseFloat(lib.quantityLoaded);
                lib.qualityId = parseInt(lib.qualityId);
                lib.isQCLib = lib.isQCLib || false;
            }
        }
        return insertData;
    }

    /**
     * Submit the form for insert/update.
     *
     * Ideally, use RRF system to mark the form as submitted:
     * ```store.dispatch(actions.submit(this.modelName, this.submit(insertData)));```
     * - If `this.submit(values)` fails, sets `.submitFailed` and `.errors` on the model.
     * - If it succeeds, set `.submitted` and `.validity` on the model.
     *  Ex: http://codepen.io/davidkpiano/pen/c683e0cf7ee54736b49b2ce30aba956f?editors=0010
     * But I can't understand it, so let's do it simpler for now.
     **/
    onSubmit(values) {
        let insertData = this.formatInsertData(values);
        forms.submitForm(this.modelName, insertData, this.table, this.form);
    }

    activateForm() {
        this.setState({ disabled: false });
    }
    deactivateForm() {
        this.setState({ disabled: true });
    }

    render() {
        let formFields = forms.makeFormFields(this.modelName, runsModel, this.state.disabled, this.props.options);

        return (
            <div>

                <Feedback reference={this.form} />

                <Alert bsStyle="info">Backend is not ready yet to handle updates correctly</Alert>

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {/* <Feedback reference={this.modelName} /> */}

                    {formFields}

                    {/* Sub-form */}

                    <div className="clearfix"/>

                    <LanesSubForm disabled={this.state.disabled} />

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
    let options = {};
    for (let field of Object.keys(runsModel)) {
        let model = runsModel[field];
        if (model.optionsKey) {
            options[model.optionsKey] = state.options[model.optionsKey] || [];
        }
    }
    let formData = state.facilityDataForms.runs;
    let formModel = state.facilityDataForms.forms.runs;
    return {
        formData: formData,
        formModel: formModel,
        options: options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestInstruments,
        requestFlowcellTypes,
        requestRunsTypesLengths,
        requestSequencingKitVersions,
        requestLibrariesForProject,
        }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RunsInsertForm);

