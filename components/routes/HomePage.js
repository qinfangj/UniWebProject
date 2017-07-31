"use strict";
import React from 'react';
import css from './App.css'
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import news from './msgHome/homePageNews.md';
import AuthService from '../../utils/AuthService';
import * as fb from '../../utils/feedback';


class HomePage extends React.Component {
    render() {

        let feedback = null;
        if (! AuthService.isLoggedIn) {
            feedback = <Alert bsStyle="info">"Please log in"</Alert>;
        } else if (! AuthService.isValidated) {
            feedback = <Alert bsStyle="info">
                Your account is not active yet.<br />
                You will be noticed by an email soon when it has been validated by an administrator.</Alert>;
        } else {
            feedback = <div style={{marginTop: '25px'}} />
        }

        return (
            <div>

            <button onClick={() => fb.success("Test this long feed back mes -sage such as an inser -tion or a deletion of some thing int he data base")} />
                <button onClick={() => fb.info("Test this long feed back mes -sage such as an inser -tion or a deletion of some thing int he data base")} />
                <button onClick={() => fb.error("Test this long feed back mes -sage such as an inser -tion or a deletion of some thing int he data base")} />
                <button onClick={() => fb.warning("Test this long feed back mes -sage such as an inser -tion or a deletion of some thing int he data base")} />

            <header>
                <h2>Welcome to Lausanne Genomic Technologies Facility!</h2>
            </header>

                { feedback }

                <Row className={css.row}>
                    <Col md={6}><div className={css.code1}/></Col>
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