import React from 'react';
import cx from 'classnames';
import css from './FacilityData.css';
import commonCss from '../../styles/common.css';

import LeftMenu from '../Layout/LeftMenu';
import Link from '../../components/Link';


class FacilityData extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,  // the text displayed in the menu.
        name: React.PropTypes.string.isRequired,   // table route name, reused in the all/active/new selection (plural).
        content: React.PropTypes.node,             // the component (table, form, etc.) to display inside.
    };

    render() {
        let name = this.props.name;
        return (
            /*<LeftMenu>*/
            <div className={css.pageWrapper}>

                <div className={commonCss.fullwidth}>
                    <div className={css.title}>
                        {this.props.title}
                    </div>

                    <div className={css.navbar}>
                        <ul>
                            <li><Link to={`/data/${name}/list`}>{"All "+ name}</Link></li>
                            <li> · </li>
                            <li><Link to={`/data/${name}/active`}>{"Active "+ name}</Link></li>
                            <li> · </li>
                            <li><Link to={`/data/${name}/new`}>{"New "+ name}</Link></li>
                        </ul>
                    </div>

                    {this.props.content}

                </div>

            </div>
            /*</LeftMenu>*/
        );
    }

}


export default FacilityData;
