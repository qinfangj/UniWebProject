import React from 'react';
import css from './Sidebar.css';
import store from '../../../core/store';

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
                padding: '16px 20px',
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
                width: '215px',
                backgroundColor: 'white',
                marginTop: '50px',
            },
        };
        let sidebarContents = (
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
