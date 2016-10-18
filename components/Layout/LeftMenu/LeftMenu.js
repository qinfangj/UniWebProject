
import React from 'react';
import css from './LeftMenu.css';
import Sidebar from 'react-sidebar';


const sidebarStyles = {
    root: {
        position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
    },
    sidebar: {
        zIndex: 2,
            position: 'absolute',
            top: 0,
            bottom: 0,
            transition: 'transform .3s ease-out',
            WebkitTransition: '-webkit-transform .3s ease-out',
            willChange: 'transform',
            overflowY: 'auto',
    },
    content: {
        position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'auto',
            transition: 'left .3s ease-out, right .3s ease-out',
    },
    overlay: {
        zIndex: 1,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity .3s ease-out',
            backgroundColor: 'rgba(100,0,0,.3)',
    },
    dragHandle: {
        zIndex: 1,
            position: 'fixed',
            top: 0,
            bottom: 0,
    },
};


class LeftMenu extends React.Component {
    constructor() {
        super();
        this.state = {open: true};
    }

    onSetSidebarOpen(open) {
        this.setState({open});
    }

    render() {

        let content = <div className={css.leftMenu}>
            <div>
                Tables
            </div>
            <ul>
                <li>Laboratories</li>
                <li>Projects</li>
                <li>Samples</li>
            </ul>
        </div>;

        return (
            <Sidebar sidebar={<b>Sidebar content</b>}
                     open={this.state.open}
                     onSetOpen={this.onSetSidebarOpen.bind(this)}
                     docked
                     styles={sidebarStyles}
                     style={{backgroundColor: "red"}}
            >
                <ul>
                    <li>A</li>
                </ul>
            </Sidebar>
        );
    }
}


export default LeftMenu;
