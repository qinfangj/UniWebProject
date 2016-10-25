import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';

import GenomesInsertForm from '../../../components/forms/GenomesInsertForm';


class GenomesNew extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Genomes" name="genomes" content={
                    <GenomesInsertForm/>
                } />
            </Layout>
        );
    }

}

export default GenomesNew;
