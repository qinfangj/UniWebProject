
import React from 'react';
import cx from 'classnames';
import css from './index.css';

import Layout from '../../components/Layout';


class HomePage extends React.Component {

  componentDidMount() {
    document.title = "UHTS LIMS Web /index";
  }

  render() {
    return (
      <Layout className={css.content}>

        <h1>Welcome to the Lausanne Genomic Technologies Facility!</h1>

      </Layout>
    );
  }

}

export default HomePage;
