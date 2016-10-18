
import React from 'react';
import css from './LeftMenu.css';


class LeftMenu extends React.Component {
    render() {
        return (
            <div className={css.leftMenu}>
                <div>
                Tables
                </div>
                <ul>
                    <li>Laboratories</li>
                    <li>Projects</li>
                    <li>Samples</li>
                </ul>
            </div>
        );
    }
}


export default LeftMenu;
