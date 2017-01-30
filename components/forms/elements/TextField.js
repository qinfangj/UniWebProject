import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import { changeFormValue } from '../../actions/actionCreators/commonActionCreators';
import * as forms from '../forms';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


class TextField extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,  // field value. Cannot have a default since React 15... Set `defaultValue` instead.
            files: null,  // if type="file", the FilesList
            valid: true,  // boolean, is the field valid
            msg: "",  // error message from the validator
        };
        forms.initFormField(this.props.form, this.props.field, this.props.defaultValue);
    }

    getValue() {
        return (this.state.value && this.state.valid) ? this.state.value.trim() : null;
    }

    /**
     * If type="file", get the FilesList
     */
    getFile() {
        return this.state.files ? this.state.files[0] : null;
    }

    componentWillMount() {
        // Initial validation of default value
        let {valid, msg} = this.validate(this.state.value);
        this.setState({valid, msg});
    }
    componentDidMount() {
        // Listen to value change from the store
        this.unsubscribe = store.subscribe(() => {
            let formData = store.getState().common.forms[this.props.form];
            if (formData) {
                let storedValue = formData[this.props.field];
                let {valid, msg} = this.validate(storedValue);
                this.setState({ value: storedValue, valid, msg });
            }
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    /**
     * Check different conditions on string `value` **during the typing**.
     */
    validate(value) {
        let valid = true;
        let msg;
        // No value: valid only if not required.
        if (!value) {
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
        if (!this.state.value || this.state.value === "") {
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
        if (!this.state.value && this.props.required && this.props.submissionError) {
            msg = this.props.label + " is required.";
        } else {
            msg = this.state.msg;
        }
        return msg;
    }

    changeValue(value) {
        console.debug(1)
        let {valid, msg} = this.props.validator(value);
        //this.setState({valid, msg});
        if (this.props.form !== undefined) {
            store.dispatch(changeFormValue(this.props.form, this.props.field, value, valid));
        }
    }

    onChange(e) {
        let value = e.target.value;
        if (this.props.type === "file") {
            this.setState({ files: e.target.files });
        }
        this.changeValue(value);
    }

    render() {
        // Display a star if the field is required and no valud has been entered yet
        //  (better than an ugly warning, see comment in `validate`).
        let requireString = (this.props.required && !this.state.value) ?
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
            <FormGroup controlId={this.props.field} validationState={feedbackValue} bsSize="small" >
                {label}
                <FormControl
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.placeholder}
                    {...this.props.inputProps}
                />
                {feedback}
                {help}
            </FormGroup>
        );
    }
}
TextField.propTypes = {
    form: React.PropTypes.string.isRequired,  // form name
    field: React.PropTypes.string.isRequired,  // key to get the form value from store. Also used for the 'id' of the <input> and the 'for' on the <label>.
    label: React.PropTypes.string,  // title - visible
    type: React.PropTypes.string,  // input type (defaults to "text")
    validator: React.PropTypes.func,  // a func  `value => {valid: true|false, msg: errorMessage}`
    required: React.PropTypes.bool,  // if true, `this.getValue()` will return null if field is empty, and a warning shows up.
    placeholder: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    inputProps: React.PropTypes.object,  // additional input field props
    submissionError: React.PropTypes.bool,  // after the form was submitted, display stronger feedback if invalid
};
TextField.defaultProps = {
    type: "text",
    validator: ((_) => {return {valid: true, msg: ""}}),
    required: false,
    placeholder: "",
    defaultValue: "",
};


export default TextField;

