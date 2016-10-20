import React from 'react';
import Link from '../../Link';
import cx from 'classnames';
import css from './Header.css';

import { Nav, NavItem } from 'react-bootstrap/lib';



class Header extends React.Component {

  render() {
    return (
        <div className={cx(css.header)}>
            <div className={cx(css.row)}>

                <div className={cx("pull-right", css.navBar)}>
                    <Nav bsStyle="pills">
                        <NavItem>Account</NavItem>
                        <NavItem>Logout</NavItem>
                    </Nav>
                </div>

             </div>
        </div>
    );
  }

}

export default Header;
