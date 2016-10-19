
import React from 'react';
import cx from 'classnames';
import css from './TopMenu.css';
import commonCss from '../../../styles/common.css';

import { Nav, NavItem } from 'react-bootstrap/lib';
import NavLink from '../../Link/NavLink';



class TopMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            activeKey: window.location.pathname,
        };
    }

    componentDidMount() {
        this.onSelect(this.state.activeKey);
    }

    onSelect(key) {
        this.setState({ activeKey: key });
    }

    render() {
        let activeKey = this.state.activeKey;
        return (
            <div className={cx(css.topMenu, commonCss.fullwidth)} role="navigation">
                <Nav bsStyle="tabs" onSelect={this.onSelect.bind(this)}>
                    <NavLink to="/" active={activeKey==="/"}>
                        Home
                    </NavLink>
                    <NavLink to="/projects" active={activeKey==="/projects"}>
                        Facility data
                    </NavLink>
                    <NavItem eventKey={3} disabled>
                        User data
                    </NavItem>
                    <NavItem eventKey={4} disabled>
                        Tracking
                    </NavItem>
                    <NavItem eventKey={5} disabled>
                        Query projects
                    </NavItem>
                    <NavItem eventKey={6} disabled>
                        Query runs
                    </NavItem>
                    <NavItem eventKey={7} disabled>
                        Admin
                    </NavItem>
                </Nav>
            </div>
        );
    }
}


export default TopMenu;
