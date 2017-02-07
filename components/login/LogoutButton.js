import React from 'react';
import store from '../../core/store';
import cx from 'classnames';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, NavItem } from 'react-bootstrap/lib';
import AuthService from '../../utils/AuthService';
import { browserHistory } from 'react-router';
import { logout } from '../actions/actionCreators/authActionCreators';



class LogoutButton extends React.PureComponent {

    logout() {
        AuthService.logout();
        store.dispatch(logout());
        browserHistory.push("/home");
    }

    render() {
        return (
            <NavItem onClick={this.logout}>
                Logout
            </NavItem>
        );
    }

}


export default LogoutButton;
