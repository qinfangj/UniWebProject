import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';

import GenomesTable from '../../../components/tables/GenomesTable';


class GenomesListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Genomes" name="genomes" content={
                    <GenomesTable activeOnly={false}/>
                } />
            </Layout>
        );
    }

}

export default GenomesListRoute;
