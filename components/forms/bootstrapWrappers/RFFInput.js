"use strict";
import React from 'react';
import css from './bs.css';
import PropTypes from 'prop-types';
import formsCss from '../forms.css';
import inputTypes from '../inputTypes';
import { Control, Errors } from 'react-redux-form';
import BSTextInput from './BSTextInput';
import BSCheckbox from './BSCheckbox';
import BSSelect from './BSSelect';
import BSTextArea from './BSTextArea';
import BSDate from './BSDate';


/**
 * Use React-bootstrap visual input components in React-redux-forms functional components.
 */
export default class RFFInput extends React.PureComponent {

    static propTypes = {
        inputType: PropTypes.string.isRequired,
        modelName: PropTypes.string.isRequired,
    };

    render() {
        let component;
        let {modelName, inputType, required, validators, errors, errorMessages, updateOn, validateOn, ...inputProps} = this.props;

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

}
