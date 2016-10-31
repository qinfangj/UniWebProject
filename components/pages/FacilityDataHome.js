import React from 'react';
import css from './FacilityData.css';


class FacilityDataHome extends React.Component {

    render() {
        return (
            <div>
                <div className={css.title}>Database browser</div>
                <p>
                    This section allows you to browse the different table of the database and to enter new data into the database.
                    You can also:
                </p>
                <ul>
                    <li>Generate report files of the libraries already sequenced.</li>
                    <li>Insert many libraries using a batch upload tool.</li>
                </ul>

                <div>
                    <p>
                        [Last inserts]
                    </p>
                </div>
            </div>
        );
    }
}


export default FacilityDataHome;