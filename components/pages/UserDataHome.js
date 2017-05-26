"use strict";
import React from 'react';
import css from './styles.css';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import { FormGroup, FormControl, Button } from 'react-bootstrap/lib';



class UserDataHome extends React.Component {

    render() {
        return (
            <div>
                <h1>Interface to the DEVELOPMENT INTERFACE DNA Array Facility of Lausanne University</h1>
                <Row className={css.fdHomeRow}>
                    <Alert bsStyle="info" >
                        <ul>
                            <li>This section allows users to interact with the DEVELOPMENT INTERFACE DNA Array Facility of the University of Lausanne.</li>
                            <li>Users must use this interface to submit their samples/libraries for deep sequencing and to retrieve their data or data from a collaborator.</li>
                            <li>As a prerequisite for submitting samples/libraries, your project must have been discussed and approved by the facility.</li>
                        </ul>
                    </Alert>
                </Row>

            </div>
        );
    }
}


export default UserDataHome;