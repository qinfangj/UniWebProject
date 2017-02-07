import React from 'react';
import store from '../../core/store';
import { NavItem } from 'react-bootstrap/lib';
import AuthService from '../../utils/AuthService';
import { browserHistory } from 'react-router';
import { logout } from '../actions/actionCreators/authActionCreators';



class LogoutButton extends React.PureComponent {

    logout() {
        AuthService.logout();
        store.dispatch(logout());
        browserHistory.push("/login");
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
