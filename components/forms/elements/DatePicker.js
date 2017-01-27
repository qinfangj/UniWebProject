import React from 'react';

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
    }

    getValue() {
        return this.state.value;
    }

    onChange(e) {
        this.setState({value: e.target.value});
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

