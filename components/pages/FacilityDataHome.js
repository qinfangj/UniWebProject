import React from 'react';
import Link from '../Link';
import css from './FacilityData.css';

import LeftMenu from '../Layout/LeftMenu';


class FacilityDataHome extends React.Component {

    render() {
        return (
            <LeftMenu>
                <div className={css.title}>UHTS-LIMS database browser</div>


            </LeftMenu>
        );
    }
}


export default FacilityDataHome;