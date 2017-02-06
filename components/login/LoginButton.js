import React from 'react';
import cx from 'classnames';
import store from '../../core/store';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, NavItem } from 'react-bootstrap/lib';
import AuthService from '../../utils/AuthService';



class LoginButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        };
    }

    static propTypes = {

    };

    componentWillMount() {
        // Listen to store for changes or initial data
        this.unsubscribe = store.subscribe(() => {
            let isAuthenticated = store.getState().auth.isAuthenticated;
            this.setState({isAuthenticated})
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let dest = this.state.isAuthenticated ? "/logout" : "/login";
        let text = this.state.isAuthenticated ? "Logout" : "Login";
        // return (
        //     <LinkContainer to={dest}><NavItem>
        //         {text}
        //     </NavItem></LinkContainer>
        // );
        return (
            <NavItem><Button onClick={AuthService.login}>
                {text}
            </Button></NavItem>
        )
    }

}


export default LoginButton;
