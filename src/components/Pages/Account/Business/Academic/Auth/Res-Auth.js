import React, { useState } from "react";
import Control from "./control";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import { useEffect } from "react";

export default function ResAuth() {
  //stage 0 are you an existing farm
  const [OMS, setOMS] = useState(false);

  //stage 1 (are you a famring association member)
  const [cost, setCost] = useState("");
  const [period, setPeriod] = useState("Weekly")

  //stage 2 (certificate of incorporation)
  const [turnover, setTurnover] = useState("");
  const [turnoverPeriod, setTurnoverPeriod] = useState("Weekly")

  //stage 3 location
  const [purchase, setPurchase] = useState("");
  
  //stage 4 farming sector
  const [nutritionalInfo, setNutritionalInfo] = useState(false);

  //stage 5 sustainability
  const [foodWaste, setFoodWaste] = useState(false)
  const [foodWasteWeight, setFoodWasteWeight] = useState("");
  const [foodWasteUnit, setFoodWasteUnit] = useState("Kg");

  //stage 6
  const [carbonPrint, setCarbonPrint] = useState(false);
  const [carbonPrintUnit, setCarbonPrintUnit] = useState("Kg");
  const [carbonPrintWeight, setCarbonPrintWeight] = useState("")

  //stage 7
  const [interest, setInterest] = useState("")


  return (
    <PageWrap goTo="/account" header="My Farm Plan" subtitle="Build your plan">
      <Control
        OMS={ OMS}
        setOMS={ setOMS}
        setCost={ setCost}
        cost={ cost}
        period={period}
        setPeriod={setPeriod}
        turnover={ turnover}
        setTurnover={ setTurnover}
        turnoverPeriod={turnoverPeriod}
        setTurnoverPeriod={setTurnoverPeriod}
        purchase={ purchase}
        setPurchase={ setPurchase}
        nutritionalInfo={nutritionalInfo}
        setNutritionalInfo={setNutritionalInfo}
        foodWaste={ foodWaste}
        foodWasteWeight={foodWasteWeight}
        setFoodWasteWeight={setFoodWasteWeight}
        foodWasteUnit={foodWasteUnit}
        setFoodWasteUnit={setFoodWasteUnit}
        setFoodWaste={ setFoodWaste}
        carbonPrint={ carbonPrint}
        carbonPrintWeight={carbonPrintWeight}
        setCarbonPrintWeight={setCarbonPrintWeight}
        carbonPrintUnit={carbonPrintUnit}
        setCarbonPrintUnit={setCarbonPrintUnit}
        setCarbonPrint={ setCarbonPrint}
        setInterest={ setInterest} 
        interest={ interest}
      />
    </PageWrap>
  );
}
