import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodeScanner";
import ResultContainerPlugin from "./ResultContainerPlugin";
import "./QRCode.css";

export default function Scanner() {
  const [decodedResults, setDecodedResults] = useState([]);
  const [barCodeData, setBarCodeData] = useState([]);


  const onNewScanResult = (decodedText, decodedResult) => {
    //console.log("App [result]", decodedResult);

    fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedResult.decodedText}.json`)
    .then(response => response.json())
    .then(data => {
      setBarCodeData(data.product.brands)
      console.log(data.product.ingredients)
      console.log(data.product.ingredients_hierarchy)

    })
    
    setDecodedResults((prev) => [...prev, barCodeData]);

  };

  // useEffect(() => {
   
  //   },[])


  return (
    <>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      {/* <ResultContainerPlugin results={barCodeData} /> */}
      <p>{barCodeData}</p>
    </>
  );
}