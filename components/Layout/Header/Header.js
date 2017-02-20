"use strict";
import React from 'react';
import store from '../../../core/store';
import cx from 'classnames';
import css from './Header.css';
import commonCss from '../../../styles/common.css';
import LoginButton from '../../login/LoginButton';
import LogoutButton from '../../login/LogoutButton';
import Icon from 'react-fontawesome';
import { toggleSidebar } from '../../actions/actionCreators/commonActionCreators';

import { Nav, NavItem } from 'react-bootstrap/lib';



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            sidebarOpen: true,
        };
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            let isAuthenticated = store.getState().auth.isAuthenticated;
            let sidebarOpen = store.getState().common.sidebarOpen;
            this.setState({isAuthenticated, sidebarOpen});
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let login = this.state.isAuthenticated ? <LogoutButton/> : <LoginButton/>;
        return (
            <div className={cx(css.header)}>
                <div className={cx(css.headerRow, commonCss.fullwidth)}>

                    {/* Menu toggling button */}

                    <div className={css.menuToggleButton} onClick={() => store.dispatch(toggleSidebar(true))}>
                        <Icon name='bars'/>
                    </div>

                    {/* Flowcell image */}

                    <span className={cx(css.leftItem)}>
                        <div className={css.flowcellImage}/>
                    </span>

                    {/* GTF logo */}

                    <span className={cx(css.leftItem)}>
                        <div className={css.gtfLogo}/>
                    </span>

                    {/* Right-side navbar */}

                    <div className={cx("pull-right", css.navBar)}>
                        <Nav bsStyle="pills">
                            {login}
                            <NavItem disabled>---</NavItem>
                            <NavItem disabled>---</NavItem>
                            <NavItem disabled>Account</NavItem>
                        </Nav>
                    </div>

                 </div>
            </div>
        );
    }

}

export default Header;
