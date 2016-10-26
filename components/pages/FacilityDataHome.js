import React from 'react';
import Link from '../Link';
import css from './FacilityDataHome.css';

import LeftMenu from '../Layout/LeftMenu';


class FacilityDataHome extends React.Component {

    tables = [
        {
            name: "people",
            label: "Laboratories",
        },
        {
            name: "projects",
            label: "Projects",
        },
        {
            name: "genomes",
            label: "Genomes"
        },
    ];

    render() {
        let links = this.tables.map(t => {
            return (<li key={t.name} className={css.link}>
                <Link to={`/data/${t.name}`}>{t.label}</Link>
            </li>);
        });

        return (
            <LeftMenu>
                <h1 className={css.h1}>Facility data</h1>
                <ul>
                    {links}
                </ul>
            </LeftMenu>
        );
    }
}


export default FacilityDataHome;