import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class GenomesActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Genomes" name="genomes" content={
                    <CommonTable activeOnly={true} name="genomes" />
                } />
            </Layout>
        );
    }

}

export default GenomesActiveRoute;
