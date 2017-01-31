import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import * as forms from '../forms';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';


/**
 * This name so that it does not conflict with the React-BS one.
 */
class MyCheckbox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { checked: this.props.defaultValue };
        forms.initFormField(this.props.form, this.props.field, this.props.defaultValue);
    }

    getValue() {
        return this.state.checked;
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

    onChange() {
        let value = !this.state.checked;
        forms.changeValue(this.props.form, this.props.field, value);
    }

    render() {
        return (
            <FormGroup controlId={this.props.field} bsSize="small" >
                <Checkbox onChange={this.onChange.bind(this)} value={this.state.checked} className={css.checkbox}>
                    <div className={css.checkboxLabel}>{this.props.label}</div>
                </Checkbox>
            </FormGroup>
        );
    }
}
MyCheckbox.propTypes = {
    form: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.bool,
};
MyCheckbox.defaultProps = {
    label: "",
    defaultValue: false,
};


export default MyCheckbox;

