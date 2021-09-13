import React, { useState } from "react";

export const DownloadModal = ({ checkedItems = [] }) => {
  const [fileName, setFileName] = useState(null);
  const [fileNameError, setFileNameError] = useState(false);
  const handleInputChange = (event) => {
    setFileNameError(false);
    setFileName(event.target.value);
  };
  const convertToXML = () => {
    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += "<results>\n";
    checkedItems.forEach((item) => {
      xml += `<result id=${item.cacheId}>\n`;
      xml += "<title>" + item.title + "</title>\n";
      xml += "<url>" + item.url + "</url>\n";
      xml += "<snippet>" + item.snippet + "</snippet>\n";
      xml += "</result>\n";
    });
    xml += "</results>";
    return xml;
  };

  const convertToJSON = () => {
    const json = JSON.stringify({
      results: checkedItems.map((item) => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link,
      })),
    });
    return json;
  };

  const convertToCSV = () => {
    var fields = ["title", "snippet", "link"];
    var replacer = function (key, value) {
      return value === null ? "" : value;
    };
    var csv = checkedItems.map((row) => {
      return fields
        .map(function (fieldName) {
          return JSON.stringify(row[fieldName], replacer);
        })
        .join(",");
    });
    csv.unshift(fields.join(",")); // add header column

    const csvResults = csv.join("\r\n");
    return csvResults;
  };

  const exportCSVFile = () => {
    var csv = convertToCSV(checkedItems);
    if (!fileName) return setFileNameError(true);
    var exportedFilenmae = fileName + ".csv" || "export.csv";

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    download(blob, exportedFilenmae);
  };

  const exportXMLFile = () => {
    const xml = convertToXML();
    if (!fileName) return setFileNameError(true);
    var exportedFilenmae = fileName + ".xml" || "export.xml";
    var blob = new Blob([xml], {
      type: "text/xml",
    });
    download(blob, exportedFilenmae);
  };

  const exportJSONFile = () => {
    const json = convertToJSON();
    if (!fileName) return setFileNameError(true);
    var exportedFilenmae = fileName + ".json" || "export.json";
    var blob = new Blob([json], {
      type: "application/json",
    });
    download(blob, exportedFilenmae);
  };

  const download = (blob, exportedFilenmae) => {
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <>
      <button
        className="btn btn-danger btn-sm ms-auto"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        disabled={!checkedItems.length}
      >
        Save & Download
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="exampleModalLabel">
                Download saved results
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {checkedItems.map((item) => (
                <div className="bg-light p-3 mb-3 rounded-1" key={item.cacheId}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <span className="fs-5 fw-bold">{item.title}</span>
                  </a>
                  <div>{item.snippet}</div>
                </div>
              ))}
            </div>
            <div className="modal-footer justify-content-start flex-nowrap">
              <div className="col-6">
                <input
                  type="text"
                  className={`form-control ${
                    fileNameError ? "is-invalid" : ""
                  }`}
                  name="exportFileName"
                  id="exportFileName"
                  placeholder="File Name"
                  onChange={handleInputChange}
                  required
                />
                <div id="exportFileName" className="invalid-feedback">
                  Please provide a file name
                </div>
              </div>
              <div className="col-6">
                <div className="float-end">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm me-1"
                    id="downloadCSV"
                    onClick={exportCSVFile}
                  >
                    CSV
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm me-1"
                    id="downloadJSON"
                    onClick={exportJSONFile}
                  >
                    JSON
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-sm me-2"
                    id="downloadXML"
                    onClick={exportXMLFile}
                  >
                    XML
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadModal;
