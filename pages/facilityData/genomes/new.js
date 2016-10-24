import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';

import ProjectInsertForm from '../../../components/forms/ProjectInsertForm';


class GenomesNew extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Genomes" name="genomes" content={
                    <ProjectInsertForm/>
                } />
            </Layout>
        );
    }

}

export default GenomesNew;
