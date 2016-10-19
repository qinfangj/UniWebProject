
import React from 'react';
import cx from 'classnames';
import css from './LeftMenu.css';
import commonCss from '../../../styles/common.css';
import { Nav, NavItem, Panel } from 'react-bootstrap/lib';
import NavLink from '../../Link/NavLink';


/**
 * Wrapper component that adds a left side bar.
 * @example
 * <LeftMenu>
 *   {content}
 * </LeftMenu>
 */
class LeftMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            activeKey: window.location.pathname,
        };
    }

    componentDidMount() {
        this.onSelect(this.state.activeKey);
    }

    onSelect(key) {
        this.setState({ activeKey: key });
    }

    render() {
        let activeKey = this.state.activeKey;
        return (
            <div>
                <div className={cx(css.leftSide, commonCss.sharp)}>

                    <div className={css.title}>
                        Tables
                    </div>

                    <Nav bsStyle="pills" stacked className={css.items} onSelect={this.onSelect.bind(this)}>
                        <NavItem eventKey={1}>
                            Laboratories
                        </NavItem>
                        <NavLink to="/projects" active={activeKey==="/projects"}>
                            Projects
                        </NavLink>
                        <NavItem eventKey={3}>
                            Samples
                        </NavItem>
                        <NavItem eventKey={3}>
                            More
                        </NavItem>
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
