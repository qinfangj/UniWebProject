"use strict";
import React from 'react';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


export default class BSSelect extends React.PureComponent {

    render() {
        let {options, label, submissionError, hasNoneValue, ...inputProps} = this.props;
        let title = makeLabel(label, this.props.required);
        let validationState = submissionError ? "error" : this.props.validationState;

        let opts = options ? options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        }) : [];

        if (options && options.length === 1) {
            this.props.value = options[0][0];
        } else if (options && hasNoneValue) {
            opts.unshift(<option value="" key="-">{'-'}</option>);
        }

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl
                    componentClass="select"
                    placeholder={label}
                    {...inputProps}
                >
                    {opts}
                </FormControl>
            </FormGroup>
        );
    }
}

BSSelect.defaultProps = {
    hasNoneValue: true,
};

