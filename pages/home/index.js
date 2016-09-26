
import React from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';

import ProjectInsertForm from '../../components/forms/ProjectInsertForm';


class HomePage extends React.Component {

  componentDidMount() {
    document.title = "UHTS LIMS Web /index";
  }

  render() {
    return (
      <Layout className={s.content}>
        <ProjectInsertForm />
      </Layout>
    );
  }

}

export default HomePage;
