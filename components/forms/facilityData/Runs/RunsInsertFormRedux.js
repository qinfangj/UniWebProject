"use strict";
import React from 'react';
import formsCss from '../../forms.css';
import css from './runs.css';
import cx from 'classnames';
import store from '../../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, actions} from 'react-redux-form';
import { requestInstruments,
         requestFlowcellTypes,
         requestRunsTypesLengths,
         requestSequencingKitVersions } from '../../../actions/actionCreators/optionsActionCreators';
import { requestLibrariesForProject } from '../../../actions/actionCreators/secondaryOptionsActionCreators';
import * as forms from '../../forms.js';
import RunsSubForm from './RunsSubFormRedux';
import formNames from '../../../constants/formNames';
import runsModel from './runsModel';
import RFFInput from '../../bootstrapWrappers/RFFInput.js';

import {Button, Col, Alert} from 'react-bootstrap/lib';


class RunsInsertFormRedux extends React.PureComponent {
    constructor() {
        super();
        this.table = "runs";
        this.modelName = "facilityDataForms.runs";
        this.state = {
            disabled: false,
        };
    }

    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId, this.onUpdated.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestInstruments();
        this.props.requestSequencingKitVersions();
        this.props.requestRunsTypesLengths();
        this.props.requestFlowcellTypes();
    }

    /**
     * When the update data comes, trigger the action to get libraries options lists
     * corresponding to the received projectIds (see newOrUpdate2 in componentWillMount).
     */
    onUpdated() {
      for (let laneNb of Object.keys(this.props.formData.lanes)) {
          let libs = this.props.formData.lanes[laneNb].libs;
          for (let k=0; k < libs.length; k++) {
              let projectModelName = `${this.modelName}.lanes[${laneNb}].libs[${k}].projectId`;
              this.props.requestLibrariesForProject(projectModelName, libs[k].projectId);
          }
      }
    }

    postSubmit(values) {
        // Ex: http://codepen.io/davidkpiano/pen/c683e0cf7ee54736b49b2ce30aba956f?editors=0010
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), 0);
        });
    }

    onSubmit(values) {
        console.info("Submitted values: ", values);
        store.dispatch(actions.submit(this.modelName, this.postSubmit(values)));
        //let formData = this.getFormValues();
        //forms.submit(this.table, formData, this.required, null);
    }

    activateForm() {
        this.setState({ disabled: false });
    }

    render() {
        let formModel = this.props.formModel;
        let formFields = [];
        for (let modelName of Object.keys(runsModel)) {
            let model = runsModel[modelName];
            let {inputType, optionsKey, ...otherProps} = model;
            otherProps.key = modelName;
            otherProps.disabled = model.disabled || this.state.disabled;
            otherProps.submissionError = formModel[modelName].submitFailed && formModel[modelName].validated && (! formModel[modelName].valid);
            if (optionsKey) {
                otherProps.options = this.props.options[optionsKey];
            }
            formFields.push(
                <Col key={modelName} sm={model.width} className={cx(css.col)}>
                    <RFFInput inputType={inputType} modelName={this.modelName +'.'+ modelName} {...otherProps} />
                </Col>
            );
        }

        return (
            <div>

                <Alert bsStyle="info">Not ready yet</Alert>

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {/* <Feedback reference={this.modelName} /> */}

                    {formFields}

                    <div className="clearfix"/>

                    {/* Sub-form */}

                    <div className="clearfix"/>

                    <RunsSubForm disabled={this.state.disabled} />

                    {/* Submit */}

                    {this.state.disabled ?
                        <Button action="submit" bsStyle="primary" onClick={this.activateForm.bind(this)} className={css.submitButton}>
                            Activate form
                        </Button>
                        :
                        <Button type="submit" bsStyle="primary" className={css.submitButton}>
                            Submit
                        </Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(RunsInsertFormRedux);

