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
        let value = this.props.defaultValue;
        let res = this.validate(value);
        this.state = {
            value: value,  // string
            files: null,  // if type="file", the FilesList
            valid: res.valid,  // boolean, is the field valid
            msg: res.msg,  // error message below the field
            status: null,  // "success", "warning", "error", null
        };
    }

    getValue() {
        return this.state.valid ? this.state.value.trim() : null;
    }

    /**
     * If type="file", get the FilesList
     */
    getFile() {
        return this.state.files ? this.state.files[0] : null;
    }

    /**
     * When submitted, display more evidently if a required field is missing or invalid.
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.value === "" && nextProps.missing) {
            this.setState({
                valid: false,
                msg: this.props.label + " is required.",
                status: "error",
            });
        } else if (nextProps.invalid) {
            this.setState({
                valid: false,
                status: "error",
            });
        }
    }

    /**
     * Check different conditions on string `value` **during the typing**.
     */
    validate(value) {
        let valid;
        let msg;
        let status;
        if (!value) {
            valid = !this.props.required;
            status = null;
        } else {
            let res = this.props.validator(value);
            valid = res.valid;
            msg = valid ? "" : res.msg;
            status = valid ? null : "warning";
        }
        return {valid, msg, status};
    }

    onChange(e) {
        let value = e.target.value;
        let {valid, msg, status} = this.validate(value);
        if (this.props.type === "file") {
            this.setState({ files: e.target.files });
        }
        this.setState({ value, valid, msg, status });
        if (this.props.form !== undefined) {
            store.dispatch(changeFormValue(this.props.form, this.props.storeKey || this.props.name, value));
        }
    }

    render() {
        let requireString = (this.props.required && !this.state.value) ?
            <span className={css.requiredString}>{" *"}</span>: null;
        let label = this.props.label ? <ControlLabel>{this.props.label+" "}{requireString}</ControlLabel> : null;
        return (
            <FormGroup controlId={this.props.name} validationState={this.state.status} bsSize="small" >
                {label}
                <FormControl
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.placeholder}
                    {...this.props.inputProps}
                />
                {this.state.status !== null ? <FormControl.Feedback /> : null}
                <HelpBlock bsClass={css.feedback}>{this.state.msg}</HelpBlock>
            </FormGroup>
        );
    }
}
TextField.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,  // title - visible
    type: React.PropTypes.string,  // input type (defaults to "text")
    validator: React.PropTypes.func,  // a func  `value => {valid: true|false, msg: errorMessage}`
    required: React.PropTypes.bool,  // if true, `this.getValue()` will return null if field is empty, and a warning shows.
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting - only if a `validator` prop is given.
    placeholder: React.PropTypes.string,
    form: React.PropTypes.string,  // form name
    defaultValue: React.PropTypes.string,
    inputProps: React.PropTypes.object,  // additional input field props
    storeKey: React.PropTypes.string,  // key to get the form value from store. Otherwise, `name` is used instead.
};
TextField.defaultProps = {
    type: "text",
    validator: ((_) => {return {valid: true, msg: ""}}),
    required: false,
    missing: false,
    invalid: false,
    placeholder: "",
    defaultValue: "",
};


export default TextField;

