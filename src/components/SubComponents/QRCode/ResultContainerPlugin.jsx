import React from "react";
import { SubButton } from "../Button";

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }
    if (results[i].decodedText !== results[i - 1].decodedText) {
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

const ResultContainerTable = ({ data, onClick }) => {
  const results = filterResults(data);
  return (
    <table className={"Qrcode-result-table"}>
      <thead>
        <tr>
          <td>#</td>
          <td>Decoded Text</td>
          <td>Format</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {results.map((result, i) => {
          console.log(result);
          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{result.decodedText}</td>
              <td>{result.result.format.formatName}</td>
              <td>
                <SubButton styling="green" onClick={onClick} text="Add" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const ResultContainerPlugin = (props) => {
  const results = filterResults(props.results);
  return (
    <div className="Result-container">
      <div className="Result-header">Scanned results ({results.length})</div>
      <div className="Result-section">
        <ResultContainerTable data={results} />
      </div>
    </div>
  );
};

export default ResultContainerPlugin;
