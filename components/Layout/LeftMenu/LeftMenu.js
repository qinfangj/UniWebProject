
import React from 'react';
import cx from 'classnames';
import css from './LeftMenu.css';
import commonCss from '../../../styles/common.css';
import { Nav, NavItem, Panel } from 'react-bootstrap/lib';


class LeftMenu extends React.Component {

    render() {
        return (
            <div>
                <div className={cx(css.leftSide, commonCss.sharp)}>

                    <div className={css.title}>
                        Tables
                    </div>

                    <Nav bsStyle="pills" stacked className={css.items}>
                        <NavItem eventKey={1}>Laboratories</NavItem>
                        <NavItem eventKey={2}>Projects</NavItem>
                        <NavItem eventKey={3}>Samples</NavItem>
                        <NavItem eventKey={3}>More</NavItem>
                    </Nav>

                </div>

                <div className={cx(css.rightSide)}>
                    {this.props.children}
                </div>

            </div>
        );
    }
}


export default LeftMenu;
