import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import store from '../../../core/store';
import { changeFormValue } from '../../actions/actionCreators/commonActionCreators';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: this.props.defaultValue,
        };
    }

    getValue() {
        return this.state.value;
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({ value });
        if (this.props.form !== undefined) {
            store.dispatch(changeFormValue(this.props.form, this.props.storeKey || this.props.name, value));
        }
    }

    render() {
        return (
            <FormGroup controlId={this.props.name} bsSize="small" >
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl componentClass="textarea"
                    placeholder={this.props.label}
                    onChange={this.onChange.bind(this)}
                    value={this.state.value}
                    {...this.props.inputProps}
                />
            </FormGroup>
        );
    }
}
Textarea.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    form: React.PropTypes.string,  // form name
    defaultValue: React.PropTypes.string,
// maybe use later:
    required: React.PropTypes.bool,
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting
    inputProps: React.PropTypes.object,  // additional input field props
    storeKey: React.PropTypes.string,  // key to get the form value from store. Otherwise, `name` is used instead.
};
Textarea.defaultProps = {
    defaultValue: "",
// maybe use later:
    required: false,
    missing: false,
    invalid: false,
};


export default Textarea;

