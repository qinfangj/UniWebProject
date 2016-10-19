import React from 'react';
import cx from 'classnames';
import css from './Layout.css';
import commonCss from '../../styles/common.css';

import Header from './Header';
import Footer from './Footer';
import TopMenu from './TopMenu';
import ResponsiveSidebar from './Sidebar';


class Layout extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <ResponsiveSidebar>
            <div ref={node => (this.root = node)}>
                    <Header />

                    <div className={css.pageContent}>

                    <div className={cx("container", commonCss.fullwidth)}>
                        <div className={cx("row", css.topRow)}>
                            <div className={cx("col-sm-12", css.topRowColumn)}>
                                <TopMenu />
                            </div>
                        </div>
                    </div>

                    {/* Here comes what a page puts between <Layout></Layout> */}
                    <div {...this.props} className={cx(this.props.className)} />
                    {/* End of content */}

                    </div>

                    <Footer />
            </div>
            </ResponsiveSidebar>
        );
    }
}

export default Layout;
