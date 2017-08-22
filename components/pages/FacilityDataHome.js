"use strict";
import React from 'react';
import css from './pages.css';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';


class FacilityDataHome extends React.Component {

    render() {
        return (
            <div >
                <h2 style={{textAlign:'center'}}>Database Browser</h2>
                {/*<Row className={css.fdHomeRow}>*/}
                {/*<Alert bsStyle="info" >*/}
                <p className={css.fdHomeMsg}>
                    This section allows you to browse the different table of the database and to enter new data into the database.
                </p>


                <Alert bsStyle="info" className={css.fdHomeAlert}>

                    <fieldset>
                        <legend>Recent Updates</legend>
                        <ul>
                            <li>update 1</li>
                            <li>update 2</li>
                        </ul>
                    </fieldset>

                </Alert>
                    {/*</Row>*/}
            </div>
        );
    }
}


export default FacilityDataHome;