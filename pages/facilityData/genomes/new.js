import React from 'react';
import css from '../../../styles/common.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';

import GenomesInsertForm from '../../../components/forms/GenomesInsertForm';


class GenomesNew extends React.Component {

    render() {
        return (
            <Layout className={css.fulldim}>
                <FacilityData title="Genomes" name="genomes" content={
                    <GenomesInsertForm/>
                } />
            </Layout>
        );
    }

}

export default GenomesNew;
