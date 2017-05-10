"use strict";
import React from 'react';
import store from '../../../../core/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Control, Field, Form, actions} from 'react-redux-form';
import { requestInstruments, requestFlowcellTypes, requestRunsTypesLengths, requestSequencingKitVersions } from '../../../actions/actionCreators/optionsActionCreators';
// import optionsStoreKeys from '../../../constants/optionsStoreKeys';

import formsCss from '../../forms.css';
import css from './runs.css';
import cx from 'classnames';
// import store from '../../../../core/store';
// import validators from '../../validators';

import * as forms from '../../forms.js';
// import fields from '../../fields';

// import * as Options from '../../subcomponents/Options';
// import PoolsForProject from '../../subcomponents/secondarySelects/PoolsForProject';
// import fields from '../../fields';
// import RunsSubForm from './RunsSubForm';
import formNames from '../../../constants/formNames';

import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
// import Feedback from '../../../utils/Feedback';

import runsModel from './runsModel';
import { makeRRFInput } from '../../bootstrapWrappers/bs.js';
import inputTypes from '../../inputTypes';


class RunsInsertFormRedux extends React.PureComponent {
    constructor() {
        super();
        this.table = "runs";
        this.form = formNames.RUNS_INSERT_FORM;
        this.required = ["ga_run_nb", "flowcell_ref_name", "lanes"];
        this.modelName = "facilityDataForms.runs";
        this.state = {
            disabled: false,
            model: runsModel,
            //lanes: store.getState().common.route.data || {}
        };
    }

    componentWillMount() {
        forms.newOrUpdate2(this.modelName, this.table, this.props.updateId);
        if (this.props.updateId) {
            this.setState({ disabled: true });
        }
        this.props.requestInstruments();
        this.props.requestSequencingKitVersions();
        this.props.requestRunsTypesLengths();
        this.props.requestFlowcellTypes();
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

    addField() {
        let model = {...this.state.model};
        model.newField = {
            width: 5,
            type: inputTypes.CHECKBOX,
            label: "New Field",
            initValue: "AAAAA",
        };
        this.setState({ model: model });
    }

    render() {
        console.debug(this.props.formData)
        console.debug(this.props.formModel)
        let formData = this.props.formData;
        let formModel = this.props.formModel;

        let formFields = [];
        for (let modelName of Object.keys(this.state.model)) {
            let model = this.state.model[modelName];
            let {type, initValue, optionsKey, ...otherProps} = model;
            otherProps.key = modelName;
            otherProps.disabled = model.disabled || this.state.disabled;
            otherProps.submissionError = formModel[modelName].submitFailed && formModel[modelName].validated && (! formModel[modelName].valid);
            if (optionsKey) {
                otherProps.options = this.props.options[optionsKey];
            }
            let input = makeRRFInput(type, this.modelName +'.'+ modelName, otherProps);
            formFields.push(
                <Col key={modelName} sm={model.width} className={cx(css.col)}>
                    {input}
                </Col>
            );
        }

        return (
            <Form model={this.modelName} onSubmit={this.onSubmit.bind(this)} >

                {/* <Feedback reference={this.modelName} /> */}

                {formFields}

                <div className="clearfix"/>

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

                {/* Sub-form */}

                <div className="clearfix"/>

                <Button onClick={this.addField.bind(this)}>Add field</Button>

            </Form>
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
        }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RunsInsertFormRedux);

