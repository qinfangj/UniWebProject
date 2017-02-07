import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, NavItem } from 'react-bootstrap/lib';



class LoginButton extends React.PureComponent {

    render() {
        return (
            <LinkContainer to="/login"><NavItem>
                Login
            </NavItem></LinkContainer>
        );
    }

}


export default LoginButton;
