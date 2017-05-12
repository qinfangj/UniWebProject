"use strict";
import React from 'react';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';
import { DEFAULT_DATE } from '../inputTypes';


export default class BSDate extends React.PureComponent {
    render() {
        let {label, submissionError, ...inputProps} = this.props;
        let title = makeLabel(label, this.props.required);
        let validationState = submissionError ? "error" : this.props.validationState;

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl
                    type="date"
                    {...inputProps}
                />
            </FormGroup>
        );
    }
}
