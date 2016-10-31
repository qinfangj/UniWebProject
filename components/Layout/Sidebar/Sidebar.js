import React from 'react';
import cx from 'classnames';
import css from './Sidebar.css';
import store from '../../../core/store';
import { toggleSidebar } from '../../actions/actionCreators/commonActionCreators';

import Sidebar from 'react-sidebar';
import Link from '../../Link/Link';
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
        this.state = {
            open: true,
            docked: true,
            mql: {},
            transitions: false,
            route: null,
            submenuOpen: true,
        };
    }

    getStoreState() {
        let storeState = store.getState().common;
        let open = storeState.sidebarOpen;
        open = open === undefined ? true : open;
        //let submenuOpen = storeState.sidebarSubmenuOpen;
        let route = storeState.route;
        route = route === undefined ? window.location.pathname : route;
        return { open, route };
    }

    /* Make it responsive */

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(this.getStoreState());
        });
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged.bind(this));
        let storeState = this.getStoreState();
        this.setState({
            open: storeState.open,
            mql: mql,
            docked: mql.matches,
            route: storeState.route,
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
     */
    onSetOpen(open) {
        store.dispatch(toggleSidebar(open));
    }

    onSelect(active) {
        let open = active ? !this.state.submenuOpen : true;
        this.setState({submenuOpen: active ? !this.state.submenuOpen : true});
        console.debug("SIDEBAR ON SELECT", {active: active, wasOpen: this.state.submenuOpen, willOpen: open})
        if (this.state.open && !this.isWide()) {
            store.dispatch(toggleSidebar(false));
        }
    }

    render() {
        console.debug("submenu", this.state.submenuOpen ? "OPEN" : "CLOSED")
        let path = this.state.route;
        if (!path) return null;
        let tables = [
            { text: "Laboratories", to: "/data/people", },
            { text: "Projects", to: "/data/projects", },
            { text: "Samples", to: "/data/samples", disabled: true },
            { text: "User requests", to: "/data/user_requests", disabled: true },
            { text: "Libraries", to: "/data/libraries", disabled: true },
            { text: "Bioanalysers", to: "/data/bioanalysers", disabled: true },
            { text: "Runs", to: "/data/runs", disabled: true },
            { text: "Base callings / demultiplexings", to: "/data/base_callings", disabled: true },
            { text: "Alignments / QC", to: "/data/alignments", disabled: true },
            { text: "Genomes", to: "/data/genomes" },
        ];
        let menuItems = [
            { text: "Home", to: "/home", },
            { text: "Facility data", to: "/data", elements: tables },
            { text: "User data", to: "/userData", disabled: true },
            { text: "Tracking", to: "/tracking", disabled: true },
            { text: "Query projects", to: "/queryProjects", disabled: true },
            { text: "Query runs", to: "/queryRuns", disabled: true },
            { text: "Admin", to: "/admin", disabled: true },
        ];
        let items = menuItems.map((items, i) => {
            let {text, to, elements, disabled, ...props} = items;
            let active = path.includes(to);
            let subitems = !elements ? null : elements.map((elt, j) => {
                let active = path.includes(elt.to);
                return (<ListGroupItem key={j}>
                            <Link to={elt.to}
                                  className={cx(css.submenuLink, active ? css.active : null, elt.disabled ? css.disabled : null)}
                            >{elt.text}</Link>
                        </ListGroupItem>);
            });
            return (
                    <ListGroupItem key={i}>
                        <Link to={to} onClick={this.onSelect.bind(this, active)} {...props}
                            className={cx(css.menuLink, active ? css.active : null, disabled ? css.disabled : null)}>
                            {text}
                        </Link>
                        { (elements && this.state.submenuOpen) ?
                            <Collapse in={path.includes("/data")}>
                                <ListGroup className={css.subitems}>
                                    {subitems}
                                </ListGroup>
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
