import React from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';



class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
    }

    getValue() {
        return this.state.checked ? 1 : 0;
    }

    onChange() {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <FormGroup controlId={this.props.name} >
                <Checkbox onChange={this.onChange.bind(this)} value={this.state.checked} >
                    {this.props.label}
                </Checkbox>
            </FormGroup>
        );
    }
}
CheckBox.propTypes = {
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
};
CheckBox.defaultProps = {
    label: "",
    defaultValue: "",
};


export default CheckBox;

