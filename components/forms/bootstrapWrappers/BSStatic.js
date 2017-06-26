"use strict";
import React from 'react';
import formsCss from '../forms.css';
import { FormGroup, FormControl } from 'react-bootstrap/lib';


export default class BSStatic extends React.PureComponent {
    render() {
        return (
            <FormGroup bsSize="small">
                <FormControl.Static> </FormControl.Static>
            </FormGroup>
        );
    }
}

