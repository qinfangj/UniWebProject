"use strict";
import React from 'react';
import { Control, Field, Form, actions} from 'react-redux-form';

import formsCss from '../../forms.css';
// import css from './runs.css';
import cx from 'classnames';
// import store from '../../../../core/store';
//
// import TextField from '../../elements/TextField';
// import CheckBox from '../../elements/MyCheckBox';
// import Select from '../../elements/Select';
// import TextArea from '../../elements/Textarea';
// import DatePicker from '../../elements/DatePicker';
// import validators from '../../validators';

// import * as forms from '../../forms.js';
import fields from '../../fields';

// import * as Options from '../../subcomponents/Options';
// import PoolsForProject from '../../subcomponents/secondarySelects/PoolsForProject';
// import fields from '../../fields';
// import RunsSubForm from './RunsSubForm';
import formNames from '../../../constants/formNames';

// import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
// import Feedback from '../../../utils/Feedback';

import runsModel from './runsModel';
import { makeRRFInput } from '../../bootstrapWrappers/bs.js';


class RunsInsertFormRedux extends React.PureComponent {
    constructor() {
        super();
        this.table = "runs";
        this.form = formNames.RUNS_INSERT_FORM;
        this.required = ["ga_run_nb", "flowcell_ref_name", "lanes"];
        this.state = {
            disabled: false,
            //lanes: store.getState().common.route.data || {}
        };
    }

    componentWillMount() {
        //forms.newOrUpdate(this.form, this.table, this.props.updateId);
        // if (this.props.updateId) {
        //     this.setState({ disabled: true });
        // }
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

    render() {

        let formFields = [];
        for (let modelName of Object.keys(runsModel)) {
            let model = runsModel[modelName];
            let {type, initValue, ...otherProps} = model;
            otherProps.key = modelName;
            let input = makeRRFInput(type, "facilityDataForms.runs."+modelName, otherProps);
            formFields.push(
                <Col key={modelName} sm={model.width} className={cx(formsCss.formCol)}>
                    {input}
                </Col>
            );
        }

        return (
            <Form model="facilityDataForms.runs">

                {formFields}

            </Form>
        );
    }
}




    {/*/!*<form className={formsCss.form}>*!/*/}

    {/*/!* <Feedback reference={this.form} /> *!/*/}

    {/*/!*<Form componentClass="fieldset" horizontal>*!/*/}

    {/*{formFields}*/}

    {/*/!*</Form>*!/*/}

    {/*/!*Submit *!/*/}

    {/*{false || this.state.disabled ?*/}
        {/*<Button action="submit" bsStyle="primary" onClick={this.activateForm.bind(this)} className={css.submitButton}>*/}
            {/*Activate form*/}
        {/*</Button>*/}
        {/*:*/}
        {/*<Button action="submit" bsStyle="primary" onClick={this.onSubmit.bind(this)} className={css.submitButton}>*/}
            {/*Submit*/}
        {/*</Button>*/}
    {/*}*/}

{/*</Form>*/}

export default RunsInsertFormRedux;

