"use strict";
import { combineForms } from  'react-redux-form'
import { dateNow } from '../../../../utils/time';


/**
 * React-redux-forms reducer - Initial form data for facilityData.
 */
let userDataReducers = combineForms(
    {
        samples: [
            {
                project: "",
                sampleName: "",
                shortName: "",
                organism: "",
                startingMaterial: "",
                materialType: "",
                libraryProtocol: "",
                adapters: "",
                libraryDate: dateNow(),
                multiplexIndex7: "",
                secondIndex5: "",
                minFragSize: "",
                maxFragSize: "",
                bioanalyserPeak: "",
                concentration: "",
                volume: "",
                quantifMethod: "",
                isrobotMade: "",
                comment: "",
                readTypesLengths: "",
                nbLanes: "",
                multiplexNb: "",
                multiplexingGroup: "",
            },
            {
                project: "",
                sampleName: "",
                shortName: "",
                organism: "",
                startingMaterial: "",
                materialType: "",
                libraryProtocol: "",
                adapters: "",
                libraryDate: dateNow(),
                multiplexIndex7: "",
                secondIndex5: "",
                minFragSize: "",
                maxFragSize: "",
                bioanalyserPeak: "",
                concentration: "",
                volume: "",
                quantifMethod: "",
                isrobotMade: "",
                comment: "",
                readTypesLengths: "",
                nbLanes: "",
                multiplexNb: "",
                multiplexingGroup: "",
            },
        ]
    },

    'userData'
);


export default userDataReducers;

