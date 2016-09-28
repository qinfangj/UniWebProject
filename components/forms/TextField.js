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

    /* Check different conditions on string `value`.
     */
    validate(value) {
        let valid;
        let msg;
        if (value === "") {
            if (this.props.required) {
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
        } else if (this.state.valid === false) {
            validationString = "warning";
        }
        return validationString;
    }

    render() {
        let name = this.props.name;
        let visibleName = this.props.visibleName;
        return (
            <FormGroup controlId={name} validationState={this.getValidationState()} >
                <ControlLabel>{visibleName}</ControlLabel>
                <FormControl
                    ref={(c) => this.inputRef = c}
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                />
                <FormControl.Feedback />
                {this.state.valid === false ?
                    <HelpBlock>{this.state.msg}</HelpBlock>
              : (this.state.valid === null && this.props.helpMessage) ?
                    <HelpBlock>{this.props.helpMessage}</HelpBlock>
              : ""
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
    helpMessage: React.PropTypes.string,
};
TextField.defaultProps = {
    required: false,
    helpMessage: "",
    validator: ((x) => {return {valid: true, msg: ""}}),
};


export default TextField;

