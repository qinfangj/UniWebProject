
import React from 'react';
import cx from 'classnames';
import css from './index.css';

import Layout from '../../components/Layout';
import LeftMenu from '../../components/Layout/LeftMenu';
import ProjectInsertForm from '../../components/forms/ProjectInsertForm';


class HomePage extends React.Component {

  componentDidMount() {
    document.title = "UHTS LIMS Web /index";
  }

  render() {
    return (
      <Layout className={css.content}>

        <div className="container">
          <div className={cx("row", css.row)}>

            <div className="col-sm-3">
              <LeftMenu />
            </div>

            <div className="col-sm-9">
              <ProjectInsertForm />
            </div>

          </div>
        </div>
      </Layout>
    );
  }

}

export default HomePage;
