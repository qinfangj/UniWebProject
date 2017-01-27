import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import { changeFormValue } from '../../actions/actionCreators/commonActionCreators';

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
            msg: "",  // error message below the field
            feedback: null,  // "success", "warning", "error", null
            submitted: false,  // display stronger feedback if form is submitted
        };
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
        // Initial feedback
        let {valid, msg, feedback} = this.validate(this.state.value);
        this.setState({valid, msg, feedback});
    }
    componentDidMount() {
        // Listen to value change from the store
        this.unsubscribe = store.subscribe(() => {
            let formData = store.getState().common.forms[this.props.form];
            if (formData) {
                let storedValue = formData[this.props.storeKey];
                let {valid, msg, feedback} = this.validate(storedValue);
                this.setState({ value: storedValue, valid, msg, feedback });
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
        let valid, msg, feedback;
        // No value: valid only if not required.
        // No feedback yet, because warnings for missing value on all empty fields is not a good user experience.
        if (!value) {
            if (this.props.isRequired) {
                if (this.state.submitted) {
                    msg = this.props.label + " is required.";
                    feedback = "error";
                } else {
                    feedback = null;
                }
            } else {
                valid = true;
            }
        // When there is a value, validate it and set message and feedback accordingly.
        } else {
            let res = this.props.validator(value);
            valid = res.valid;
            msg = valid ? "" : res.msg;
            if (this.state.submitted) {
                feedback = "error";
            } else {
                feedback = valid ? null : "warning";
            }
        }
        return {valid, msg, feedback};
    }

    changeValue(value) {
        if (this.props.form !== undefined) {
            store.dispatch(changeFormValue(this.props.form, this.props.storeKey, value));
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
        let feedback = this.state.feedback !== null ? <FormControl.Feedback /> : null;

        return (
            <FormGroup controlId={this.props.storeKey} validationState={this.state.feedback} bsSize="small" >
                {label}
                <FormControl
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.placeholder}
                    {...this.props.inputProps}
                />
                {feedback}
                <HelpBlock bsClass={css.feedback}>{this.state.msg}</HelpBlock>
            </FormGroup>
        );
    }
}
TextField.propTypes = {
    form: React.PropTypes.string.isRequired,  // form name
    storeKey: React.PropTypes.string.isRequired,  // key to get the form value from store. Also used for the 'id' of the <input> and the 'for' on the <label>.
    label: React.PropTypes.string,  // title - visible
    type: React.PropTypes.string,  // input type (defaults to "text")
    validator: React.PropTypes.func,  // a func  `value => {valid: true|false, msg: errorMessage}`
    required: React.PropTypes.bool,  // if true, `this.getValue()` will return null if field is empty, and a warning shows.
    placeholder: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    inputProps: React.PropTypes.object,  // additional input field props
};
TextField.defaultProps = {
    type: "text",
    validator: ((_) => {return {valid: true, msg: ""}}),
    required: false,
    placeholder: "",
    defaultValue: "",
};


export default TextField;

