"use strict";
import React from 'react';
import css from './bs.css';
import store from '../../../core/store';
import PropTypes from 'prop-types';
import formsCss from '../forms.css';
import inputTypes from '../inputTypes';
import { Control, Errors, actions } from 'react-redux-form';
import BSTextInput from './BSTextInput';
import BSCheckbox from './BSCheckbox';
import BSSelect from './BSSelect';
import BSTextArea from './BSTextArea';
import BSDate from './BSDate';
import BSSecondarySelect from './BSSecondarySelect';
import BSMultipleSelect from './BSMultipleSelect';
import BSStatic from './BSStatic';


/**
 * Use React-bootstrap visual input components in React-redux-forms functional components.
 */
export default class RRFInput extends React.PureComponent {

    static propTypes = {
        inputType: PropTypes.string.isRequired,
        modelName: PropTypes.string.isRequired,
    };

    render() {
        let component;
        let {modelName, inputType, required, validators, errors, errorMessages, updateOn, validateOn, changeAction, ...inputProps} = this.props;

        if (inputType === inputTypes.TEXT) {
            component = BSTextInput;
        } else if (inputType === inputTypes.CHECKBOX) {
            /* RRF does not know that this is a checkbox */
            changeAction = (model) => store.dispatch(actions.toggle(model));
            component = BSCheckbox;
        } else if (inputType === inputTypes.DROPDOWN) {
            component = BSSelect;
        } else if (inputType === inputTypes.SEC_DROPDOWN) {
            component = BSSecondarySelect;
        } else if (inputType === inputTypes.MULTIPLE_SELECT) {
            component = BSMultipleSelect;
        } else if (inputType === inputTypes.TEXTAREA) {
            component = BSTextArea;
        } else if (inputType === inputTypes.DATE) {
            component = BSDate;
        } else if (inputType === inputTypes.BLANK) {
            component = BSStatic;
        } else {
            throw "Unknown input type: '"+ inputType +"'";
        }

        // Should be able to automatically select the first dropdown value if there is only one available
        // if (options && options.length === 1) {
        //     value = options[0][0];
        // }

        // We don't use HTML5's "required" directly because of a bug in RRF:
        // https://github.com/davidkpiano/react-redux-form/issues/836
        inputProps.isRequired = required;

        return (
            <div>
                <Control
                    className={formsCss.input}
                    component={component}
                    model={modelName}
                    validators={required ? {...validators, isRequired: (val) => val && val.length} : validators}
                    errors={errors}
                    updateOn={updateOn || "change"}
                    validateOn={validateOn || "change"}
                    changeAction={changeAction}
                    ignore={['focus', 'blur']}
                    {...inputProps}
                />
                <Errors
                    className={css.errors}
                    model={modelName}
                    show="touched"
                    messages={errorMessages || {isRequired: "Required"}}
                />
            </div>
        );
    }

}
