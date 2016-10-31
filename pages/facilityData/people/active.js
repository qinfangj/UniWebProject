import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class PeopleActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Laboratories" name="people" content={
                    <CommonTable activeOnly={true} name="people" />
                } />
            </Layout>
        );
    }

}

export default PeopleActiveRoute;
