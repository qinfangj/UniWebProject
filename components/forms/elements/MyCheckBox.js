import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from '../forms.css';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';


/**
 * This name so that it does not conflict with the React-BS one.
 */
class MyCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = { checked: false };
    }

    getValue() {
        return this.state.checked;
    }

    onChange() {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <FormGroup controlId={this.props.name} bsSize="small" >
                <Checkbox onChange={this.onChange.bind(this)} value={this.state.checked} className={css.checkbox}>
                    <div className={css.checkboxLabel}>{this.props.label}</div>
                </Checkbox>
            </FormGroup>
        );
    }
}
MyCheckbox.propTypes = {
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
};
MyCheckbox.defaultProps = {
    label: "",
    defaultValue: "",
};


export default MyCheckbox;

