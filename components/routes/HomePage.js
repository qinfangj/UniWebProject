"use strict";
import React from 'react';
import Feedback from '../utils/Feedback';
import formNames from '../constants/formNames';
import store from '../../core/store';
import css from './App.css'
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
//import {title, html} from './homePageMsg.md';

class HomePage extends React.Component {
    render() {

        let stateFeedback = store.getState().feedback;

        return (
            <div>
            <header>
                <h1>Welcome to <br />
                    Lausanne Genomic Technologies Facility!</h1>
            </header>
                <Feedback reference={formNames.SIGN_UP_FORM} />
                <Feedback reference={formNames.CHANGE_PASSWORD_FORM} />
                {

                    (stateFeedback[formNames.SIGN_UP_FORM].message === "")?
                    null :
                    <div width="80%" className={css.signUpMsg} >Your account is not active yet. <br />
                    You will be noticed by an email soon when it has been validated by an administrator.</div>
                }

                {/*<Row>
                    <Col sm={12} >
                        <div className={css.code1} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <div className={css.section1}>aside<br />float : left</div></Col>
                    <Col sm={6}>
                        <div className={css.section2}>aside<br />float : right</div></Col>
                </Row>*/}

                <Row>
                    <Col md={6}><div className={css.code1} /></Col>
                    <Col md={6}>

                        <Alert bsStyle="info">
                        This UHTS-Laboratory Information Managment System (LIMS) provides a relational database to store information related to the Illumina sequencing technology.
                        <br /><br />This UHTS-LIMS is only for internal use at DEVELOPMENT INTERFACE DNA Array Facility of the University of Lausanne.

                        </Alert>
                        <div className={css.section1}><fieldset><legend>News</legend>
                           </fieldset></div>
                    </Col>

                </Row>

            </div>
        );
    }
}


export default HomePage;