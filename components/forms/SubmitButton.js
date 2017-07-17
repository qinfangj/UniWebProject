"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import formsCss from './forms.css';
import { Button } from 'react-bootstrap/lib';



class SubmitButton extends React.Component {

    static propTypes = {
        disabled: PropTypes.bool,
        activateForm: PropTypes.func.isRequired,
        deactivateForm: PropTypes.func.isRequired,
    };

    render() {
        if (this.props.disabled) {
            return (
                <Button bsStyle="primary" onClick={this.props.activateForm} className={formsCss.submitButton}>
                    Activate form
                </Button>
            );
        } else {
            return (
                <div>
                    <Button bsStyle="danger" onClick={this.props.deactivateForm} className={formsCss.submitButton}>
                        Lock form
                    </Button>
                    <Button bsStyle="primary" type="submit" className={formsCss.submitButton}>
                        Submit
                    </Button>
                </div>
            )
        }
    }

}


export default SubmitButton;
