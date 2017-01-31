import React from 'react';
import store from '../../../core/store';
import * as forms from '../forms';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class DatePicker extends React.PureComponent {
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
                let storedValue = formData[this.props.field];
                this.setState({ value: storedValue });
            }
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    onChange(e) {
        let value = e.target.value;
        forms.changeValue(this.props.form, this.props.field, value);
    }

    render() {
        return (
            <FormGroup controlId={this.props.field} bsSize="small" >
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    type="date"
                    placeholder={this.props.label}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                />
            </FormGroup>
        );
    }
}
DatePicker.propTypes = {
    form: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string,
// maybe use later:
    required: React.PropTypes.bool,
};
DatePicker.defaultProps = {
    defaultValue: "1970-01-01",
// maybe use later:
    required: false,
};


export default DatePicker;

