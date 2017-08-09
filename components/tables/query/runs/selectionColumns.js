

/**
 * The columns definition for the panel where we select the Runs with checkboxes.
 */
const selectionColumns =  [
    {
        headerName: "",
        field: "id",
        width: 25,
    },{
        headerName: "Instrument",
        field: "instrument",
        width: 100,
    },{
        headerName: "Type",
        field: "read_type",
        width: 150,
    },{
        headerName: "Folder",
        field: "run_folder",
    },{
        headerName: "Status",
        field: "status",
        width: 70,
    },
];


export default selectionColumns;