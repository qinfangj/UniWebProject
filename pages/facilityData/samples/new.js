import React from 'react';
import css from '../../../styles/common.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import SamplesInsertForm from '../../../components/forms/SamplesInsertForm';


class ProjectsNew extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Samples" name="samples" content={
                    <SamplesInsertForm/>
                } />
            </Layout>
        );
    }

}

export default ProjectsNew;
