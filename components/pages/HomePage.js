"use strict";
import React from 'react';
import css from '../routes/App.css'
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import news from './homePageNews.md';
import AuthService from '../../utils/AuthService';


class HomePage extends React.Component {
    render() {

        let feedback = null;
        if (! AuthService.isLoggedIn) {
            feedback = <Alert bsStyle="info">{"Please log in"}</Alert>;
        } else if (! AuthService.isValidated) {
            feedback = <Alert bsStyle="info">
                Your account is not active yet.<br />
                You will be noticed by email as soon as it has been validated by an administrator.</Alert>;
        } else {
            feedback = <div style={{marginTop: '25px'}} />
        }

        return (
            <div>

            <header>
                <h2>Welcome to Lausanne Genomic Technologies Facility!</h2>
            </header>

                { feedback }

                <Row className={css.row}>
                    <Col md={6}><div className={css.code1}/></Col>
                    <Col md={6}>
                        <div height='40%' className={css.msgDiv}>
                            <p style={{textIntent:'50px'}}>
                                This Laboratory Information Managment System (LIMS)
                                provides a relational database to store the information related to the Illumina
                                sequencing technology.
                            </p>
                            <p>
                                This LIMS is only for the internal use on INTERFACE DEVELOPMENT of
                                DNA Array Facility at Lausanne University.
                            </p>
                        </div>

                        <Alert bsStyle="info" className={css.msgDiv}>
                            <fieldset>
                                <legend>News</legend>
                                <div dangerouslySetInnerHTML={{__html: news}} />
                            </fieldset>
                        </Alert>
                    </Col>
                </Row>

            </div>
        );
    }
}


export default HomePage;