"use strict";
import React from 'react';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


export default class BSTextInput extends React.PureComponent {
    render() {
        let {value, isRequired, label, submissionError, ...inputProps} = this.props;
        let title = makeLabel(label, isRequired);
        let validationState = submissionError ? "error" : this.props.validationState;
        value = value || "";

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl value={value} {...inputProps} />
            </FormGroup>
        );
    }
}

