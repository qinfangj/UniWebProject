import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class PeopleListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Laboratories" name="people" content={
                    <CommonTable activeOnly={false} name="people" />
                } />
            </Layout>
        );
    }

}

export default PeopleListRoute;
