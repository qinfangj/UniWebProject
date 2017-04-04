"use strict";
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import css from './Header.css';
import commonCss from '../../../styles/common.css';
import LoginButton from '../../login/LoginButton';
import LogoutButton from '../../login/LogoutButton';
import Icon from 'react-fontawesome';
import { toggleSidebar } from '../../actions/actionCreators/commonActionCreators';

import { Nav, NavItem } from 'react-bootstrap/lib';
import { LinkContainer } from 'react-router-bootstrap';



class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let login = this.props.isAuthenticated ? <LogoutButton/> : <LoginButton/>;
        return (
            <div className={cx(css.header)}>
                <div className={cx(css.headerRow, commonCss.fullwidth)}>

                    {/* Menu toggling button */}

                    <div className={css.menuToggleButton} onClick={() => this.props.toggleSidebar(true)}>
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
                            <LinkContainer to='/account'><NavItem>Account</NavItem></LinkContainer>
                            {/*<NavItem disabled> </NavItem>*/}
                            {/*<NavItem disabled> </NavItem>*/}
                            {/*<NavItem disabled> </NavItem>*/}
                        </Nav>
                    </div>

                 </div>
            </div>
        );
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        //sidebarOpen: state.common.sidebarOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSidebar: (open) => dispatch(toggleSidebar(open)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
