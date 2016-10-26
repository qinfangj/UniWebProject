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
class Layout extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <div className={css.mainLogoButton} onClick={() => store.dispatch(toggleSidebar(true))}>
                    <img src={require("../../public/images/uhts_logo5-min.png")} height="60px" />
                </div>
                <ResponsiveSidebar>

                <div>
                    <Header />

                    <div className={cx("container", css.pageContent)}>

                        <div className={cx("row")}>
                            <div className={cx("col-sm-12", css.column2, commonCss.fullheight)}>

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
