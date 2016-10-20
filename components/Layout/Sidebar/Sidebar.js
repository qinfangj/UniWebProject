import React from 'react';
import cx from 'classnames';
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

    /**
     * Toggle open/close when button is clicked manually.
     * Should update the store, too, but this component is the only listener.
     */
    toggleOpen(e) {
        this.setState({open: !this.state.open});
        if (e) {
            e.preventDefault();
        }
    }

    render() {
        console.debug("Render sidebar", this.state.open)

        let toggleSpan = (className) => (
            <span>
                {!this.state.docked &&
                 <a onClick={this.toggleOpen.bind(this)} href="#" className={className}>
                     =
                 </a>}
            </span>
        );

        let sidebarContents = (
            <div className={css.sidebarContent}>
                <div className={css.sidebarLogo}>
                    <img src={require("../../../public/images/uhts_logo5.png")} height="60px" />
                </div>
                <div className={css.sidebarItems}>
                    <a href="index.html" className={css.sidebarLink}>
                        Home
                    </a>
                    <a href="#" className={css.sidebarLink}>
                        Facility data
                    </a>
                    <a href="#" className={css.sidebarLink}>
                        User data
                    </a>
                    <a href="#" className={css.sidebarLink}>
                        Tracking
                    </a>
                    <a href="#" className={css.sidebarLink}>
                        Query projects
                    </a>
                    <a href="#" className={css.sidebarLink}>
                        Query runs
                    </a>
                    <a href="#" className={css.sidebarLink}>
                        Admin
                    </a>
                    <div className={css.sidebarDivider} />
                </div>
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
