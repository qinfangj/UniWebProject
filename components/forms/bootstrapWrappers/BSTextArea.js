"use strict";
import React from 'react';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


export default class BSTextArea extends React.PureComponent {
    render() {
        let {label, isRequired, submissionError, value, ...inputProps} = this.props;
        let title = makeLabel(label, isRequired);
        let validationState = submissionError ? "error" : this.props.validationState;
        value = value || "";

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl componentClass="textarea" value={value} {...inputProps} />
            </FormGroup>
        );
    }
}
