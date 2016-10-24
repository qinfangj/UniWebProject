
import React from 'react';
import css from './styles.css';

import Layout from '../../../components/Layout';
import People from '../../../components/pages/People/People';
import ProjectInsertForm from '../../../components/forms/ProjectInsertForm';


class GenomesNew extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <People content={<ProjectInsertForm />} />
            </Layout>
        );
    }

}

export default GenomesNew;
