"use strict";
import React from 'react';
import css from './bs.css';
import formsCss from '../forms.css';
import inputTypes from '../inputTypes';
import { DEFAULT_DATE } from '../inputTypes';
import { Control, Errors } from 'react-redux-form';
import { FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap/lib';

/**
 * Use React-bootstrap visual input components in React-redux-forms functional components.
 */


function makeLabel(label, required) {
    let star = required ? <span className={css.requiredStar}>*</span> : null;
    return label ? <ControlLabel>{label}{star}</ControlLabel> : null;
}


class BSTextInput extends React.PureComponent {
    render() {
        let {label, submissionError, ...inputProps} = this.props;
        let title = makeLabel(label, this.props.required);
        let validationState = submissionError ? "error" : this.props.validationState;

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl {...inputProps} />
            </FormGroup>
        );
    }
}

class BSTextArea extends React.PureComponent {
    render() {
        let {label, submissionError, ...inputProps} = this.props;
        let title = makeLabel(label, this.props.required);
        let validationState = submissionError ? "error" : this.props.validationState;

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl componentClass="textarea" {...inputProps} />
            </FormGroup>
        );
    }
}

class BSSelect extends React.PureComponent {
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

class BSDate extends React.PureComponent {
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

class BSCheckbox extends React.PureComponent {
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


export function makeRRFInput(inputType, modelName, otherProps) {
    let component;
    let {required, validators, errors, errorMessages, updateOn, validateOn, ...inputProps} = otherProps;

    if (inputType === inputTypes.TEXT) {
        component = BSTextInput;
    } else if (inputType === inputTypes.CHECKBOX) {
        component = BSCheckbox;
    } else if (inputType === inputTypes.DROPDOWN || inputType === inputTypes.SEC_DROPDOWN) {
        component = BSSelect;
    } else if (inputType === inputTypes.TEXTAREA) {
        component = BSTextArea;
    } else if (inputType === inputTypes.DATE) {
        component = BSDate;
    } else {
        throw "Unknown input type: '"+ inputType +"'";
    }

    return (
        <div>
            <Control
                className={formsCss.input}
                component={component}
                model={modelName}
                required={required}
                validators={validators}
                errors={errors}
                updateOn={updateOn || "change"}
                validateOn={validateOn || "change"}
                ignore={['focus', 'blur']}
                {...inputProps}
            />
            <Errors
                className={css.errors}
                model={modelName}
                show={true}
                messages={errorMessages || {required: "Required"}}
            />
        </div>
    );

}

