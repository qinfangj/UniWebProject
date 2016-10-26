
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
            activeKey: "",
        };
    }

    componentDidMount() {
        this.onSelect(window.location.pathname);
    }

    onSelect(key) {
        //console.debug("LeftMenu.onSelect", key)
        this.setState({ activeKey: key });
    }

    render() {

        let menuItems = [
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

        let activeKey = this.state.activeKey || window.location.pathname;
        //console.debug("activeKey:", activeKey)

        let items = menuItems.map((items, i) => {
            let {text, to, ...props} = items;
            return (
                <NavLink to={to} active={activeKey===to} {...props} key={i} eventKey={i}
                         className={activeKey===to ? css.active : null}>
                    {text}
                </NavLink>
            );
        });

        return (
            <div className={css.leftMenu}>
                <div className={cx(css.leftSide)}>
                    <div className={css.title}>
                        Tables
                    </div>
                    <div className={css.divider} />
                    <Nav bsStyle="pills" stacked onSelect={this.onSelect.bind(this)} className={css.items} >
                        {items}
                    </Nav>
                </div>
                <div className={cx(css.rightSide)}>
                    <div className={css.rightSideReset}>

                    {this.props.children}

                    </div>
                </div>
            </div>
        );
    }
}


export default LeftMenu;
