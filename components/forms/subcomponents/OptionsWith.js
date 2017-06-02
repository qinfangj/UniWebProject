"use strict";
import React from 'react';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';
import { Projects } from './Options';


/*
 * Extensions to the 'Projects' Option, that trigger a secondary field when updated.
 */



/** Projects with samples, for User requests and Libraries */
export class ProjectsWithSamples extends React.Component {

    render() {
        return <Projects suffix="samples" {...this.props} />;
    }
}
ProjectsWithSamples.defaultProps = {
    storeKey: optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE,
    field: fields.PROJECT_ID,
};



/** Projects with libraries, in Runs and Bioanalysers.
 * In Bioanalysers it is used in many rows, so we must set a special form key + data key.
 */
export class ProjectsWithLibraries extends React.Component {

    render() {
        return <Projects suffix="libs" label={null} {...this.props} />;
    }
}
ProjectsWithLibraries.defaultProps = {
    storeKey: optionsStoreKeys.PROJECTS_HAVING_A_LIBRARY,
    field: fields.PROJECT_ID,
};



/** Projects with pool, in pre-Runs.
 * In pre-Runs it is used in many rows, so we must set a special form key.
 */
export class ProjectsWithPool extends React.Component {

    render() {
        return <Projects suffix="pools" label={null} {...this.props} />;
    }
}
ProjectsWithPool.defaultProps = {
    storeKey: optionsStoreKeys.PROJECTS_HAVING_A_POOL,
    field: fields.PROJECT_ID,
};