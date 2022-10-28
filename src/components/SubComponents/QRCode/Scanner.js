import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodeScanner";
import ResultContainerPlugin from "./ResultContainerPlugin";
import "./QRCode.css";
import { backdropClasses } from "@mui/material";


export default function Scanner() {
  const [decodedResults, setDecodedResults] = useState([]);
  const [barCodeData, setBarCodeData] = useState([]);
  const [foodName, setFoodName] = useState([]);
  const [error, setError] = useState(null)


  const onNewScanResult = (decodedText, decodedResult) => {

    fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedResult.decodedText}.json`)
    .then(response => response.json())
    .then(data => {
      setBarCodeData(data.product.ingredients)
      setFoodName(data.product.brands)

      console.log(data.product.ingredients)
      // console.log(data.product.ingredients_hierarchy)

    }).catch((err) => {
      console.log(err.message)
      setError(err.message)
     });


  };

  return (
    <>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}

      />
      <p style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>{foodName}</p>
      <ul>{barCodeData && barCodeData.map(food => <div><p>{food?.id}</p></div>)}</ul>
      {error && <div><p>Oops..Could not fetch food item, pls try another barcode..😭</p></div>}
     
    </>
  );
}