"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { makeLabel } from './bs';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


export default class BSSelect extends React.PureComponent {

    static propTypes = {
        hasNoneValue: PropTypes.bool, // whether the field has a default "-" option with value "".
    };

    render() {
        let {value, isRequired, options, label, submissionError, hasNoneValue, ...inputProps} = this.props;
        let title = makeLabel(label, isRequired);
        let validationState = submissionError ? "error" : this.props.validationState;

        // Turn [1, "a"]s into <option>s.
        let opts = options ? options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        }) : [];

        // Add the "-" default option.
        if (options && hasNoneValue) {
            opts.unshift(<option value="" key="-">{'-'}</option>);
        }

        value = value || "";

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl
                    componentClass="select"
                    placeholder={label}
                    value={value}
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

