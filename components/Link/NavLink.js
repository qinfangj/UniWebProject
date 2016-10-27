
import React, { PropTypes } from 'react';
import history from '../../core/history';
import NavItem from 'react-bootstrap/lib/NavItem';


/**
 * Bootstrap's NavItem version to work with this router's Link.
 */
class NavLink extends React.Component {

    static propTypes = {
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        onClick: PropTypes.func,
    };

    handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }

        if (event.button !== 0 /* left click */) {
            return;
        }

        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        //event.preventDefault();

        if (this.props.to) {
            console.debug(1)
            history.push(this.props.to);
        } else {
            console.debug(2)
            history.push({
                pathname: event.currentTarget.pathname,
                search: event.currentTarget.search,
            });
        }
    };

    render() {
        const { to, ...props } = this.props; // eslint-disable-line no-use-before-define
        return <NavItem href={history.createHref(to)}
                        {...props}
                        onClick={this.handleClick} />;
    }

}

export default NavLink;
