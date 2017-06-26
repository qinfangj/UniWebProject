"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import AsyncOptionsList from './AsyncOptionsList';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';




/** In Runs */
export class Instruments extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.INSTRUMENT_ID} table="instruments" label="Machine"
                                 storeKey={optionsStoreKeys.INSTRUMENTS}
                                 formatter={this.formatter}
                                 {...this.props}
                                  />;
    }
}


/** In Libraries (twice: 5'-3') */
export class MultiplexIndexes extends React.Component {
    formatter(v) { return [v.id, v.name +" - "+ v.sequence]; }
    render() {
        return <AsyncOptionsList table="multiplex_indexes"
                                 storeKey={optionsStoreKeys.MULTIPLEX_INDEXES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}
MultiplexIndexes.propTypes = {
    suffix: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
};

/** In Projects. Rows from the people table that represent a lab/PI. */
export class Laboratories extends React.Component {
    formatter(v) { return [v.id, v.lastName +" "+ v.firstName]; }
    render() {
        return <AsyncOptionsList field={fields.PERSON_ID} table="people" label="Laboratory"
                                 storeKey={optionsStoreKeys.PEOPLE}
                                 formatter={this.formatter}
                                 suffix="labs"
                                 {...this.props}
        />;
    }
}

/** All projects */
export class Projects extends React.Component {
    formatter(v) { return [v.id, v.lastName +" - "+ v.name]; }
    render() {
        return <AsyncOptionsList table="projects"
                                 formatter={this.formatter}
                                 {...this.props}
               />;
    }
}
Projects.propTypes = {
    field: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    suffix: PropTypes.string.isRequired,  // url arg for conditional list
    storeKey: PropTypes.string,  // store key for the result list
};
Projects.defaultProps = {
    field: fields.PROJECT_ID,
    storeKey: optionsStoreKeys.PROJECTS,
    suffix: "all",
    label: "Project",
};


/** In Runs and UserRequests */
export class RunTypesLengths extends React.Component {
    formatter(v) { return [v.id, v.name +' '+ v.length]; }
    render() {
        return <AsyncOptionsList field={fields.RUN_TYPES_LENGTH_ID} table="run_types_lengths" label="Run type"
                                 suffix={this.props.suffix}
                                 storeKey={optionsStoreKeys.RUN_TYPES_LENGTHS}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}
RunTypesLengths.propTypes = {
    suffix: PropTypes.string.isRequired,
};


/** In Genomes and Samples */
export class Taxonomies extends React.Component {
    formatter(v) { return [v.id, v.name]; }
    render() {
        return <AsyncOptionsList field={fields.TAXO_ID} table="taxonomies" label="Organism"
                                 storeKey={optionsStoreKeys.TAXONOMIES}
                                 formatter={this.formatter}
                                 {...this.props}
        />;
    }
}


