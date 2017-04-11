"use strict";
import React from 'react';
import cx from 'classnames';
import css from './FacilityData.css';
import commonCss from '../../styles/common.css';
import { Link } from 'react-router';


class AdminData extends React.PureComponent {

    static propTypes = {
        title: React.PropTypes.string.isRequired,  // the text displayed in the menu.
        name: React.PropTypes.string.isRequired,   // table route name, reused in the all/active/new selection (plural).
        content: React.PropTypes.node,             // the component (table, form, etc.) to display inside.
    };

    open (messege){
//        window.open('aa', 'sharer', 'toolbar=0,status=0,width=548,height=325');
        window.confirm("Do you accept?");

    }
    render() {
        let name = this.props.name;
        return (
            <div className={css.pageWrapper}>

                <div className={commonCss.fullwidth}>
                    <div className={css.title}>
                        {this.props.title}
                    </div>

                    <div className={css.navbar}>
                        <ul>
                            <li><Link to={`/admin/${name}/list`} activeClassName={css.active}>{"All "+ name}</Link></li>
                            { name !== "users" ?
                                <div><li> · </li>
                                <li><Link to={`/admin/${name}/new`} activeClassName={css.active}>{"New "+ name}</Link></li> </div>:
                                <div><li> · </li>
                                <li><Link to={`/admin/${name}/unvalidated`} activeClassName={css.active} onClick={this.open}>{"delete unvalidated "+ name} </Link></li> </div>}
                        </ul>
                    </div>

                    {this.props.content}

                </div>

            </div>
        );
    }

}


export default AdminData;

