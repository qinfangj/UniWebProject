"use strict";
import { combineForms } from  'react-redux-form'
import { dateNow } from '../../../../utils/time';
import fields from '../../../constants/fields';


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
        bioanalysers: {
            [fields.bioanalysers.BIOANALYSER_FILE]: "",
            [fields.bioanalysers.BIOANALYSER_FILENAME]: "",
            [fields.bioanalysers.BIOANALYSER_DATE]: dateNow(),
            [fields.bioanalysers.DESCRIPTION]: "",
            lanes: {
                1: {
                    projectId: "",
                    libraryId: "",
                    comment: "",
                },
            },
        },
        genomes: {
            [fields.genomes.TAXO_ID]: "",
            [fields.genomes.ASSEMBLY]: "",
            [fields.genomes.GENOME_FOLDER]: "",
            [fields.genomes.URL]: "http://",
            [fields.genomes.DOWNLOADED_DATE]: dateNow(),
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
            [fields.libraries.LIBRARY_DATE]: dateNow(),
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
            [fields.libraries.IS_CUSTOMER_MADE]: false,
            [fields.libraries.IS_ROBOT_MADE]: false,
            [fields.libraries.IS_TRASHED]: false,
        },
        people: {
            [fields.people.FIRST_NAME]: "",
            [fields.people.LAST_NAME]: "",
            [fields.people.EMAIL]: "",
            [fields.people.ADDRESS]: "",
            [fields.people.PHONE]: "",
        },
        projects: {
            [fields.projects.NAME]: "",
            [fields.projects.PERSON_ID]: "",
            [fields.projects.CODE_NAME]: "",
            [fields.projects.DESCRIPTION]: "",
            [fields.projects.PROJECT_STATE_ID]: "",
            [fields.projects.USER_MEETING_DATE]: dateNow(),
            [fields.projects.PROJECT_ANALYSIS_ID]: "",
            [fields.projects.IS_CONTROL]: false,
            [fields.projects.COMMENT]: "",
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
        samples: {
            [fields.samples.NAME]: "",
            [fields.samples.SHORT_NAME]: "",
            [fields.samples.PROJECT_ID]: "",
            [fields.samples.TAXO_ID]: "",
            [fields.samples.SAMPLE_TYPE_ID]: "",
            [fields.samples.RECEIVED_DATE]: dateNow(),
            [fields.samples.QUANTIF_METHOD_ID]: "",
            [fields.samples.CONCENTRATION]: "",
            [fields.samples.VOLUME]: "",
            [fields.samples.RIN]: "",
            [fields.samples.RATIO_260_280]: "",
            [fields.samples.RATIO_260_230]: "",
            [fields.samples.DESCRIPTION]: "",
            [fields.samples.COMMENT_CUSTOMER]: "",
            [fields.samples.COMMENT]: "",
            [fields.samples.IS_TRASHED]: false,
        },
        user_requests: {
            [fields.user_requests.PROJECT_ID]: "",
            [fields.user_requests.SAMPLE_ID]: "",
            [fields.user_requests.INSERT_SIZE_MIN]: "",
            [fields.user_requests.INSERT_SIZE_MAX]: "",
            [fields.user_requests.LIB_PROTOCOL_ID]: "",
            [fields.user_requests.MULTIPLEXING_GROUP]: "",
            [fields.user_requests.RUN_TYPES_LENGTH_ID]: "",
            [fields.user_requests.NB_LANES]: "",
            [fields.user_requests.MILLION_READS]: "",
            [fields.user_requests.WITH_LIB_QC]: false,
            [fields.user_requests.COMMENT]: "",
            [fields.user_requests.IS_TRASHED]: false,
            [fields.user_requests.IS_FULFILLED]: false,
        },
    },

    'facilityDataForms'
);


export default facilityDataFormsReducers;

