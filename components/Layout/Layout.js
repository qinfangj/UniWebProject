"use strict";
import React from 'react';
import cx from 'classnames';
import css from './Layout.css';
import commonCss from '../../styles/common.css';

import Header from './Header';
import Footer from './Footer';
import ResponsiveSidebar from './Sidebar';
import Feedback from '../utils/Feedback.js';


/**
 * Wrapper component that presents the content between a header, a top menu, and a footer.
 * @example
 * <Layout>
 *   {content}
 * </Layout>
 */
class Layout extends React.PureComponent {

    render() {

        return (
            <div className={commonCss.fullwidth}>

                <ResponsiveSidebar>

                <div className={commonCss.fullwidth}>
                    <Header />

                    {/* Log server errors */}
                    <Feedback reference="REST" />

                    <div className={cx("container", css.pageContent)}>

                        <div className={cx("row", commonCss.fullwidth)}>
                            <div className={cx(css.column2)}>

                                {/* Here comes what a page puts between <Layout></Layout> */}
                                <div {...this.props} className={cx(this.props.className)} />
                                {/* End of content */}

                            </div>
                        </div>

                    </div>

                    <Footer />
                </div>

                </ResponsiveSidebar>
            </div>
        );
    }
}

export default Layout;
