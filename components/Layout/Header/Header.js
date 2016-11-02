import React from 'react';
import cx from 'classnames';
import css from './Header.css';
import commonCss from '../../../styles/common.css';

import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap/lib';



class Header extends React.Component {

    render() {
        return (
            <div className={cx(css.header)}>
                <div className={cx(css.headerRow, commonCss.fullwidth)}>

                    <span className={cx(css.leftItem)}>
                        <span className={css.mainLogoFiller}>
                            <img src={require("../../../public/images/uhts_logo5-min.png")} height="60px" />
                        </span>
                    </span>

                    <span className={cx(css.leftItem)}>
                        <img className={css.gtfLogo} src={require("../../../public/images/gtf_logo.png")} height="55px" />
                    </span>

                    <div className={cx("pull-right", css.navBar)}>
                        <Nav bsStyle="pills">
                            <NavItem disabled>Account</NavItem>
                            <NavItem disabled>Logout</NavItem>
                        </Nav>
                    </div>

                 </div>
            </div>
        );
    }

}

export default Header;
