
import React from 'react';
import css from './styles.css';

import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import PeopleInsertForm from '../../../components/forms/PeopleInsertForm';


class PeopleNew extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Laboratories" name="people" content={
                    <PeopleInsertForm />
                } />
            </Layout>
        );
    }

}

export default PeopleNew;
