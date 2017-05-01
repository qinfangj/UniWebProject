"use strict";


const downloadPdf = function(file, filename="bioanalyser.pdf") {
    // create a download anchor tag
    let downloadLink      = document.createElement('a');
    downloadLink.target   = '_blank';
    downloadLink.download = filename;

    // convert downloaded data to a Blob
    let blob = new Blob([file.data], { type: 'application/pdf' });

    // create an object URL from the Blob
    let URL = window.URL || window.webkitURL;
    let downloadUrl = URL.createObjectURL(blob);

    // set object URL as the anchor's href
    downloadLink.href = downloadUrl;

    // append the anchor to document body
    document.body.append(downloadLink);

    // fire a click event on the anchor
    downloadLink.click();

    // cleanup: remove element and revoke object URL
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadUrl);
};


export default downloadPdf;