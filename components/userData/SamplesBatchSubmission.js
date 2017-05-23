"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    requestAllProjects,
    requestTaxonomies,
    requestSampleTypes,
    requestQuantifMethods,
    } from '../actions/actionCreators/optionsActionCreators';


class SamplesBatchSubmission extends React.PureComponent {

    componentWillMount() {
        this.props.requestAllProjects();
        this.props.requestTaxonomies();
        this.props.requestSampleTypes();
        this.props.requestQuantifMethods();
    }

    render() {
        return (
            <div>
            ......

                <table>
                    <thead>
                        <th>
                            <td>Project</td>
                            <td>Sample name</td>
                            <td>Short name</td>
                            <td>Organism</td>
                            <td>Starting material description (e.g.: 'Crosslinked ChIP DNA from NIH-3T3 cells')</td>
                            <td>Material type</td>
                            <td>Library protocol</td>
                            <td>Adapters</td>
                            <td>Library date</td>
                            <td>Multiplex index (I7)</td>
                            <td>Second index (I5)</td>
                            <td>Min frag. size</td>
                            <td>Max frag. size</td>
                            <td>Bioan. peak</td>
                            <td>Conc.[ng/μl]</td>
                            <td>Vol.[μl]</td>
                            <td>Quantification</td>
                            <td>Made on robot</td>
                            <td>Comment</td>
                            <td>Sequencing type and Read length</td>
                            <td>Nb of lanes</td>
                            <td>Multiplex#</td>
                            <td>Multiplexing group</td>
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        requestAllProjects,
        requestTaxonomies,
        requestSampleTypes,
        requestQuantifMethods,
        }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SamplesBatchSubmission);

