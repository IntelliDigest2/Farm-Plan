import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodeScanner";
import ResultContainerPlugin from "./ResultContainerPlugin";
import "./QRCode.css";
import { backdropClasses } from "@mui/material";
import ErrorBoundary from './ErrorBoundary'

export default function Scanner() {
  const [decodedResults, setDecodedResults] = useState([]);
  const [barCodeData, setBarCodeData] = useState([]);
  const [foodName, setFoodName] = useState([]);
  const [error, setError] = useState(null)

  const errorDiv = error 
      ? <div className="error">
          <i class="material-icons error-icon">Oops failed to fetch details</i>
          {error}
        </div> 
      : '';

  const onNewScanResult = (decodedText, decodedResult) => {
    //console.log("App [result]", decodedResult);

    fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedResult.decodedText}.json`)
    .then(response => response.json())
    .then(data => {
      setBarCodeData(data.product.ingredients)
      setFoodName(data.product.brands)

      // console.log(data.product.ingredients)
      // console.log(data.product.ingredients_hierarchy)
      // setDecodedResults((prev) => [...prev, barCodeData]);

    }).catch((err) => {
      // console.log(err.message);
      setError(err)
     });

  };

  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.log(`Code scan error = ${error}`);
  }

  // useEffect(() => {
   
  //   },[])
  

  return (
    <>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        qrCodeFailureCallback={onScanFailure}

      />
      <p style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>{foodName}</p>
      <ErrorBoundary>
        <ResultContainerPlugin results={barCodeData && barCodeData.map(
        food => <div><p>{food.id}</p></div>)} />    

        </ErrorBoundary>
     
    </>
  );
}