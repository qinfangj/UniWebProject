
import React from 'react';
import css from './LeftMenu.css';


class LeftMenu extends React.Component {
    render() {
        return (
            <div className={css.leftMenu}>
                LEFT MENU
                <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                </ul>
            </div>
        );
    }
}


export default LeftMenu;
