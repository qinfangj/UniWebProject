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
                <h2>Utilites for the Interface Development of DNA Array Facility </h2>
                <Row className={css.fdHomeMsg}>
                    <Alert bsStyle="info" className={css.fdHomeAlert}>
                        <ul>
                            <li>This section allows users to interact with the DEVELOPMENT INTERFACE DNA Array Facility of the University of Lausanne.</li>
                            <li>Users must use this interface to submit their samples/libraries for deep sequencing and to retrieve their data or data from a collaborator.</li>
                            <li>As a prerequisite for submitting samples/libraries, your project must have been discussed and approved by the facility.</li>
                        </ul>
                    </Alert>
                </Row>
                <Row className={css.fdHomeRow}> 

                    <Col md={4} >
                        <div className={css.submitPanel}>
                            <fieldset >
                                <legend >Submission</legend>
                                    <ul>
                                        <li><a href="/#/user/newform">Submit samples and libraries</a></li>
                                        <li><a href="/#/user/newrequest">Request more sequences</a></li>
                                    </ul>
                            </fieldset>
                        </div>
                    </Col>
                    <Col md={4} >
                        <div className={css.viewPanel}>
                        <fieldset className={css.field}>
                            <legend >View</legend>
                            <ul>
                                <li><a href="/#/user/view/labsamples">View lab submissions</a></li>
                                <li><a href="/#/user/view/colsamples">View colaboration submissions</a></li>
                            </ul>
                        </fieldset>
                        </div>
                    </Col>
                    <Col md={4} >
                        <div className={css.dataPanel}>
                        <fieldset className={css.field}>
                            <legend>Data</legend>
                            <ul>
                                <li><a href="/#/user/data/dataruns">Get lab data</a></li>
                                <li><a href="/#/user/data/datacollabs">Get collaboration data</a></li>
                            </ul>
                        </fieldset>
                        </div>
                    </Col>


                </Row>
            </div>
        );
    }
}


export default UserDataHome;