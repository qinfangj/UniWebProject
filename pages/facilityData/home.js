
import React from 'react';
import pagesCss from '../pages.css';
import Layout from '../../components/Layout';
import FacilityDataHome from '../../components/pages/FacilityDataHome';



class ProjectsListRoute extends React.Component {

    render() {
        return (
            <Layout className={pagesCss.content}>
                <FacilityDataHome />
            </Layout>
        );
    }

}

export default ProjectsListRoute;
