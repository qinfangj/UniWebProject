import React from 'react';
import cx from 'classnames';
import css from './Layout.css';
import commonCss from '../../styles/common.css';

import store from '../../core/store';
import { toggleSidebar } from '../actions/actionCreators/commonActionCreators';

import Header from './Header';
import Footer from './Footer';
import ResponsiveSidebar from './Sidebar';


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
                <div className={css.mainLogoButton} onClick={() => store.dispatch(toggleSidebar(true))}>
                    <img src={require("../../public/images/uhts_logo5-min.png")} height="60px" />
                </div>
                <ResponsiveSidebar>

                <div className={commonCss.fullwidth}>
                    <Header />

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
