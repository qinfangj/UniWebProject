
import React from 'react';
import cx from 'classnames';
import css from './index.css';
import pagesCss from '../pages.css';

import Layout from '../../components/Layout';


class HomePage extends React.Component {

  componentDidMount() {
    document.title = "UHTS LIMS Web /index";
  }

  render() {
    return (
      <Layout className={pagesCss.content}>

        <h1>Welcome to the Lausanne Genomic Technologies Facility!</h1>

      </Layout>
    );
  }

}

export default HomePage;
