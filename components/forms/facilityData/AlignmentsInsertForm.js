"use strict";
import React from 'react';
import formsCss from '../forms.css';
import cx from 'classnames';
import store from '../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, actions } from 'react-redux-form';
import { requestPipelineAnalysisTypes,
         requestRunsOutputFolders,
         requestMappingTools } from '../../actions/actionCreators/optionsActionCreators';
import { requestBasecallingsForRun } from '../../actions/actionCreators/secondaryOptionsActionCreators';
import * as forms from '../forms.js';
import fields from '../fields';
import formNames from '../../constants/formNames';
import { Button } from 'react-bootstrap/lib';
import alignmentsModel from './formModels/alignmentsModel';
import Feedback from '../../utils/Feedback';



class AlignmentsInsertForm extends React.PureComponent {
    constructor() {
        super();
        this.table = "alignments";
        this.form = formNames.ALIGNMENTS_INSERT_FORM;
        this.model = alignmentsModel;
        this.modelName = "facilityDataForms.alignments";
        this.state = {
            disabled: false,
        };
    }

    static propTypes = {
        // If defined, the form will be pre-filled with the current data for the item with this ID,
        //  after fetching it on the server.
        updateId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    };

    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId, this.onUpdateLoadBasecallingsOptions.bind(this));
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestPipelineAnalysisTypes();
        this.props.requestRunsOutputFolders();
        this.props.requestMappingTools();
    }

    /**
     * When the update *data* comes, trigger the action to get libraries options lists
     * corresponding to the received runId (see newOrUpdate2 in componentWillMount).
     */
    onUpdateLoadBasecallingsOptions(data) {
        let refModelName = this.modelName +'.'+ fields.RUN_ID;
        this.props.requestBasecallingsForRun(refModelName, data[fields.RUN_ID]);
    }

    onSubmit(values) {
        let insertData = forms.formatFormFieldsDefault(this.model, values);
        forms.submitForm(this.modelName, insertData, this.table, this.form);
    }

    activateForm() {
        this.setState({ disabled: false });
    }
    deactivateForm() {
        this.setState({ disabled: true });
    }

    onRunChange(model, value) {
        store.dispatch(actions.change(model, value));
        this.props.requestBasecallingsForRun(model, value);
    }
    
    render() {
        let changeActions = {[fields.RUN_ID]: this.onRunChange.bind(this)};
        let formFields = forms.makeFormFields(this.modelName, this.model, this.state.disabled, this.props.options, changeActions);

        return (

            <div>

                <Feedback reference={this.form} />

                <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                    {/* <Feedback reference={this.modelName} /> */}

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
    let options = {};
    let formModel = alignmentsModel;
    for (let field of Object.keys(formModel)) {
        let model = formModel[field];
        if (model.optionsKey) {
            options[model.optionsKey] = state.options[model.optionsKey] || [];
        }
    }
    let formData = state.facilityDataForms.alignments;
    return {
        formData: formData,
        options: options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestPipelineAnalysisTypes,
        requestRunsOutputFolders,
        requestMappingTools,
        requestBasecallingsForRun,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(AlignmentsInsertForm);

