import React from 'react';
import css from '../../../styles/common.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class GenomesListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.fulldim}>
                <FacilityData title="Genomes" name="genomes" content={
                    <CommonTable activeOnly={false} name="genomes" />
                } />
            </Layout>
        );
    }

}

export default GenomesListRoute;
