
import React from 'react';
import css from './TopMenu.css';
import Link from '../../Link';

import { Nav, NavItem } from 'react-bootstrap/lib';



class TopMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            activeKey: 1,
        };
    }

    onSelect(key) {
        this.setState({ activeKey: key });
    }

    render() {
        return (
            <div className={css.topMenu} role="navigation">
                <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.onSelect.bind(this)}>
                    <NavItem eventKey={1}>Home</NavItem>
                    <NavItem eventKey={2}>Facility data</NavItem>
                    <NavItem eventKey={3}>User data</NavItem>
                    <NavItem eventKey={4}>Tracking</NavItem>
                    <NavItem eventKey={5}>Query projects</NavItem>
                    <NavItem eventKey={6}>Query runs</NavItem>
                    <NavItem eventKey={7} disabled>Admin</NavItem>
                </Nav>
            </div>
        );
    }
}


export default TopMenu;
