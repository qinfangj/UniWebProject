import React from 'react';
import store from '../../core/store';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { changeFormInput } from '../actions/actionCreators/formActionCreators';


class TextField extends React.Component {
    constructor(props) {
        super(props);
        let value = "";
        let res = this.validate(value);
        this.state = {
            value: value,
            valid: res.valid,
            msg: res.msg,
        };
    }

    get value() {
        return this.inputRef.props.value;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value === "" && nextProps.missing) {
            this.setState({valid: false, msg: this.props.visibleName + " is required."});
        }
    }

    /**
     * Check different conditions on string `value` during the typing.
     */
    validate(value) {
        let valid;
        let msg;
        if (!value) {
            if (this.props.missing) {
                valid = false;
                msg = this.props.visibleName + " is required.";
            } else {
                valid = null;
            }
        } else {
            let res = this.props.validator(value);
            valid = res.valid;
            msg = res.msg;
        }
        return {valid, msg};
    }

    onChange(e) {
        let value = e.target.value;
        let {valid, msg} = this.validate(value);
        this.setState({ value, valid, msg });
        if (valid) {
            store.dispatch(changeFormInput(this.props.form, this.props.name, value));
        } else {
            store.dispatch(changeFormInput(this.props.form, this.props.name, null));
        }
    }

    getValidationState() {
        let validationString;
        if (this.state.valid === true) {
            validationString = "success";
        } else if (this.props.invalid) {
            validationString = "error";
        } else if (this.state.valid === false) {
            validationString = "warning";
        }
        return validationString;
    }

    render() {
        let name = this.props.name;
        let visibleName = this.props.visibleName;
        let requireString = (this.props.required && !this.state.value) ? " (required)": "";
        return (
            <FormGroup controlId={name} validationState={this.getValidationState()} >
                <ControlLabel>{visibleName + requireString}</ControlLabel>
                <FormControl
                    ref={(c) => this.inputRef = c}
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.helpMessage}
                />
                <FormControl.Feedback />
                { !this.state.valid || this.props.invalid ?
                    <HelpBlock>{this.state.msg}</HelpBlock> : ""
                }
            </FormGroup>
        );
    }
}
TextField.propTypes = {
    form: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    visibleName: React.PropTypes.string.isRequired,
    validator: React.PropTypes.func,  // a func  `value => {valid: true|false, msg: errorMessage}`
    required: React.PropTypes.bool,
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting
    helpMessage: React.PropTypes.string,
};
TextField.defaultProps = {
    validator: ((x) => {return {valid: true, msg: ""}}),
    required: false,
    missing: false,
    invalid: false,
    helpMessage: "",
};


export default TextField;

