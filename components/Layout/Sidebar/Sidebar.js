import React from 'react';
import cx from 'classnames';
import css from './Sidebar.css';
import store from '../../../core/store';
import { toggleSidebar } from '../../actions/actionCreators/actionCreators';

import Sidebar from 'react-sidebar';
import NavLink from '../../Link/NavLink';
import { Nav, NavItem } from 'react-bootstrap/lib';


class ResponsiveSidebar extends React.Component {

    constructor() {
        super();
        this.state = {
            open: true,
            docked: true,
            mql: {},
            transitions: false,
            activeKey: "/",
        };
    }

    /* Make it responsive */

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ open: store.getState().common.sidebarOpen });
        });
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged.bind(this));
        this.setState({
            mql: mql,
            docked: mql.matches,
            activeKey: window.location.pathname,
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
    }

    mediaQueryChanged() {
        this.setState({docked: this.state.mql.matches});
    }

    /* End responsive */

    /**
     * Toggle open/close through component's onSetOpen special event.
     * Should update the store, too, but this component is the only listener.
     */
    onSetOpen(open) {
        this.setState({open: open});
    }

    onSelect(key) {
        this.setState({ activeKey: key });
    }

    render() {
        console.debug("Render sidebar", this.state.open)

        const styles = {
            sidebarLink: {
                display: 'block',
                padding: '16px 20px',
                color: '#757575',
                textDecoration: 'none',
            },
            divider: {
                margin: '8px 16px',
                height: 1,
                backgroundColor: '#757575',
            },
            content: {
                height: '100%',
                width: '214px',
                backgroundColor: 'white',
                marginTop: '60px',
            },
        };

        let activeKey = this.state.activeKey;
        let menuItems = [
            { text: "Home", to: "/", },
            { text: "Facility data", to: "/projects", },
            { text: "User data", to: "/userData", disabled: true },
            { text: "Tracking", to: "/tracking", disabled: true },
            { text: "Query projects", to: "/queryProjects", disabled: true },
            { text: "Query runs", to: "/queryRuns", disabled: true },
            { text: "Admin", to: "/admin", disabled: true },
        ];
        let items = menuItems.map((items) => {
            let {text, to, ...props} = items;
            return (
                <NavLink to={to} active={activeKey===to} {...props}>
                    {text}
                </NavLink>
            );
        });

        let sidebarContents = (
            <div style={styles.content}>
                <Nav bsStyle="pills" stacked onSelect={this.onSelect.bind(this)} className={css.items}>
                    {items}
                </Nav>
                <div style={styles.divider} />
            </div>
        );

        return (
            <Sidebar
                sidebarClassName={css.sidebar}
                overlayClassName={css.overlay}
                contentClassName={css.content}
                sidebar={sidebarContents}
                docked={this.state.docked}
                open={this.state.open}
                transitions={this.state.transitions}
                onSetOpen={this.onSetOpen.bind(this)}
            >
                {this.props.children}
            </Sidebar>
        );
    }

}


export default ResponsiveSidebar;
