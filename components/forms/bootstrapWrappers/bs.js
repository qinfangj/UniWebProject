"use strict";
import React from 'react';
import css from './bs.css';
import formsCss from '../forms.css';
import inputTypes from '../inputTypes';
import { DEFAULT_DATE } from '../inputTypes';
import { Control, Errors } from 'react-redux-form';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox } from 'react-bootstrap/lib';

/**
 * Use React-bootstrap visual input components in React-redux-forms functional components.
 */

class BSTextInput extends React.PureComponent {
    render() {
        let {label, ...inputProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;

        return (
            <FormGroup bsSize="small" >
                {title}
                <FormControl {...inputProps} />
            </FormGroup>
        );
    }
}

class BSTextArea extends React.PureComponent {
    render() {
        let {label, ...inputProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;

        return (
            <FormGroup bsSize="small" >
                {title}
                <FormControl componentClass="textarea" {...inputProps} />
            </FormGroup>
        );
    }
}

class BSSelect extends React.PureComponent {
    render() {
        let {options, label, validationState, helpMsg, hasNoneValue, ...inputProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;
        let help = helpMsg ? <HelpBlock bsClass={formsCss.feedback}>{helpMsg}</HelpBlock> : null;
        let feedback = validationState !== null ? <FormControl.Feedback /> : null;

        options = options ? options.map((v,i) => {
            return <option value={v[0]} key={i}>{v[1]}</option>;
        }) : [];
        if (hasNoneValue && options) { options.unshift(<option value={-1} key="-">{'-'}</option>); }

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
                {feedback}
                {help}
            </FormGroup>
        );
    }
}
BSSelect.defaultProps = {
    hasNoneValue: true,
};

class BSDate extends React.PureComponent {
    render() {
        let {label, ...inputProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;

        return (
            <FormGroup bsSize="small" >
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
        let {label, ...inputProps} = this.props;
        return (
            <FormGroup bsSize="small">
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


export function makeRRFInput(type, modelName, otherProps) {
    let component;
    let {required, validators, errors, errorMessages, updateOn, validateOn, ...inputProps} = otherProps;
    let showError = (type === inputTypes.DROPDOWN) ? {touched: true, focus: false} : true;

    if (type === inputTypes.TEXT) {
        component = BSTextInput;
    } else if (type === inputTypes.CHECKBOX) {
        component = BSCheckbox;
    } else if (type === inputTypes.DROPDOWN || type === inputTypes.SEC_DROPDOWN) {
        component = BSSelect;
        required = required ? (v) => v !== -1 : undefined;
        validators = required ? {required: (v) => v !== -1} : undefined;
    } else if (type === inputTypes.TEXTAREA) {
        component = BSTextArea;
    } else if (type === inputTypes.DATE) {
        component = BSDate;
    } else {
        throw "Unknown input type: '"+ type +"'";
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
                show={showError}
                messages={errorMessages || {required: "Required"}}
            />
        </div>
    );

}

