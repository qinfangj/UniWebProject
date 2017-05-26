"use strict";
import React from 'react';
import css from './styles.css';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import { FormGroup, FormControl, Button } from 'react-bootstrap/lib';



class AdminDataHome extends React.Component {

    render() {
        return (
            <div>
                <div className={css.title}>Admin-restricted Database Browser</div>
                <Row className={css.fdHomeRow}>
                    <Alert bsStyle="info" >
                        <p>
                            This section allows you to browse and update the different table of the database that are restricted to the administrators.
                        </p>
                    </Alert>

                    <Alert bsStyle="warning">
                        <p>Select a laboratory to browse its sequencing data.</p>
                        <Row className={css.fdHomeRow} >
                        <Col sm={2}>
                            <label>Laboratory:</label>
                        </Col>
                        <Col sm={6}>
                            <FormGroup controlId="formControlsSelect">
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    <option value="other">...</option>
                                </FormControl>
                            </FormGroup>
                            <Button type="submit" bsStyle="primary" className={css.fdHomeBtn}>
                                Submit
                            </Button>
                        </Col>
                        </Row>

                    </Alert>
                </Row>
                <div className={css.section}>
                    <fieldset>
                        <legend>Submission Statistic</legend>
                        <Col md={6}>
                            <table width="100%" style={{border: '1px solid lightgrey'}}>
                                <tbody>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                    <tr><th>User</th><td>Sample Count</td></tr>
                                </tbody>
                            </table>
                        </Col>

                        <Col md={6}>
                            <table width="100%" style={{border: '1px solid lightgrey'}}>
                                <tbody>
                                    <tr ><th >User</th><td>Sample Count</td></tr>
                                    <tr ><th >User</th><td>Sample Count</td></tr>
                                    <tr ><th >User</th><td>Sample Count</td></tr>
                                    <tr ><th >User</th><td>Sample Count</td></tr>

                                </tbody>
                            </table>
                        </Col>
                    </fieldset>
                </div>
            </div>
        );
    }
}


export default AdminDataHome;