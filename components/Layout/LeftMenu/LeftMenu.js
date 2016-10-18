
import React from 'react';
import css from './LeftMenu.css';
import { Nav, NavItem } from 'react-bootstrap/lib';


class LeftMenu extends React.Component {

    render() {
        return (
            <div className={css.leftMenu}>
                <div className={css.title}>
                    Tables
                </div>

                <Nav bsStyle="pills" stacked>
                    <NavItem eventKey={1}>Laboratories</NavItem>
                    <NavItem eventKey={2}>Projects</NavItem>
                    <NavItem eventKey={3}>Samples</NavItem>
                </Nav>
            </div>
        );
    }
}


export default LeftMenu;
