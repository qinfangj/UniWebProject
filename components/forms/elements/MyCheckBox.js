"use strict";
import React from 'react';
import css from '../forms.css';
import store from '../../../core/store';
import * as forms from '../forms';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';


/**
 * This name so that it does not conflict with the React-BS one.
 */
class MyCheckBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.defaultValue
        };
        forms.initFormField(this.props.form, this.props.field, this.props.defaultValue);
    }

    componentDidMount() {
        // Listen to value change from the store
        this.unsubscribe = store.subscribe(() => {
            let value = forms.getFormValue(this.props.form, this.props.field);
            if (value) {
                this.setState({ value });
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
MyCheckBox.propTypes = {
    form: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.bool,
};
MyCheckBox.defaultProps = {
    label: "",
    defaultValue: false,
};


export default MyCheckBox;

