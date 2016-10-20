import React from 'react';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


class TextField extends React.Component {
    constructor(props) {
        super(props);
        let value = this.props.defaultValue;
        let res = this.validate(value);
        this.state = {
            value: value,  // string
            valid: res.valid,  // boolean, is the field valid
            msg: res.msg,  // error message below the field
            status: null,  // "success", "warning", "error", null
        };
    }

    getValue() {
        return this.state.valid ? this.state.value.trim() : null;
    }

    /**
     * When submitted, display more evidently if a required field is missing or invalid.
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.value === "" && nextProps.missing) {
            this.setState({
                valid: false,
                msg: this.props.visibleName + " is required.",
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
            status = valid ? "success" : "warning";
        }
        return {valid, msg, status};
    }

    onChange(e) {
        let value = e.target.value;
        let {valid, msg, status} = this.validate(value);
        this.setState({ value, valid, msg, status });
    }

    render() {
        let requireString = (this.props.required && !this.state.value) ? " (required)": "";
        return (
            <FormGroup controlId={this.props.name} validationState={this.state.status} >
                <ControlLabel>{this.props.visibleName + requireString}</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.helpMessage}
                />
                <FormControl.Feedback />
                <HelpBlock>{this.state.msg}</HelpBlock>
            </FormGroup>
        );
    }
}
TextField.propTypes = {
    name: React.PropTypes.string.isRequired,
    visibleName: React.PropTypes.string.isRequired,
    validator: React.PropTypes.func,  // a func  `value => {valid: true|false, msg: errorMessage}`
    required: React.PropTypes.bool,
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting
    helpMessage: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
};
TextField.defaultProps = {
    validator: ((x) => {return {valid: true, msg: ""}}),
    required: false,
    missing: false,
    invalid: false,
    helpMessage: "",
    defaultValue: "",
};


export default TextField;

