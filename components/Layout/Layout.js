import React from 'react';
import cx from 'classnames';
import css from './Layout.css';
import commonCss from '../../styles/common.css';

import Header from './Header';
import Footer from './Footer';
import TopMenu from './TopMenu';


class Layout extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <div ref={node => (this.root = node)}>
                <Header />

                <div className={cx("container", css.pageContent)}>

                    <div className={cx("row", css.topRow)}>
                        <div className={cx("col-sm-12", css.column1)}>
                            <TopMenu />
                        </div>
                    </div>

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
        );
    }
}

export default Layout;
