import React from 'react';
import cx from 'classnames';
import css from './Layout.css';

import Header from './Header';
import Footer from './Footer';
import LeftMenu from './LeftMenu';
import TopMenu from './TopMenu';


class Layout extends React.Component {

    render() {
        return (
            <div ref={node => (this.root = node)}>
                <div>
                    <Header />

                    <div className="container">
                    <div className={cx("row", css.row)}>

                        <div className="col-sm-12">
                            <TopMenu />
                        </div>
                        <div className="col-sm-2">
                            <LeftMenu />
                        </div>

                        <div className="col-sm-10">
                        {/* Here comes what a page puts between <Layout></Layout> */}
                        <div {...this.props} className={cx(css.pageContent, this.props.className)} />
                        {/* End of content */}
                        </div>

                    </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default Layout;
