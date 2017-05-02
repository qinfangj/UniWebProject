"use strict";
import React from 'react';
import css from '../forms.css';
import inputTypes from '../inputTypes';
import { DEFAULT_DATE } from '../inputTypes';
import { Control } from 'react-redux-form';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox } from 'react-bootstrap/lib';

/**
 * Use React-bootstrap visual input components in React-redux-forms functional components.
 */

class BSTextInput extends React.PureComponent {
    render() {
        let {label, ...otherProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;

        return (
            <FormGroup>
                {title}
                <FormControl bsSize="small" {...otherProps} />
            </FormGroup>
        );
    }
}

class BSTextArea extends React.PureComponent {
    render() {
        let {label, ...otherProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;

        return (
            <FormGroup>
                {title}
                <FormControl componentClass="textarea" bsSize="small" {...otherProps} />
            </FormGroup>
        );
    }
}

class BSSelect extends React.PureComponent {
    render() {
        let {options, label, validationState, helpMsg, ...otherProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;
        let help = helpMsg ? <HelpBlock bsClass={css.feedback}>{helpMsg}</HelpBlock> : null;
        let feedback = validationState !== null ? <FormControl.Feedback /> : null;

        return (
            <FormGroup validationState={validationState} bsSize="small" >
                {title}
                <FormControl
                    componentClass="select"
                    placeholder={label}
                    {...otherProps}
                >
                {options}
                </FormControl>
                {feedback}
                {help}
            </FormGroup>
        );
    }
}

class BSDate extends React.PureComponent {
    render() {
        let {label, ...otherProps} = this.props;
        let title = label ? <ControlLabel>{label}</ControlLabel> : null;

        return (
            <FormGroup bsSize="small" >
                {title}
                <FormControl
                    type="date"
                    {...otherProps}
                />
            </FormGroup>
        );
    }
}

class BSCheckbox extends React.PureComponent {
    render() {
        let {label, ...otherProps} = this.props;
        return (
            <FormGroup bsSize="small">
                <Checkbox
                    className={css.checkbox}
                    {...otherProps}
                >
                <div className={css.checkboxLabel}>{label}</div>
                </Checkbox>
            </FormGroup>
        );
    }
}


export function makeRRFInput(type, modelName, inputProps) {
    let component;
    if (type === inputTypes.TEXT) {
        component = BSTextInput;
    } else if (type === inputTypes.CHECKBOX) {
        component = BSCheckbox;
    } else if (type === inputTypes.DROPDOWN || type === inputTypes.SEC_DROPDOWN) {
        component = BSSelect;
    } else if (type === inputTypes.TEXTAREA) {
        component = BSTextArea;
    } else if (type === inputTypes.DATE) {
        component = BSDate;
    } else {
        throw "Unknown input type: '"+ type +"'";
    }
    return (
        <Control
            className={css.input}
            component={component}
            model={modelName}
            {...inputProps}
        />
    );

}

