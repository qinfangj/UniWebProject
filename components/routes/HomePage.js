"use strict";
import React from 'react';
import formNames from '../constants/formNames';
import store from '../../core/store';
import css from './App.css'
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import file from './msgHome/homePageNews.md';


class HomePage extends React.Component {
    render() {

        let stateFeedback = store.getState().feedback;

        return (
            <div>
            <header>
                <h2>Welcome to
                   Lausanne Genomic Technologies Facility!</h2>
            </header>
                {
                    (stateFeedback[formNames.SIGN_UP_FORM].message === "") ? null :

                    <div width="80%" className={css.signUpMsg} >
                        Your account is not active yet.<br />
                        You will be noticed by an email soon when it has been validated by an administrator.
                    </div>
                }

                <Row className={css.row}>
                    <Col md={6}><div className={css.code1} /></Col>
                    <Col md={6}>
                        <div height='40%' className={css.msgDiv}>
                            <p style={{textIntent:'50px'}}>
                                This UHTS-Laboratory Information Managment System (LIMS)
                                provides a relational database to store the information related to the Illumina
                                sequencing technology.
                            </p>
                            <p>
                                This UHTS-LIMS is only for the internal use on INTERFACE DEVELOPMENT of
                                DNA Array Facility at Lausanne University.
                            </p>
                        </div>

                        <Alert bsStyle="info" className={css.msgDiv}>
                            <fieldset><legend>News</legend>
                                <div dangerouslySetInnerHTML={{__html: file}} />
                            </fieldset>
                        </Alert>
                    </Col>

                </Row>

            </div>
        );
    }
}


export default HomePage;