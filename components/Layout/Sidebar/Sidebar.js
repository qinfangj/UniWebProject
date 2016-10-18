import React from 'react';
import cx from 'classnames';
import css from './Sidebar.css';

import Sidebar from 'react-sidebar';
import Panel from 'react-bootstrap/lib/Panel';


const contentStyles = {
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
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged.bind(this));
        this.setState({mql: mql, docked: mql.matches});
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
    }

    mediaQueryChanged() {
        this.setState({docked: this.state.mql.matches});
    }

    /* End responsive */

    /**
     * Toggle open/close through comppnent's onSetOpen special event.
     */
    onSetOpen(open) {
        this.setState({open: open});
    }

    /**
     * Toggle open/close when button is clicked manually.
     */
    toggleOpen(e) {
        this.setState({open: !this.state.open});
        if (e) {
            e.preventDefault();
        }
    }

    render() {

        let toggleSpan = (className) => (
            <span>
                {!this.state.docked &&
                 <a onClick={this.toggleOpen.bind(this)} href="#" className={className}>
                     =
                 </a>}
            </span>
        );

        let sidebarContents = (
            <Panel className={css.sidebarContents}>
                <div style={contentStyles.content}>
                    <a href="index.html" style={contentStyles.sidebarLink}>
                        Home
                    </a>
                    <a href="responsive_example.html" style={contentStyles.sidebarLink}>
                        Responsive Example
                    </a>
                    <div style={contentStyles.divider} />
                </div>
            </Panel>
        );

        return (
            <Sidebar
                sidebarClassName={css.sidebar}
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