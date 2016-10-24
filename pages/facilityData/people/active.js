
import React from 'react';
import css from './styles.css';

import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import PeopleTable from '../../../components/tables/PeopleTable';


class PeopleActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Laboratories" name="people" content={
                    <PeopleTable activeOnly={true}/>
                } />
            </Layout>
        );
    }

}

export default PeopleActiveRoute;
