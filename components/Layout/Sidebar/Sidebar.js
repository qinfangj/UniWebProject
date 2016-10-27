import React from 'react';
import cx from 'classnames';
import css from './Sidebar.css';
import store from '../../../core/store';
import { toggleSidebar } from '../../actions/actionCreators/commonActionCreators';

import Sidebar from 'react-sidebar';
import NavLink from '../../Link/NavLink';
import Link from '../../Link/Link';
import { Nav, Accordion, Panel, Collapse, ListGroup, ListGroupItem } from 'react-bootstrap/lib';


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

    getStoreState() {
        let open = store.getState().common.sidebarOpen;
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
            activeKey: window.location.pathname,
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

    onSelect() {
        if (this.state.open && !this.isWide()) {
            store.dispatch(toggleSidebar(false));
        }
    }

    render() {
        let path = this.state.activeKey;
        if (!path) return null;
        console.debug("Sidebar activeKey:", this.state.activeKey)
        /* For some reason everything falls apart if I put this in CSS instead. */
        const contentStyle = {
            height: '100%',
            width: '152px',
            backgroundColor: 'white',
            marginTop: '70px',
        };
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
            let subitems = !elements ? null : (
                elements.map((elt, j) => {
                    let active = path.includes(elt.to);
                    return (<ListGroupItem key={j}>
                        <Link to={elt.to}
                              className={cx(css.submenuLink, active ? css.active : null, elt.disabled ? css.disabled : null)}
                        >{elt.text}</Link>
                    </ListGroupItem>);
                })
            );
            return (
                <ListGroup onSelect={this.onSelect.bind(this)} className={css.items}>
                    <ListGroupItem key={i}>
                        <Link to={to} {...props}
                            className={cx(css.menuLink, active ? css.active : null, disabled ? css.disabled : null)}>
                            {text}
                        </Link>
                        { elements ?
                            <Collapse in={path.includes("/data")}>
                                <ListGroup className={css.subitems}>
                                    {subitems}
                                </ListGroup>
                            </Collapse>
                        : null}
                    </ListGroupItem>
                </ListGroup>
            );
        });

        let sidebarContents = (
            <div style={contentStyle} className={css.content}>
                    {items}
                <div className={css.divider} />

                <Collapse in={path.includes("/data")}>
                    <ListGroup>
                        <ListGroupItem><Link to="/data/projects">Projects</Link></ListGroupItem>
                        <ListGroupItem><Link to="/data/genomes">Genomes</Link></ListGroupItem>
                    </ListGroup>
                </Collapse>

                {/*
                <Collapse in={path=="/data"}>
                    <Nav className={css.items} onSelect={this.onSelect.bind(this)}>
                        <NavLink to={"/data/genomes"} active={true}>AAA</NavLink>
                        <NavLink to={"/data/projects"} active={true}>BBB</NavLink>
                    </Nav>
                </Collapse>

                <Accordion >
                    <Panel header="Facility data" eventKey="1">
                        {items}
                    </Panel>
                    <Panel header="User data" eventKey="2">
                        {items}
                    </Panel>
                </Accordion>
                */}
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
