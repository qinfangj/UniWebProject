
import React from 'react';
import css from './styles.css';

import Layout from '../../../components/Layout';
import People from '../../../components/pages/People/People';
import PeopleTable from '../../../components/tables/PeopleTable';


class GenomesActiveRoute extends React.Component {

    render() {
        return (
            <Layout className={css.content}>
                <People content={<PeopleTable activeOnly={true}/>} />
            </Layout>
        );
    }

}

export default GenomesActiveRoute;
