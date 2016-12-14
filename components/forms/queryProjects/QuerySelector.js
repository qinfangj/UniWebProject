import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import css from './queryProjects.css';
import cx from 'classnames';
import store from '../../../core/store';

import { changeQueryProjectsType } from '../../actions/actionCreators/commonActionCreators';
import columnNames from '../../constants/columns';

import { ListGroup, ListGroupItem } from 'react-bootstrap/lib';



class QuerySelector extends React.Component {
    constructor(props) {
        super(props);
    }

    changeQueryType(type) {
        store.dispatch(changeQueryProjectsType(type));
    }

    render() {
        let col = columnNames.queryProjects;
        return (
            <div className={css.querySelector}>
                <ListGroup className={css.items}>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.STARTING_MATERIAL_INFO)}>
                        Sample material info
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.USER_REQUEST_INFO)}>
                        User request info
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.LIBRARY_INFO)}>
                        Library info
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.SEQUENCING_DETAILS_INFO)}>
                        Sequencing details
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.SAMPLE_SHEETS_INFO)}>
                        Samples sheet
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.IVC_PLOTS)} disabled>
                        IVC plots
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.DEMULTIPLEXING_INFO)}>
                        Demultiplexings
                    </ListGroupItem>
                    <ListGroupItem onClick={this.changeQueryType.bind(null, col.ALIGNMENTS_INFO)} disabled>
                        Alignments (CASAVA)
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}


export default QuerySelector;