import React from 'react';
import css from '../forms.css';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
        };
    }

    getValue() {
        return this.state.value;
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <FormGroup controlId={this.props.name} >
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
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string,
// maybe use later:
    required: React.PropTypes.bool,
    missing: React.PropTypes.bool,  // field is required but was found empty when submitting
    invalid: React.PropTypes.bool,  // field was found invalid when submitting
};
DatePicker.defaultProps = {
    defaultValue: "1970-01-01",
// maybe use later:
    required: false,
    missing: false,
    invalid: false,
};


export default DatePicker;

