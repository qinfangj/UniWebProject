"use strict";
import React from 'react';
import css from '../forms.css';
import { connect } from 'react-redux';
import { changeFormValue } from '../../actions/actionCreators/formsActionCreators';
import constants from '../../constants/constants';

/* React-bootstrap */
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap/lib';



class Select extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    isValid(value) {
        if (value !== undefined && value !== null) {
            return !(this.props.required && value === -1);
        } else {
            return false
        }
    }

    getFeedbackValue() {
        let feedback = null;
        if (this.props.submissionError && this.props.valid === false) {
            feedback = "error";
        }
        return feedback;
    }

    getErrorMessage() {
        let msg = "";
        if (this.props.submissionError && this.props.valid === false) {
            msg = this.props.label + " is required.";
        }
        return msg;
    }

    onChange(e) {
        let value = parseInt(e.target.value);
        this.props.changeFormValue(this.props.form, this.props.field, value, this.isValid(value));
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
        let requireString = (this.props.required && this.props.valid === false) ?
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
                <FormControl
                    componentClass="select"
                    placeholder={label}
                    onChange={this.onChange.bind(this)}
                    value={this.props.value}
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
    value: React.PropTypes.number.isRequired,  // field value
    options: React.PropTypes.array.isRequired,  // an array of the type [[1,"yes"], [2,"no"], [3,"maybe"]]
    label: React.PropTypes.string,  // title - visible
    defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),  // Option index or item name
    inputProps: React.PropTypes.object,  // additional input field props
    required: React.PropTypes.bool,  // whether one must choose an option other than 'none'
    submissionError: React.PropTypes.bool,  // after the form was submitted, display stronger feedback if invalid
};

Select.defaultProps = {
    value: -1,
    required: false,
    options: [],
};


const mapStateToProps = (state, ownProps) => {
    if (! state.forms[ownProps.form]) {
        console.warn("Uninitialized form");
        return {};
    }
    let submissionError = state.feedback[ownProps.form].status === constants.WARNING;
    let options = ownProps.options;
    let defaultValue = (!options || options.length === 0) ? -1 : options[0][0];
    let value = state.forms[ownProps.form][ownProps.field] || defaultValue;
    return {
        value: value,
        valid: state.forms[ownProps.form]._isValid[ownProps.field],
        submissionError: submissionError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFormValue: (form, field, value, valid) => dispatch(changeFormValue(form, field, value, valid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);

