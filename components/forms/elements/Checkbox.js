import React from 'react';

/* React-bootstrap */
import Checkbox from 'react-bootstrap/lib/Checkbox';



class CheckBox extends React.Component {
    constructor(props) {
        super(props);
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
            <Checkbox onChange={this.onChange.bind(this)} value={this.state.checked} >
                {this.props.label}
            </Checkbox>
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

