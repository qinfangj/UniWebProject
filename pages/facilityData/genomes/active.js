import React from 'react';
import css from '../../../styles/common.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class GenomesActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.fulldim}>
                <FacilityData title="Genomes" name="genomes" content={
                    <CommonTable activeOnly={true} name="genomes" />
                } />
            </Layout>
        );
    }

}

export default GenomesActiveRoute;
