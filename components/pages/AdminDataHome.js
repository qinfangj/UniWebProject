"use strict";
import React from 'react';
import css from './pages.css';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import { FormGroup, FormControl, Button } from 'react-bootstrap/lib';



class AdminDataHome extends React.Component {

    render() {
        return (
            <div>
                <h2 className={css.fdHomeRow}>Admin-restricted Database Browser</h2>
                <Row>
                        <p>
                            This section allows you to browse and update the different table of the database that are restricted to the administrators.
                        </p>


                    <Alert bsStyle="warning" className={css.fdHomeAlert} style={{backgroundColor: 'lightgrey'}}>
                        <Row className={css.fdHomeRow}><Col sm={12}>Select a laboratory to browse its sequencing data.</Col></Row>
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
                <Row>
                <div className={css.section}>
                    <fieldset >
                        <legend style={{marginLeft: '25px'}}>Submission Statistic</legend>
                        <Row className={css.fdHomeRow} >
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
                            </Row>
                    </fieldset>
                </div>
                </Row>
            </div>
        );
    }
}


export default AdminDataHome;