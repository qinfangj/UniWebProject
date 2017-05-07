"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Control, Field, Form, actions} from 'react-redux-form';
import requestOptions from '../../../actions/actionCreators/optionsActionCreators';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';

import formsCss from '../../forms.css';
import css from './runs.css';
import cx from 'classnames';
// import store from '../../../../core/store';
// import validators from '../../validators';

// import * as forms from '../../forms.js';
import fields from '../../fields';

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
        //forms.newOrUpdate(this.form, this.table, this.props.updateId);
        // if (this.props.updateId) {
        //     this.setState({ disabled: true });
        // }

        // for (let field of Object.keys(runsModel)) {
        //
        // }
        //     let storeKey = this.props.storeKey;
        // if (this.props.suffix) {
        //     this.props.getConditionalOptionsListAsync(this.props.table, this.props.suffix, storeKey);
        // } else {
        //     this.props.getOptionsListAsync(this.props.table, storeKey);
        // }
        this.props.requestOptions(optionsStoreKeys.INSTRUMENTS);
    }

    componentWillReceiveProps() {
        //forms.newOrUpdate(this.form, this.table, this.props.updateId);
    }

    onSubmit() {
        //let formData = this.getFormValues();
        //forms.submit(this.table, formData, this.required, null);
    }

    activateForm() {
        //this.setState({ disabled: false });
    }

    addField() {
        let model = {...this.state.model};
        model.newField = {
            width: 5,
            type: inputTypes.CHECKBOX,
            label: "New Field",
            initValue: "AAAAA",
            required: true,
        };
        this.setState({ model: model });
    }

    render() {

        let formFields = [];
        for (let modelName of Object.keys(this.state.model)) {
            let model = this.state.model[modelName];
            let {type, initValue, optionsKey, ...otherProps} = model;
            otherProps.key = modelName;
            if (optionsKey) {
                otherProps.options = this.props.options[optionsKey];
            }
            let input = makeRRFInput(type, this.modelName + modelName, otherProps);
            formFields.push(
                <Col key={modelName} sm={model.width} className={cx(css.col)}>
                    {input}
                </Col>
            );
        }

        return (
            <Form model={this.modelName}>

                {/* <Feedback reference={this.modelName} /> */}

                {/*<form className={formsCss.form}>*/}
                {/*<Form componentClass="fieldset" horizontal>*/}


                {formFields}

                <div className="clearfix"/>

                <Button onClick={this.addField.bind(this)}>Add field</Button>

                {/* Submit */}

                {this.state.disabled ?
                    <Button action="submit" bsStyle="primary" onClick={this.activateForm.bind(this)} className={css.submitButton}>
                        Activate form
                    </Button>
                    :
                    <Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>
                        Submit
                    </Button>
                }

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
    return {
        //instrumentOptions: state.options[optionsStoreKeys.INSTRUMENTS],
        options: options,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ requestOptions }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RunsInsertFormRedux);

