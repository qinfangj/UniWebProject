"use strict";
import React from 'react';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


export default class BSSelect extends React.PureComponent {

    render() {
        let {options, label, submissionError, hasNoneValue, ...inputProps} = this.props;
        let title = makeLabel(label, this.props.required);
        let validationState = submissionError ? "error" : this.props.validationState;

        options = options ? options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        }) : [];
        if (hasNoneValue && options) { options.unshift(<option value="" key="-">{'-'}</option>); }

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl
                    componentClass="select"
                    placeholder={label}
                    {...inputProps}
                >
                    {options}
                </FormControl>
            </FormGroup>
        );
    }
}

BSSelect.defaultProps = {
    hasNoneValue: true,
};

