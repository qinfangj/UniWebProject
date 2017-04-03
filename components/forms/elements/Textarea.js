"use strict";
import React from 'react';
import css from '../forms.css';
import { connect } from 'react-redux';
import { changeFormValue } from '../../actions/actionCreators/formsActionCreators';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


class Textarea extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    /** For bootstrap validationState: can be "success", "warning", "error", or null */
    getFeedbackValue() {
        let feedback = null;
        if ((!this.props.value || this.props.value === "") && this.props.required && this.props.submissionError) {
            feedback = "error"
        }
        return feedback;
    }

    /** Info text on error/warning */
    getErrorMessage() {
        let msg = "";
        if (!this.props.value && this.props.required && this.props.submissionError) {
            msg = this.props.label + " is required.";
        }
        return msg;
    }

    onChange(e) {
        let value = e.target.value;
        // The default value is automatically escaped, so do this to allow a multiline default value.
        value = value.replace("\\n", "\n");
        this.props.changeFormValue(this.props.form, this.props.field, value);
    }

    render() {
        let value = this.props.value.replace("\\n", "\n");

        // Display a star if the field is required and no valud has been entered yet
        //  (better than an ugly warning, see comment in `validate`).
        let requireString = (this.props.required && !this.props.value) ?
            <span className={css.requiredString}>{" *"}</span>: null;

        // Descriptive text above the field
        let label = this.props.label ? <ControlLabel>{this.props.label+" "}{requireString}</ControlLabel> : null;

        // Color and symbol indicating an error/warning
        let feedbackValue = this.getFeedbackValue();
        let feedback = feedbackValue !== null ? <FormControl.Feedback /> : null;

        // Help block: text info on error or warning
        let msg = this.getErrorMessage();
        let help = <HelpBlock bsClass={css.feedback}>{msg}</HelpBlock>;

        return (
            <FormGroup controlId={this.props.field} bsSize="small" >
                {label}
                <FormControl componentClass="textarea"
                    placeholder={this.props.label}
                    onChange={this.onChange.bind(this)}
                    value={value}
                    {...this.props.inputProps}
                />
                {feedback}
                {help}
            </FormGroup>
        );
    }
}

Textarea.propTypes = {
    form: React.PropTypes.string.isRequired,  // form name
    field: React.PropTypes.string.isRequired,  // key to get the form value from store. Also used for the 'id' of the <input> and the 'for' on the <label>.
    label: React.PropTypes.string.isRequired,  // title - visible
    value: React.PropTypes.string,
    required: React.PropTypes.bool, // show a warning if required but no value
    inputProps: React.PropTypes.object,  // additional input field props
    submissionError: React.PropTypes.bool,  // after the form was submitted, display stronger feedback if invalid
};

Textarea.defaultProps = {
    value: "",
    required: false,
    submissionError: false,
};


const mapStateToProps = (state, ownProps) => {
    return {
        value: state.forms[ownProps.form][ownProps.field],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFormValue: (form, field, value, valid) => dispatch(changeFormValue(form, field, value, valid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Textarea);


