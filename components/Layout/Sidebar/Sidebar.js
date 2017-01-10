import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cx from 'classnames';
import css from './Sidebar.css';
import store from '../../../core/store';
import { toggleSidebar } from '../../actions/actionCreators/commonActionCreators';

import Sidebar from 'react-sidebar';
import * as submenus from './submenus';
import { Link } from 'react-router';
import { Collapse, ListGroup, ListGroupItem } from 'react-bootstrap/lib';


/**
 * Left menu sidebar.
 * It is docked as long as the display is larger than 800px,
 * and gets overlaid when the display is narrower.
 * Since its elements are links that trigger route changes,
 * they trigger actions instead of just updating the state:
 * a route change will reconstruct the conponents.
 */
class ResponsiveSidebar extends React.Component {

    constructor() {
        super();
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            open: true,
            docked: true,
            mql: {},
            transitions: true,
            submenuOpen: true,
        };
    }

    getStoreState() {
        let storeState = store.getState().common;
        let open = storeState.sidebarOpen;
        open = open === undefined ? true : open;
        return { open };
    }

    /* Make it responsive */

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(this.getStoreState());
        });
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged.bind(this));
        this.setState({
            open: this.getStoreState().open,
            mql: mql,
            docked: mql.matches,
        });
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
        this.unsubscribe();
    }

    mediaQueryChanged() {
        this.setState({docked: this.isWide()});
    }

    isWide() {
        return this.state.mql.matches;
    }

    /* End responsive */

    /**
     * Toggle open/close through component's onSetOpen special event.
     * It must use the store instead of state directly because there must be an
     * external component to reopen the sidebar when closed.
     */
    onSetOpen(open) {
        store.dispatch(toggleSidebar(open));
    }

    onSelect(active) {
        let newState = {submenuOpen: active ? !this.state.submenuOpen : true};
        //console.debug("SIDEBAR ON SELECT", {active: active, wasOpen: this.state.submenuOpen, willOpen: open})
        if (this.state.open && !this.isWide()) {
            this.onSetOpen(false);
        }
        this.setState(newState);
    }

    render() {
        //console.debug("submenu", this.state.submenuOpen ? "OPEN" : "CLOSED")
        let path = window.location.pathname;
        if (!path) return null;
        let menuItems = [
            { text: "Home", to: "/home", },
            { text: "Facility data", to: "/data", elements: submenus.facilityDataSubmenu },
            { text: "User data", to: "/userData", disabled: true },
            { text: "Tracking", to: "/tracking", disabled: true },
            { text: "Query projects", to: "/projects", elements: submenus.queryProjectsSubmenu },
            { text: "Query runs", to: "/queryRuns", disabled: true },
            { text: "Admin", to: "/admin", disabled: true },
        ];
        let items = menuItems.map((items, i) => {
            let {text, to, elements, disabled, ...props} = items;
            console.log(path, to, path.startsWith(to))
            let active = path.startsWith(to);
            let subitems = !elements ? null : elements.map((elt, j) => {
                let active = path.includes(elt.to);
                return (
                    <ListGroupItem key={j}>
                        <Link to={elt.to} onClick={elt.action}
                              className={cx(css.submenuLink, active ? css.active : null,
                                                             elt.disabled ? css.disabled : null)}
                        >{elt.text}</Link>
                    </ListGroupItem>
                );
            });
            return (
                <ListGroupItem key={i}>
                    <Link to={to} onClick={this.onSelect.bind(this, active)} {...props}
                        className={cx(css.menuLink, active ? css.active : null,
                                                    disabled ? css.disabled : null)}>
                        {text}
                    </Link>
                    { elements ?
                        <Collapse in={active && this.state.submenuOpen}>
                            <div className={css.subitemsWrapper}>
                                <ListGroup className={css.subitems}>
                                    {subitems}
                                </ListGroup>
                            </div>
                        </Collapse>
                    : null}
                </ListGroupItem>
            );
        });

        /* Styles are written in element.style so they need to be overwritten in JS, not CSS
         * Here is what we can pass to Sidebar: https://github.com/balloob/react-sidebar#styles
         */
        const sidebarStyles = {
            sidebar: {
                //overflowY: 'visible',
            },
            content: {} // this one is the right side
        };
        /* Content of the sidebar (left side) */
        const contentStyle = {
            height: '100%',
            width: '152px',
            backgroundColor: 'white',
            marginTop: '70px',
        };
        let sidebarContents = (
            <div style={contentStyle}>
                <ListGroup className={css.items}>
                    {items}
                </ListGroup>
                <div className={css.divider} />
            </div>
        );

        return (
            <Sidebar
                sidebarClassName={css.sidebar}
                styles={sidebarStyles}
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
