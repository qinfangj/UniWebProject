import React from 'react';
import store from '../../../core/store';
import { changeFormValue } from '../../actions/actionCreators/commonActionCreators';

/* React-bootstrap */
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class Textarea extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
        };
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

    onChange(e) {
        let value = e.target.value;
        if (this.props.form !== undefined) {
            store.dispatch(changeFormValue(this.props.form, this.props.field, value));
        }
    }

    render() {
        return (
            <FormGroup controlId={this.props.field} bsSize="small" >
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
    form: React.PropTypes.string.isRequired,  // form name
    field: React.PropTypes.string.isRequired,  // key to get the form value from store. Also used for the 'id' of the <input> and the 'for' on the <label>.
    label: React.PropTypes.string.isRequired,  // title - visible
    defaultValue: React.PropTypes.string,
// maybe use later:
    required: React.PropTypes.bool,
    inputProps: React.PropTypes.object,  // additional input field props
};
Textarea.defaultProps = {
    defaultValue: "",
// maybe use later:
    required: false,
};


export default Textarea;

