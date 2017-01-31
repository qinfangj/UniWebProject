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


class Textarea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
        };
        forms.initFormField(this.props.form, this.props.field, this.props.defaultValue);
    }

    getValue() {
        return this.state.value;
    }

    componentDidMount() {
        // Listen to value change from the store
        this.unsubscribe = store.subscribe(() => {
            let formData = store.getState().common.forms[this.props.form];
            if (formData) {
                this.setState({ value: formData[this.props.field] });
            }
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    /** For bootstrap validationState: can be "success", "warning", "error", or null */
    getFeedbackValue() {
        let feedback = null;
        if ((!this.state.value || this.state.value === "") && this.props.required && this.props.submissionError) {
            feedback = "error"
        }
        return feedback;
    }

    /** Info text on error/warning */
    getErrorMessage() {
        let msg = "";
        if (!this.state.value && this.props.required && this.props.submissionError) {
            msg = this.props.label + " is required.";
        }
        return msg;
    }

    onChange(e) {
        let value = e.target.value;
        if (this.props.form !== undefined) {
            store.dispatch(changeFormValue(this.props.form, this.props.field, value));
        }
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
            <FormGroup controlId={this.props.field} bsSize="small" >
                {label}
                <FormControl componentClass="textarea"
                    placeholder={this.props.label}
                    onChange={this.onChange.bind(this)}
                    value={this.state.value}
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
    defaultValue: React.PropTypes.string,
    required: React.PropTypes.bool, // show a warning if required but no value
    inputProps: React.PropTypes.object,  // additional input field props
    submissionError: React.PropTypes.bool,  // after the form was submitted, display stronger feedback if invalid
};
Textarea.defaultProps = {
    defaultValue: "",
    required: false,
    submissionError: false,
};


export default Textarea;

