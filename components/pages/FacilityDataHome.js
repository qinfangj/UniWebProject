"use strict";
import React from 'react';
import css from './styles.css';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';


class FacilityDataHome extends React.Component {

    render() {
        return (
            <div>
                <div className={css.title}>Database Browser</div>
                <Row className={css.fdHomeRow}>
                <Alert bsStyle="info" >
                <p>
                    This section allows you to browse the different table of the database and to enter new data into the database.
                    You can also:
                </p>
                <ul>
                    <li>Generate report files of the libraries already sequenced.</li>
                    <li>Insert many libraries using a batch upload tool.</li>
                </ul>
                </Alert>

                <Alert bsStyle="warning">
                    <p>
                        [Last inserts]
                    </p>
                </Alert>
                    </Row>
            </div>
        );
    }
}


export default FacilityDataHome;