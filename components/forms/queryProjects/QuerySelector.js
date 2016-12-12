import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './queryProjects.css';
import cx from 'classnames';
import store from '../../../core/store';
import { changeQueryProjectsType } from '../../actions/actionCreators/commonActionCreators';

import { ListGroup, ListGroupItem } from 'react-bootstrap/lib';


class QuerySelector extends React.Component {
    constructor(props) {
        super(props);
    }

    changeQueryType(type) {
        store.dispatch(changeQueryProjectsType(type));
    }

    render() {
        return (
            <div className={css.querySelector}>
                <ListGroup className={css.items}>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, "starting_material")}>
                        Sample material info
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, "user_request")}>
                        User request info
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, "library")}>
                        Library info
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}


export default QuerySelector;