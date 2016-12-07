import * as formatters from '../formatters';
import { CENTER, ID_COLUMN } from '../constants';


const columns = {
    queryProjects: [
        {
            headerName: "ID",
            field: "sample_id",
            width: 40,
            suppressSizeToFit: true,
            suppressMenu: true,
            cellStyle: CENTER,
        },{
            headerName: "Sample",
            field: "sample_short_name",
        },{
            headerName: "Name",
            field: "sample_name",
        },{
            headerName: "Organism",
            field: "organism",
        },{
            headerName: "Type",
            field: "sample_type",
        },{
            headerName: "Conc. [ng/μl]",
            field: "concentration",
        },{
            headerName: "Vol. [μl]",
            field: "volume",
        },{
            headerName: "Ratio 260/280",
            field: "ratio_260_280",
            cellRenderer: formatters.nullable
        },{
            headerName: "Ratio 260/230",
            field: "ratio_260_230",
            cellRenderer: formatters.nullable
        },{
            headerName: "RIN",
            field: "rin",
            cellRenderer: formatters.nullable
        },{
            headerName: "Method",
            field: "quantif_method",
        },{
            headerName: "Project",
            field: "project_name",
        },{
            headerName: "Lab",
            field: "pi_last_name",
        },{
            headerName: "Submitter",
            field: "submitter",
            cellRenderer: formatters.nullable
        }
    ],
};


export default columns;