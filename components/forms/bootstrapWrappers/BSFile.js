"use strict";
import React from 'react';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


export default class BSFile extends React.PureComponent {
    render() {
        let {label, isRequired, submissionError, ...inputProps} = this.props;
        let title = makeLabel(label, isRequired);
        let validationState = submissionError ? "error" : this.props.validationState;

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl type="file" {...inputProps} />
            </FormGroup>
        );
    }
}
