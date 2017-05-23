"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from '../forms.css';
import { connect } from 'react-redux';
import { changeFormValue } from '../../actions/actionCreators/formsActionCreators';
import constants from '../../constants/constants';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null,  // if type="file", the FilesList
            valid: true,  // boolean, is the field valid
            msg: "",  // error message from the validator
        };
    }

    componentWillMount() {
        // Initial validation of default value
        let {valid, msg} = this.validate(this.props.value);
        this.setState({valid, msg});
    }

    /**
     * Validate the value as we are typing.
     */
    componentWillReceiveProps(newProps) {
        let {valid, msg} = this.validate(newProps.value);
        this.setState({ valid, msg });
    }

    /**
     * Check different conditions on string `value` **during the typing**.
     */
    validate(value) {
        let valid = true;
        let msg;
        // No value: valid only if not required.
        if (value === "") {
            // different from `if (!value && this.props.required)`:
            // we do not want any warning while fields are empty (the little star should help already)
            valid = !this.props.required;
        // When there is a value, validate it and set message accordingly.
        } else {
            let res = this.props.validator(value);
            valid = res.valid;
            msg = valid ? "" : res.msg;
        }
        return {valid, msg};
    }

    /** For bootstrap validationState: can be "success", "warning", "error", or null */
    getFeedbackValue() {
        let feedback = null;
        if (this.props.value === "" || this.props.value === null) {
            // Again, separate conditions because we do not want any warning while fields are empty
            if (this.props.required && this.props.submissionError) {
                feedback = "error"
            }
        } else if (!this.state.valid) {
            feedback = this.props.submissionError ? "error" : "warning";
        }
        return feedback;
    }

    /** Info text on error/warning */
    getErrorMessage() {
        let msg = "";
        if ((this.props.value === "" || this.props.value === null) && this.props.required && this.props.submissionError) {
            msg = this.props.label + " is required.";
        } else {
            msg = this.state.msg;
        }
        return msg;
    }

    onChange(e) {
        let value = e.target.value;
        if (this.props.type === "file") {
            let file = e.target.files[0];
            let filename = (file.name || "").replace(/.*[\/\\]/, '');
            this.props.changeFormValue(this.props.form, this.props.field, {file, filename, value});
        } else {
            let valid = this.validate(value).valid;
            this.props.changeFormValue(this.props.form, this.props.field, value, valid);
        }
    }

    render() {

        let value = this.props.value;
        if (this.props.type === "file" && typeof(this.props.value) === "object") {
            value = this.props.value.value;
        }

        //console.debug(this.props.field, this.props.value, value)

        // Display a star if the field is required and no value has been entered yet
        //  (better than an ugly warning, see comment in `validate`).
        let requireString = (this.props.required && !this.props.value) ?
            <span className={css.requiredString}>{" *"}</span> : null;

        // Descriptive text above the field
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
                    type={this.props.type}
                    value={value}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    {...this.props.inputProps}
                />
                {feedback}
                {help}
            </FormGroup>
        );
    }
}
TextField.propTypes = {
    form: PropTypes.string.isRequired,  // form name
    field: PropTypes.string.isRequired,  // key to get the form value from store. Also used for the 'id' of the <input> and the 'for' on the <label>.
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,  // field value
    label: PropTypes.string,  // title - visible
    type: PropTypes.string,  // input type (defaults to "text")
    validator: PropTypes.func,  // a func  `value => {valid: true|false, msg: errorMessage}`
    required: PropTypes.bool,  // show a warning if required but no value
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    inputProps: PropTypes.object,  // additional FormControl props
    submissionError: PropTypes.bool,  // after the form was submitted, display stronger feedback if invalid
};
TextField.defaultProps = {
    value: "",
    type: "text",
    validator: ((_) => {return {valid: true, msg: ""}}),
    required: false,
    placeholder: "",
    submissionError: false,
};


const mapStateToProps = (state, ownProps) => {
    if (! state.forms[ownProps.form]) {
        console.warn("Uninitialized form");
        return {};
    }
    let submissionStatus = state.feedback[ownProps.form].status;
    let submissionError = submissionStatus === constants.WARNING;
    let value = state.forms[ownProps.form][ownProps.field];
    if (value === undefined || value === null) {  // can be 0
        value = "";
    }
    return {
        value: value,
        submissionError: submissionError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFormValue: (form, field, value, valid) => dispatch(changeFormValue(form, field, value, valid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextField);


