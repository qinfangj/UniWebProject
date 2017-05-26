"use strict";
import { combineForms } from  'react-redux-form'
import { dateNow } from '../../../../utils/time';
import fields from '../../../forms/fields';


/**
 * React-redux-forms reducer - Initial form data for facilityData.
 */
let facilityDataFormsReducers = combineForms(
    {
        alignments: {
            [fields.alignments.ANALYSIS_TYPE_ID]: "",
            [fields.alignments.RUN_ID]: "",
            [fields.alignments.BASECALLING_ID]: "",
            [fields.alignments.MAPPING_TOOL_ID]: "",
            [fields.alignments.ELAND_OUTPUT_DIR]: "",
            [fields.alignments.HAS_QC_PDFS]: false,
            [fields.alignments.CONFIG_FILE_CONTENT]: "ANALYSIS xxx\nUSE_BASES xxx",
            [fields.alignments.COMMENT]: "",
        },
        basecallings: {
            [fields.basecallings.RUN_ID]: "",
            [fields.basecallings.PIPELINE_VERSION_ID]: "",
            [fields.basecallings.ANALYSIS_TYPE_ID]: "",
            [fields.basecallings.CONTROL_LANE_NB]: "",
            [fields.basecallings.UNALIGNED_OUTPUT_DIR]: "",
            [fields.basecallings.IS_DEMULTIPLEXING]: false,
            [fields.basecallings.COMMENT]: ""
        },
        genomes: {
            [fields.genomes.TAXO_ID]: "",
            [fields.genomes.ASSEMBLY]: "",
            [fields.genomes.GENOME_FOLDER]: "",
            [fields.genomes.URL]: "",
            [fields.genomes.DOWNLOADED_DATE]: "",
            [fields.genomes.FILES]: "",
            [fields.genomes.COMMENT]: "",
            [fields.genomes.IS_MASKED]: false,
            [fields.genomes.IS_ARCHIVED]: false,
        },
        libraries: {
            [fields.libraries.PROJECT_ID]: "",
            [fields.libraries.SAMPLE_ID]: "",
            [fields.libraries.NAME]: "",
            [fields.libraries.URL]: "",
            [fields.libraries.LIB_PROTOCOL_ID]: "",
            [fields.libraries.STARTING_MATERIAL]: "",
            [fields.libraries.LIBRARY_DATE]: "",
            [fields.libraries.BIOANALYSER_PEAK]: "",
            [fields.libraries.FRAG_SIZE_MIN]: "",
            [fields.libraries.FRAG_SIZE_MAX]: "",
            [fields.libraries.CONCENTRATION]: "",
            [fields.libraries.QUANTIF_METHOD_ID]: "",
            [fields.libraries.MULTIPLEX_INDEX_7_ID]: "",
            [fields.libraries.MULTIPLEX_INDEX_5_ID]: "",
            [fields.libraries.VOLUME]: "",
            [fields.libraries.ADAPTER_ID]: "",
            [fields.libraries.KITS_LOTS]: "",
            [fields.libraries.COMMENT_CUSTOMER]: "",
            [fields.libraries.LIBRARY_STATE_ID]: "",
            [fields.libraries.COMMENT]: "",
            [fields.libraries.IS_CUSTOMER_MADE]: "",
            [fields.libraries.IS_ROBOT_MADE]: "",
            [fields.libraries.IS_TRASHED]: "",
        },
        people: {

        },
        projects: {

        },
        samples: {

        },
        user_requests: {

        },

        bioanalysers: {
            [fields.bioanalysers.BIOANALYSER_FILE]: "",
            [fields.bioanalysers.BIOANALYSER_FILENAME]: "",
            [fields.bioanalysers.BIOANALYSER_DATE]: "1970-01-01",
            [fields.bioanalysers.DESCRIPTION]: "",
            lanes: {
                1: {

                },
            },
        },

        runs: {
            [fields.runs.GA_RUN_NUMBER]: "",
            [fields.runs.FLOWCELL]: "",
            [fields.runs.FLOWCELL_TYPE_ID]: "",
            [fields.runs.RELEASE_DATE]: dateNow(),
            [fields.runs.INSTRUMENT_ID]: "",
            [fields.runs.GA_RUN_DATE]: dateNow(),
            [fields.runs.RUN_TYPES_LENGTH_ID]: "",
            [fields.runs.FC_STAGE]: "",
            [fields.runs.SEQUENCING_KIT_VERSION_ID]: "",
            [fields.runs.IS_FAILED]: false,
            [fields.runs.COMMENT]: "",
            lanes: {
                1: {
                    comment: "",
                    libs: [
                        {
                            projectId: "",
                            libraryId: "",
                            concentration: "",
                            qualityId: 1,
                            isQCLib: false,
                        },
                    ]
                }
            },
            poolSelection: {
                projectIdWithPool: "",
                poolId: "",
            }
        },
    },

    'facilityDataForms'
);


export default facilityDataFormsReducers;

