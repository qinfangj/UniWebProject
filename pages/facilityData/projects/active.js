
import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class ProjectsActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Projects" name="projects" content={
                    <CommonTable activeOnly={true} name="projects" />
                } />
            </Layout>
        );
    }

}

export default ProjectsActiveRoute;
