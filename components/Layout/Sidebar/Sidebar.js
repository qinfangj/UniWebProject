import React from 'react';
import cx from 'classnames';
import css from './Sidebar.css';
import store from '../../../core/store';
import { toggleSidebar } from '../../actions/actionCreators/actionCreators';

import Sidebar from 'react-sidebar';


class ResponsiveSidebar extends React.Component {

    constructor() {
        super();
        this.state = {
            open: true,
            docked: true,
            mql: {},
            transitions: false,
        };
    }

    /* Make it responsive */

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ open: store.getState().common.sidebarOpen });
        });
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged.bind(this));
        this.setState({mql: mql, docked: mql.matches});
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

    render() {
        console.debug("Render sidebar", this.state.open)

        const styles = {
            sidebarLink: {
                display: 'block',
                padding: '16px 0px',
                color: '#757575',
                textDecoration: 'none',
            },
            divider: {
                margin: '8px 0',
                height: 1,
                backgroundColor: '#757575',
            },
            content: {
                padding: '16px',
                height: '100%',
                backgroundColor: 'white',
            },
        };
        let sidebarContents = (
            <div className={css.sidebarContent}>
                {/*
                <div className={css.sidebarLogo}>
                    <img src={require("../../../public/images/uhts_logo5.png")} height="60px" />
                </div>
                */}
                <div style={styles.content}>
                    <a href="index.html" style={styles.sidebarLink}>
                        Home
                    </a>
                    <a href="#" style={styles.sidebarLink}>
                        Facility data
                    </a>
                    <a href="#" style={styles.sidebarLink}>
                        User data
                    </a>
                    <a href="#" style={styles.sidebarLink}>
                        Tracking
                    </a>
                    <a href="#" style={styles.sidebarLink}>
                        Query projects
                    </a>
                    <a href="#" style={styles.sidebarLink}>
                        Query runs
                    </a>
                    <a href="#" style={styles.sidebarLink}>
                        Admin
                    </a>
                    <div style={styles.divider} />
                </div>
            </div>
        );

        return (
            <Sidebar
                sidebarClassName={css.sidebar}
                overlayClassName={css.overlay}
                contentClassName={css.content}
                sidebar={sidebarContents}
                docked={true}
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
