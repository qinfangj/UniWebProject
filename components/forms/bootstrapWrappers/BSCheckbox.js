"use strict";
import React from 'react';
import formsCss from '../forms.css';
import { FormGroup, Checkbox } from 'react-bootstrap/lib';


export default class BSCheckbox extends React.PureComponent {
    render() {
        let {label, submissionError, ...inputProps} = this.props;
        let validationState = submissionError ? "error" : this.props.validationState;

        return (
            <FormGroup validationState={validationState} bsSize="small">
                <Checkbox
                    className={formsCss.checkbox}
                    {...inputProps}
                >
                    <div className={formsCss.checkboxLabel}>{label}</div>
                </Checkbox>
            </FormGroup>
        );
    }
}

