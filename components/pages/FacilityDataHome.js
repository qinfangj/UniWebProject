import React from 'react';
import Link from '../Link';
import css from './FacilityData.css';

import LeftMenu from '../Layout/LeftMenu';


class FacilityDataHome extends React.Component {

    render() {
        return (
            <LeftMenu>
                <div className={css.title}>UHTS-LIMS database browser</div>
                <p>
                    This section allows you to browse the different table of the database and to enter new data into the database.
                    You can also:
                    <ul>
                        <li>Generate report files of the libraries already sequenced.</li>
                        <li>Insert many libraries using a batch upload tool.</li>
                    </ul>
                </p>

                <div>
                    <p>
                        [Last inserts]
                    </p>
                </div>

            </LeftMenu>
        );
    }
}


export default FacilityDataHome;