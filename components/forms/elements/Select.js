"use strict";
import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import * as forms from '../forms';

/* React-bootstrap */
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap/lib';



class Select extends React.PureComponent {
    constructor(props) {
        super(props);
        let initValue = this.defaultOption(props.options);
        this.state = {
            value: initValue,
            valid: true,
        };
        forms.initFormField(this.props.form, this.props.field, -1, this.isValid(initValue));
    }

    componentDidMount() {
        // Listen to value change from the store
        this.unsubscribe = store.subscribe(() => {
            let value = forms.getFormValue(this.props.form, this.props.field);
            let valid = forms.getIsValid(this.props.form, this.props.field);
            if (value) {
                this.setState({ value, valid });
            }
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    isValid(value) {
        if (value) {
            return !(this.props.required && value === -1);
        }
    }

    /* Return the initial option index */
    defaultOption(options) {
        if (!options || options.length === 0) {
            return -1;
        }
        return options[0][0];
    }

    getFeedbackValue() {
        let feedback = null;
        if (this.props.submissionError && !this.isValid(this.state.value)) {
            feedback = "error";
        }
        return feedback;
    }

    getErrorMessage() {
        let msg = "";
        if (this.props.submissionError && !this.isValid(this.state.value)) {
            msg = this.props.label + " is required.";
        }
        return msg;
    }

    onChange(e) {
        let value = parseInt(e.target.value);
        forms.changeValue(this.props.form, this.props.field, value, this.isValid(value));
    }

    makeOptions() {
        let options = [];
        if (this.props.options) {
            options = this.props.options.map((v,i) => {
                return <option value={v[0]} key={i}>{v[1]}</option>;
            });
        }
        return options;
    }

    render() {
        let options = this.makeOptions();

        // Display a star if the field is required and no valud has been entered yet
        //  (better than an ugly warning, see comment in `validate`).
        let requireString = (this.props.required && !this.isValid(this.state.value)) ?
            <span className={css.requiredString}>{" *"}</span>: null;

        let label = this.props.label ? <ControlLabel>{this.props.label+" "}{requireString}</ControlLabel> : null;

        // Color and symbol indicating an error/warning
        let feedbackValue = this.getFeedbackValue();
        let feedback = feedbackValue !== null ? <FormControl.Feedback /> : null;

        // Help block: text info on error or warning
        let msg = this.getErrorMessage();
        let help = <HelpBlock bsClass={css.feedback}>{msg}</HelpBlock>;

        return (
            <FormGroup controlId={this.props.field} validationState={feedbackValue} bsSize="small" >
                {label}
                <FormControl componentClass="select"
                    placeholder={label}
                    onChange={this.onChange.bind(this)}
                    value={this.state.value}
                    {...this.props.inputProps}
                >
                    {options}
                </FormControl>
                {feedback}
                {help}
            </FormGroup>
        );
    }
}

Select.propTypes = {
    form: React.PropTypes.string.isRequired,  // form name
    field: React.PropTypes.string.isRequired,  // FormGroup controlId + name of the field in store
    options: React.PropTypes.array.isRequired,  // an array of the type [[1,"yes"], [2,"no"], [3,"maybe"]]
    label: React.PropTypes.string,  // title - visible
    defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),  // Option index or item name
    inputProps: React.PropTypes.object,  // additional input field props
    required: React.PropTypes.bool,  // whether one must choose an option other than 'none'
    submissionError: React.PropTypes.bool,  // after the form was submitted, display stronger feedback if invalid
};

Select.defaultProps = {
    hasNoneValue: true,
    required: false,
};


export default Select;

