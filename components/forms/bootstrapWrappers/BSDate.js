"use strict";
import React from 'react';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';
import { DEFAULT_DATE } from '../inputTypes';


export default class BSDate extends React.PureComponent {
    render() {
        let {label, submissionError, value, ...inputProps} = this.props;
        let title = makeLabel(label, this.props.required);
        let validationState = submissionError ? "error" : this.props.validationState;
        value = value || "";

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl
                    type="date"
                    value={value}
                    {...inputProps}
                />
            </FormGroup>
        );
    }
}
