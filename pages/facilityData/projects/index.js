import React from 'react';
import css from './styles.css';
import Layout from '../../../components/Layout';
import FacilityData from '../../../components/pages/FacilityData';
import CommonTable from '../../../components/tables/CommonTable';


class ProjectsListRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <FacilityData title="Projects" name="projects" content={
                    <CommonTable activeOnly={false} name="projects" />
                } />
            </Layout>
        );
    }

}

export default ProjectsListRoute;
