"use strict";
import { combineForms } from  'react-redux-form'



let queryProjectsFormsReducers = combineForms(
    {
        queryProjects: {
            projects: [],
            samples: [],
        },

        queryRuns: {
            runs: []
        }

    }, "queryProjectsForms"
);


export default queryProjectsFormsReducers;
