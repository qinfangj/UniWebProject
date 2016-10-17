import React from 'react';
import Link from '../Link';
import cx from 'classnames';
import css from './Header.css';

import { Nav, NavItem } from 'react-bootstrap/lib';



class Header extends React.Component {

  render() {
    return (
        <div className={cx("container", css.header)}>
            <div className={cx("row", css.row)}>
                <span className="col-sm-2 pull-left">
                    <img src={require("../../public/images/gtf_logo.png")} height="60px" />
                </span>
                <span className="col-sm-2 col-sm-offset-3">
                    <img src={require("../../public/images/uhts_logo2.png")} height="60px" />
                </span>
                <div className={cx("pull-right", css.nav)}>
                    <span className={css.vcenter}>
                        <Nav bsStyle="pills">
                            <NavItem>Account</NavItem>
                            <NavItem>Logout</NavItem>
                        </Nav>
                    </span>
                </div>
             </div>
        </div>
    );
  }

}

export default Header;
